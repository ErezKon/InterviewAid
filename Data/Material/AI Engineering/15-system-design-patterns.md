## 1. System Design Patterns

### Table of Contents

- [1.1 Common AI System Design Questions](#11-common-ai-system-design-questions)
- [1.2 Design Template: AI-Powered Customer Support](#12-design-template-ai-powered-customer-support)
- [1.3 Key Design Considerations Checklist](#13-key-design-considerations-checklist)
- [📐 Requirements](#requirements)
- [🏗️ Architecture Decisions](#architecture-decisions)
- [📊 Data](#data)
- [🛡️ Safety & Reliability](#safety-and-reliability)
- [📈 Observability & Evaluation](#observability-and-evaluation)
- [💰 Cost & Scale](#cost-and-scale)


### 1.1 Common AI System Design Questions

```mermaid
graph TB
    subgraph "Typical Interview System Designs"
        SD1["Design a customer support chatbot<br/>RAG + Agents + Escalation"]
        SD2["Design a code review assistant<br/>Multi-file context + Tool use"]
        SD3["Design a document Q&A system<br/>RAG at scale"]
        SD4["Design a content moderation pipeline<br/>Classifiers + LLM + Human-in-loop"]
        SD5["Design a real-time translation service<br/>Streaming + Low latency"]
        SD6["Design an AI-powered search engine<br/>Hybrid retrieval + Re-ranking"]
    end
```

### 1.2 Design Template: AI-Powered Customer Support

```mermaid
graph TB
    subgraph "Customer Support AI System"
        USER_MSG[Customer Message] --> CLASSIFY[Intent Classifier]

        CLASSIFY -->|FAQ| FAQ_RAG[FAQ RAG Pipeline]
        CLASSIFY -->|Account Issue| ACCOUNT[Account Agent<br/>with DB Tools]
        CLASSIFY -->|Technical| TECH[Technical Support RAG<br/>+ Documentation]
        CLASSIFY -->|Complaint| ESCALATE[Escalation Router]

        FAQ_RAG --> CONFIDENCE{Confidence<br/>> 0.85?}
        CONFIDENCE -->|Yes| AUTO_REPLY[Auto-Reply]
        CONFIDENCE -->|No| HUMAN[Human Agent Queue]

        ACCOUNT --> AUTH[Auth Check] --> TOOLS[Account Tools<br/>Order Lookup<br/>Refund Processing]
        TOOLS --> GUARDRAILS[Guardrails<br/>Action Limits]
        GUARDRAILS --> RESPONSE[Response + Actions]

        TECH --> SEARCH[Search Docs + KB]
        SEARCH --> GEN[Generate Answer]
        GEN --> CITE[Add Citations]
        CITE --> AUTO_REPLY

        ESCALATE --> SENTIMENT[Sentiment Analysis]
        SENTIMENT -->|Angry/Urgent| PRIORITY[Priority Queue]
        SENTIMENT -->|Normal| HUMAN
    end

    AUTO_REPLY --> FEEDBACK[Feedback Collection]
    RESPONSE --> FEEDBACK
    FEEDBACK --> EVAL_LOOP[Evaluation Loop<br/>for Improvement]

    style CLASSIFY fill:#36e,stroke:#fff,color:#fff
    style GUARDRAILS fill:#c33,stroke:#fff,color:#fff
    style EVAL_LOOP fill:#2a9,stroke:#fff,color:#fff
```

### 1.3 Key Design Considerations Checklist

```markdown
## System Design Checklist for AI Applications

### 📐 Requirements
- [ ] What is the acceptable latency? (Real-time vs. batch)
- [ ] What accuracy/quality threshold is needed?
- [ ] What is the expected QPS (queries per second)?
- [ ] What is the cost budget per query?
- [ ] What compliance/privacy requirements exist?

### 🏗️ Architecture Decisions
- [ ] Which model(s) to use? (API vs. self-hosted, size)
- [ ] RAG vs. fine-tuning vs. both?
- [ ] Synchronous vs. asynchronous processing?
- [ ] Single-model vs. multi-model routing?
- [ ] Agentic vs. pipeline architecture?

### 📊 Data
- [ ] What data sources feed the system?
- [ ] How is data kept current? (Ingestion frequency)
- [ ] What is the chunking/indexing strategy?
- [ ] How to handle data quality issues?

### 🛡️ Safety & Reliability
- [ ] Input validation and injection prevention
- [ ] Output guardrails (PII, toxicity, hallucination)
- [ ] Fallback strategy when AI fails
- [ ] Human-in-the-loop escalation paths
- [ ] Rate limiting and abuse prevention

### 📈 Observability & Evaluation
- [ ] How are you measuring quality in production?
- [ ] What is your evaluation dataset? How is it maintained?
- [ ] How do you detect model drift or degradation?
- [ ] What alerting exists for quality drops?
- [ ] A/B testing framework for prompt changes?

### 💰 Cost & Scale
- [ ] Cost per query estimation
- [ ] Caching strategy (exact, semantic, prefix)
- [ ] Batching opportunities
- [ ] Model distillation opportunities
- [ ] Auto-scaling configuration
```

---

