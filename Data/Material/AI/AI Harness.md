## 5. AI Harness

### 5.1 Definition

An **AI harness** (also called an **AI coding harness** or **agent harness**) is an
infrastructure layer or framework that **wraps, controls, and mediates** the
interaction between human developers and AI coding agents. It provides structure,
guardrails, context management, and workflow orchestration.

Think of it as the **control plane** for AI-assisted development.

### 5.2 What an AI Harness Does

```
┌─────────────────────────────────────────────────────────┐
│                     AI HARNESS                          │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  Context     │  │  Guardrails │  │  Tool           │ │
│  │  Management  │  │  & Rules    │  │  Orchestration  │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  Spec        │  │  Memory     │  │  Output         │ │
│  │  Injection   │  │  Management │  │  Validation     │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
│                                                         │
│     Developer ◄──────────────────────► AI Agent(s)      │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Key Responsibilities

| Responsibility | Description |
|---|---|
| **Context feeding** | Determines what files, specs, and docs to inject into the prompt |
| **Prompt construction** | Assembles system prompt + context + user intent |
| **Tool routing** | Decides which tools (file read/write, terminal, browser) the agent can use |
| **Output validation** | Checks generated code against linters, tests, type checkers |
| **Session management** | Handles context window limits, rotation, summarization |
| **Guardrails** | Prevents destructive operations (e.g., `rm -rf /`) |
| **Audit trail** | Logs all agent actions for review |

### 5.4 Examples in Practice

- **Windsurf's Cascade** — Acts as a harness for its AI coding agent
- **Cursor's Composer** — Orchestrates multi-file edits with context management
- **Devin** — Full harness with VM, browser, terminal, and editor access
- **Custom harnesses** — Teams build internal harnesses using LangChain/LangGraph +
  custom tooling

### 5.5 Why It Matters for Principal Engineers

As a Principal Engineer, you may be expected to **design or evaluate** AI harnesses.
Key considerations:

- How much autonomy does the agent get?
- How do you prevent hallucinated code from reaching production?
- How do you manage context efficiently to avoid context rot?
- How do you ensure the agent follows team coding standards?
- How do you integrate with existing CI/CD pipelines?
