## 12. n8n & LangGraph

### 12.1 n8n

#### What Is n8n?

**n8n** (pronounced "n-eight-n", stands for "nodemation") is an **open-source
workflow automation platform** — think Zapier or Make (Integromat) but
self-hostable, extendable, and with a strong focus on **AI agent workflows**.

#### Key Features

| Feature | Description |
|---|---|
| **Visual workflow editor** | Drag-and-drop node-based canvas |
| **400+ integrations** | Slack, GitHub, Jira, databases, APIs, etc. |
| **AI agent nodes** | Built-in support for LLM chains and agents |
| **Self-hostable** | Run on your own infrastructure (Docker, K8s) |
| **Code nodes** | Write custom JavaScript/Python when needed |
| **Credential management** | Securely store API keys, tokens |
| **Webhook triggers** | Start workflows from HTTP requests |
| **Fair-code license** | Source-available; free to self-host |

#### n8n Architecture

```mermaid
flowchart LR
    Trigger[Trigger\n(Webhook / Cron)]
    Agent[AI Agent Node]
    Process[Process Result\n(Slack message, DB write, etc.)]

    subgraph Tools[Tools]
        SQL[SQL Query]
        HTTP[HTTP Request]
    end

    Trigger --> Agent --> Process
    Agent --> SQL
    Agent --> HTTP
```

#### Example Use Cases

1. **AI-powered ticket triage** — Webhook receives Jira ticket → LLM classifies
   priority and team → auto-assigns and notifies via Slack
2. **Document processing pipeline** — New PDF uploaded to S3 → Extract text →
   Chunk → Embed → Store in Pinecone → Notify team
3. **Code review bot** — GitHub PR webhook → Fetch diff → LLM reviews code →
   Posts comments on PR

#### n8n vs Alternatives

| Feature | n8n | Zapier | Make | Custom Code |
|---|---|---|---|---|
| Self-hostable | ✅ | ❌ | ❌ | ✅ |
| AI agent support | ✅ Native | Limited | Limited | ✅ |
| Pricing | Free (self-host) | Expensive | Moderate | Free |
| Code flexibility | ✅ | Limited | Limited | ✅ |
| Visual editor | ✅ | ✅ | ✅ | ❌ |
| Enterprise ready | ✅ | ✅ | ✅ | Depends |

---

### 12.2 LangGraph

#### What Is LangGraph?

**LangGraph** is a framework (by LangChain) for building **stateful, multi-actor
AI agent applications** using a **graph-based** architecture. It models agent
workflows as **directed graphs** where nodes are computational steps and edges
define control flow (including cycles/loops).

#### Why LangGraph Exists

LangChain's original `AgentExecutor` was too rigid — hard to customize loops,
handle branching, or manage complex multi-agent workflows. LangGraph was created
to give developers **full control** over agent orchestration.

#### Core Concepts

| Concept | Description |
|---|---|
| **StateGraph** | The graph definition — nodes, edges, and state schema |
| **State** | A typed dictionary that flows through the graph and accumulates data |
| **Node** | A function that receives state, does work, and returns updated state |
| **Edge** | Connection between nodes (can be conditional) |
| **Conditional Edge** | Routes to different nodes based on state values |
| **Checkpointing** | Persists state at each step for debugging, resumption, and human-in-the-loop |
| **Human-in-the-loop** | Pause execution and wait for human approval |

#### LangGraph Architecture

```mermaid
flowchart TD
    Start([START])
    Plan[Plan Task\n(LLM node)]
    Route[Route Decision]
    Code[Code Agent]
    Research[Research Agent]
    Review[Review\n(LLM node)]
    NeedsFix{Needs Fixes?}
    End([END])

    Start --> Plan --> Route
    Route --> Code
    Route --> Research
    Code --> Review
    Research --> Review
    Review --> NeedsFix
    NeedsFix -->|YES (loop)| Code
    NeedsFix -->|NO| End
```

#### Code Example

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated, Literal
import operator

# 1. Define State
class AgentState(TypedDict):
    messages: Annotated[list, operator.add]  # Append-only message list
    plan: str
    code: str
    test_results: str
    iteration: int

# 2. Define Nodes
def planner(state: AgentState) -> dict:
    """LLM plans the implementation."""
    response = llm.invoke(f"Plan implementation for: {state['messages'][-1]}")
    return {"plan": response.content}

def coder(state: AgentState) -> dict:
    """LLM writes code based on the plan."""
    response = llm.invoke(f"Write code for plan: {state['plan']}")
    return {"code": response.content, "iteration": state["iteration"] + 1}

def tester(state: AgentState) -> dict:
    """Runs tests on the generated code."""
    result = run_tests(state["code"])
    return {"test_results": result}

def reviewer(state: AgentState) -> dict:
    """Reviews code quality."""
    response = llm.invoke(f"Review this code: {state['code']}")
    return {"messages": [response.content]}

# 3. Define Routing Logic
def should_continue(state: AgentState) -> Literal["coder", "end"]:
    if "PASS" in state["test_results"] or state["iteration"] >= 3:
        return "end"
    return "coder"  # Loop back

# 4. Build Graph
workflow = StateGraph(AgentState)

workflow.add_node("planner", planner)
workflow.add_node("coder", coder)
workflow.add_node("tester", tester)
workflow.add_node("reviewer", reviewer)

workflow.set_entry_point("planner")
workflow.add_edge("planner", "coder")
workflow.add_edge("coder", "tester")
workflow.add_conditional_edges("tester", should_continue, {
    "coder": "coder",
    "end": "reviewer"
})
workflow.add_edge("reviewer", END)

# 5. Compile & Run
app = workflow.compile()
result = app.invoke({
    "messages": ["Build a user authentication endpoint"],
    "plan": "",
    "code": "",
    "test_results": "",
    "iteration": 0
})
```

### 12.3 n8n vs LangGraph

| Dimension | n8n | LangGraph |
|---|---|---|
| **Type** | Visual workflow automation | Code-first agent framework |
| **Target user** | Ops, low-code devs, full-stack devs | ML/AI engineers, backend devs |
| **Interface** | Visual drag-and-drop | Python/TypeScript code |
| **State management** | Basic (workflow variables) | Advanced (typed state, checkpoints) |
| **AI focus** | General automation + AI nodes | AI-agent-first design |
| **Loops/Cycles** | Limited | First-class support |
| **Human-in-the-loop** | Basic (manual approval nodes) | Advanced (breakpoints, state editing) |
| **Deployment** | Self-host or cloud | Library (you deploy your app) |
| **Best for** | Business process automation with AI | Complex, stateful AI agent systems |
