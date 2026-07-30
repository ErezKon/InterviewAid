## 3. The Modern AI Stack

### Table of Contents

- [Key Technology Categories](#key-technology-categories)


```mermaid
graph TB
    subgraph "Application Layer"
        APP[AI-Native Application]
        UI[Chat UI / API Endpoints]
    end

    subgraph "Orchestration Layer"
        ORCH[LangChain / LlamaIndex / Semantic Kernel / Custom]
        AGENTS[Agent Frameworks]
        MEMORY[Conversation Memory]
    end

    subgraph "Context Layer"
        RAG[RAG Pipeline]
        VDB[(Vector Database)]
        EMB[Embedding Models]
        CHUNK[Chunking & Indexing]
    end

    subgraph "Model Layer"
        API[Model APIs<br/>OpenAI / Anthropic / Google]
        OSS[Open-Source Models<br/>Llama / Mistral / Qwen]
        FT[Fine-Tuned Models]
        GW[Model Gateway / Router]
    end

    subgraph "Infrastructure Layer"
        GPU[GPU Serving<br/>vLLM / TGI / Triton]
        CACHE[Semantic Cache]
        OBS[Observability<br/>LangSmith / Helicone / Arize]
        GUARD[Guardrails]
    end

    APP --> UI
    UI --> ORCH
    ORCH --> AGENTS
    ORCH --> MEMORY
    ORCH --> RAG
    RAG --> VDB
    RAG --> EMB
    RAG --> CHUNK
    ORCH --> GW
    GW --> API
    GW --> OSS
    GW --> FT
    OSS --> GPU
    GW --> CACHE
    ORCH --> OBS
    ORCH --> GUARD

    style APP fill:#e63,stroke:#fff,color:#fff
    style ORCH fill:#36e,stroke:#fff,color:#fff
    style RAG fill:#2a9,stroke:#fff,color:#fff
    style GW fill:#d4a,stroke:#fff,color:#fff
```

### Key Technology Categories

| Category | Tools / Services |
|---|---|
| **Model Providers** | OpenAI, Anthropic, Google (Gemini), Mistral, Cohere, AWS Bedrock |
| **Open-Source Models** | Llama 3/4, Mistral, Qwen, DeepSeek, Gemma, Phi |
| **Orchestration** | LangChain, LlamaIndex, Semantic Kernel, Haystack, DSPy |
| **Agent Frameworks** | LangGraph, CrewAI, AutoGen, OpenAI Agents SDK |
| **Vector Databases** | Pinecone, Weaviate, Qdrant, Milvus, Chroma, pgvector |
| **Embedding Models** | OpenAI `text-embedding-3`, Cohere Embed, BGE, E5, Jina |
| **Model Serving** | vLLM, TGI (HuggingFace), Ollama, Triton, TensorRT-LLM |
| **Evaluation** | RAGAS, DeepEval, Promptfoo, Braintrust, custom harnesses |
| **Observability** | LangSmith, Langfuse, Helicone, Arize Phoenix, Weights & Biases |
| **Guardrails** | Guardrails AI, NeMo Guardrails, Lakera, custom classifiers |

---

