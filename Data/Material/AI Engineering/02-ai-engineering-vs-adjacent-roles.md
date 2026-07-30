## 2. AI Engineering vs. Adjacent Roles

```mermaid
graph TB
    subgraph "Role Spectrum"
        DS["🔬 Data Scientist<br/>Statistical modeling<br/>Hypothesis testing<br/>EDA & Insights"]
        MLE["⚙️ ML Engineer<br/>Train custom models<br/>Feature stores<br/>MLOps pipelines"]
        AIE["🧠 AI Engineer<br/>LLM applications<br/>RAG & Agents<br/>Prompt engineering"]
        SWE["💻 Software Engineer<br/>Application logic<br/>APIs & Frontend<br/>Infrastructure"]
    end

    DS --- MLE
    MLE --- AIE
    AIE --- SWE

    style AIE fill:#e63,stroke:#fff,color:#fff
```

| Dimension | Data Scientist | ML Engineer | **AI Engineer** | Software Engineer |
|---|---|---|---|---|
| **Primary tool** | Notebooks, stats | PyTorch, TF | LLM APIs, orchestrators | Languages, frameworks |
| **Data focus** | Analysis & insight | Training data pipelines | Context & retrieval data | Application data |
| **Model relationship** | Builds statistical models | Trains/deploys ML models | **Consumes & orchestrates** foundation models | Uses APIs |
| **Key metric** | Statistical significance | Model accuracy / F1 | Task completion, user satisfaction, cost | Uptime, latency |
| **Iteration loop** | Experiment → Analyze | Train → Evaluate → Retrain | **Prompt → Evaluate → Refine** | Code → Test → Ship |

---

