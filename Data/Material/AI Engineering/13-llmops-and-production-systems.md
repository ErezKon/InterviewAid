## 13. LLMOps & Production Systems

### Table of Contents

- [13.1 Production Architecture](#131-production-architecture)
- [13.2 Model Router & Fallback](#132-model-router-and-fallback)
- [13.3 Streaming Responses](#133-streaming-responses)


### 13.1 Production Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web App]
        MOB[Mobile App]
        API_C[API Consumers]
    end

    subgraph "API Gateway"
        GW[API Gateway<br/>Auth / Rate Limiting]
    end

    subgraph "Application Layer"
        SVC[AI Service<br/>FastAPI / Express]
        QUEUE[Task Queue<br/>Celery / Bull]
        CACHE[Response Cache<br/>Redis]
    end

    subgraph "AI Pipeline"
        GUARD_IN[Input Guardrails]
        ORCH[Orchestrator]
        RAG_P[RAG Pipeline]
        AGENT_P[Agent Pipeline]
        GUARD_OUT[Output Guardrails]
    end

    subgraph "Model Layer"
        ROUTER[Model Router]
        PROV1[OpenAI API]
        PROV2[Anthropic API]
        PROV3[Self-hosted<br/>vLLM Cluster]
        FALLBACK[Fallback Logic]
    end

    subgraph "Data Layer"
        VDB_P[(Vector DB)]
        PG[(PostgreSQL)]
        REDIS_P[(Redis)]
        S3[(Object Storage)]
    end

    subgraph "Observability"
        LOG[Logging<br/>ELK / Datadog]
        TRACE[Tracing<br/>Langfuse]
        METRIC[Metrics<br/>Prometheus]
        ALERT[Alerting<br/>PagerDuty]
    end

    WEB & MOB & API_C --> GW
    GW --> SVC
    SVC --> CACHE
    SVC --> QUEUE
    SVC --> GUARD_IN --> ORCH
    ORCH --> RAG_P & AGENT_P
    RAG_P & AGENT_P --> GUARD_OUT
    ORCH --> ROUTER
    ROUTER --> PROV1 & PROV2 & PROV3
    ROUTER --> FALLBACK
    RAG_P --> VDB_P
    SVC --> PG & REDIS_P & S3
    SVC --> LOG & TRACE & METRIC
    METRIC --> ALERT

    style ROUTER fill:#e63,stroke:#fff,color:#fff
    style ORCH fill:#36e,stroke:#fff,color:#fff
    style GUARD_IN fill:#c33,stroke:#fff,color:#fff
    style GUARD_OUT fill:#c33,stroke:#fff,color:#fff
```

### 13.2 Model Router & Fallback

```python
from dataclasses import dataclass
from enum import Enum
import time
from openai import OpenAI
from anthropic import Anthropic


class ModelTier(Enum):
    FAST = "fast"           # Simple tasks, low cost
    STANDARD = "standard"   # General tasks
    PREMIUM = "premium"     # Complex tasks requiring top quality


@dataclass
class ModelConfig:
    provider: str            # "openai", "anthropic", "self-hosted"
    model: str
    tier: ModelTier
    cost_per_1k_input: float
    cost_per_1k_output: float
    max_tokens: int
    timeout: int = 30
    is_fallback: bool = False


class ModelRouter:
    """
    Routes requests to appropriate models based on task complexity,
    with automatic fallback on failures.
    """

    MODELS = [
        ModelConfig("openai", "gpt-4o-mini", ModelTier.FAST, 0.00015, 0.0006, 16384),
        ModelConfig("openai", "gpt-4o", ModelTier.STANDARD, 0.0025, 0.01, 16384),
        ModelConfig("anthropic", "claude-sonnet-4-20250514", ModelTier.STANDARD, 0.003, 0.015, 8192),
        ModelConfig("anthropic", "claude-opus-4-20250514", ModelTier.PREMIUM, 0.015, 0.075, 4096),
        # Fallbacks
        ModelConfig("openai", "gpt-4o-mini", ModelTier.STANDARD, 0.00015, 0.0006, 16384, is_fallback=True),
    ]

    def __init__(self):
        self.openai = OpenAI()
        self.anthropic = Anthropic()
        self._failure_counts: dict[str, int] = {}
        self._circuit_breaker: dict[str, float] = {}  # model -> cooldown until

    def classify_complexity(self, messages: list[dict]) -> ModelTier:
        """Simple heuristic to route to appropriate model tier."""
        total_text = " ".join(m.get("content", "") for m in messages)
        word_count = len(total_text.split())

        # Heuristic classification (in production, use a small classifier)
        if word_count < 50 and not any(
            kw in total_text.lower()
            for kw in ["analyze", "compare", "explain in detail", "complex"]
        ):
            return ModelTier.FAST
        elif word_count > 500 or any(
            kw in total_text.lower()
            for kw in ["step by step", "comprehensive", "detailed analysis"]
        ):
            return ModelTier.PREMIUM
        return ModelTier.STANDARD

    def _is_circuit_open(self, model: str) -> bool:
        """Check if circuit breaker is active for a model."""
        cooldown = self._circuit_breaker.get(model, 0)
        if time.time() < cooldown:
            return True
        if time.time() >= cooldown and model in self._circuit_breaker:
            del self._circuit_breaker[model]
            self._failure_counts[model] = 0
        return False

    def _record_failure(self, model: str):
        self._failure_counts[model] = self._failure_counts.get(model, 0) + 1
        if self._failure_counts[model] >= 3:
            self._circuit_breaker[model] = time.time() + 60  # 60s cooldown

    def call(
        self,
        messages: list[dict],
        tier: ModelTier = None,
        **kwargs,
    ) -> dict:
        """Route and call the appropriate model with fallback."""
        tier = tier or self.classify_complexity(messages)

        # Get candidates for this tier
        candidates = [
            m for m in self.MODELS
            if m.tier == tier and not m.is_fallback
        ]
        fallbacks = [m for m in self.MODELS if m.is_fallback]

        for config in candidates + fallbacks:
            if self._is_circuit_open(config.model):
                continue

            try:
                start = time.time()
                result = self._call_provider(config, messages, **kwargs)
                latency = time.time() - start

                return {
                    "content": result,
                    "model": config.model,
                    "provider": config.provider,
                    "tier": tier.value,
                    "latency_ms": latency * 1000,
                    "is_fallback": config.is_fallback,
                }

            except Exception as e:
                self._record_failure(config.model)
                continue  # Try next candidate

        raise RuntimeError("All models failed — no available providers")

    def _call_provider(
        self, config: ModelConfig, messages: list[dict], **kwargs
    ) -> str:
        if config.provider == "openai":
            response = self.openai.chat.completions.create(
                model=config.model,
                messages=messages,
                max_tokens=kwargs.get("max_tokens", config.max_tokens),
                temperature=kwargs.get("temperature", 0.0),
                timeout=config.timeout,
            )
            return response.choices[0].message.content

        elif config.provider == "anthropic":
            # Convert OpenAI format to Anthropic
            system = next(
                (m["content"] for m in messages if m["role"] == "system"), ""
            )
            non_system = [m for m in messages if m["role"] != "system"]

            response = self.anthropic.messages.create(
                model=config.model,
                max_tokens=kwargs.get("max_tokens", config.max_tokens),
                system=system,
                messages=non_system,
            )
            return response.content[0].text

        raise ValueError(f"Unknown provider: {config.provider}")
```

### 13.3 Streaming Responses

```python
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from openai import OpenAI
import json

app = FastAPI()
client = OpenAI()


@app.post("/chat/stream")
async def chat_stream(request: Request):
    body = await request.json()
    messages = body.get("messages", [])

    async def event_generator():
        stream = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            stream=True,
        )

        for chunk in stream:
            delta = chunk.choices[0].delta
            if delta.content:
                # Server-Sent Events format
                data = json.dumps({
                    "type": "content",
                    "content": delta.content,
                })
                yield f"data: {data}\n\n"

            if chunk.choices[0].finish_reason:
                data = json.dumps({
                    "type": "done",
                    "finish_reason": chunk.choices[0].finish_reason,
                })
                yield f"data: {data}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )
```

---

