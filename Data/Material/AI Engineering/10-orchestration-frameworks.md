## 1. Orchestration Frameworks

### Table of Contents

- [1.1 Framework Comparison](#11-framework-comparison)
- [1.2 LangGraph Example — Stateful Agent](#12-langgraph-example-stateful-agent)
- [1.3 DSPy — Programmatic Prompt Optimization](#13-dspy-programmatic-prompt-optimization)


### 1.1 Framework Comparison

| Framework | Philosophy | Best For | Language |
|---|---|---|---|
| **LangChain** | Composable chains & agents | General purpose, rapid prototyping | Python, JS |
| **LangGraph** | Stateful graphs with cycles | Complex agent workflows | Python, JS |
| **LlamaIndex** | Data framework for LLMs | RAG-heavy applications | Python, TS |
| **Semantic Kernel** | Enterprise AI orchestration | Microsoft ecosystem, .NET | C#, Python, Java |
| **DSPy** | Programmatic prompt optimization | Research, systematic optimization | Python |
| **Haystack** | Pipeline-based NLP | Production NLP/RAG | Python |
| **CrewAI** | Multi-agent collaboration | Multi-agent systems | Python |
| **Mastra** | TypeScript AI framework | TS-native agent building | TypeScript |

### 1.2 LangGraph Example — Stateful Agent

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
import operator


class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    next_step: str
    research_data: str
    draft: str
    review_feedback: str
    iteration: int


def researcher(state: AgentState) -> dict:
    """Research step: gather information."""
    llm = ChatOpenAI(model="gpt-4o")
    messages = state["messages"]

    response = llm.invoke([
        SystemMessage(content="You are a research assistant. Gather key facts."),
        *messages,
    ])

    return {
        "research_data": response.content,
        "messages": [response],
        "next_step": "writer",
    }


def writer(state: AgentState) -> dict:
    """Writing step: create a draft from research."""
    llm = ChatOpenAI(model="gpt-4o")

    response = llm.invoke([
        SystemMessage(content=(
            "You are a technical writer. Write a clear, well-structured "
            "document based on the research data provided."
        )),
        HumanMessage(content=f"Research:\n{state['research_data']}"),
    ])

    return {
        "draft": response.content,
        "messages": [response],
        "next_step": "reviewer",
    }


def reviewer(state: AgentState) -> dict:
    """Review step: critique and suggest improvements."""
    llm = ChatOpenAI(model="gpt-4o")

    response = llm.invoke([
        SystemMessage(content=(
            "You are an editor. Review this draft for accuracy, clarity, and "
            "completeness. If the draft is good enough, respond with ONLY "
            "'APPROVED'. Otherwise, provide specific feedback for improvement."
        )),
        HumanMessage(content=f"Draft:\n{state['draft']}"),
    ])

    feedback = response.content
    is_approved = "APPROVED" in feedback.upper()

    return {
        "review_feedback": feedback,
        "messages": [response],
        "next_step": "end" if is_approved else "writer",
        "iteration": state.get("iteration", 0) + 1,
    }


def should_continue(state: AgentState) -> str:
    """Routing function: decide next step."""
    if state.get("iteration", 0) >= 3:  # Max revisions
        return "end"
    return state.get("next_step", "end")


# Build the graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("researcher", researcher)
workflow.add_node("writer", writer)
workflow.add_node("reviewer", reviewer)

# Add edges
workflow.set_entry_point("researcher")
workflow.add_edge("researcher", "writer")
workflow.add_edge("writer", "reviewer")
workflow.add_conditional_edges("reviewer", should_continue, {
    "writer": "writer",
    "end": END,
})

# Compile
app = workflow.compile()

# Run
result = app.invoke({
    "messages": [HumanMessage(content="Write about microservices vs monoliths")],
    "next_step": "researcher",
    "research_data": "",
    "draft": "",
    "review_feedback": "",
    "iteration": 0,
})
```

### 1.3 DSPy — Programmatic Prompt Optimization

```python
import dspy

# DSPy replaces hand-crafted prompts with optimizable modules

# Configure the LM
lm = dspy.LM("openai/gpt-4o-mini")
dspy.configure(lm=lm)


# Define a signature (input/output spec)
class ClassifyReview(dspy.Signature):
    """Classify a product review into a sentiment category."""
    review: str = dspy.InputField(desc="The customer review text")
    sentiment: str = dspy.OutputField(desc="POSITIVE, NEGATIVE, or NEUTRAL")
    reasoning: str = dspy.OutputField(desc="Brief explanation for the classification")


# Use it with Chain-of-Thought
classifier = dspy.ChainOfThought(ClassifyReview)

# Run it
result = classifier(review="The product works fine but shipping took forever.")
print(f"Sentiment: {result.sentiment}")
print(f"Reasoning: {result.reasoning}")

# --- Optimization with DSPy ---
# The key innovation: automatically optimize prompts using training data

class RAGAnswer(dspy.Signature):
    """Answer questions using provided context."""
    context: str = dspy.InputField(desc="Retrieved documents")
    question: str = dspy.InputField(desc="User question")
    answer: str = dspy.OutputField(desc="Answer based on the context")


class RAGModule(dspy.Module):
    def __init__(self):
        self.generate = dspy.ChainOfThought(RAGAnswer)

    def forward(self, context: str, question: str):
        return self.generate(context=context, question=question)


# Compile (optimize) with training examples
from dspy.teleprompt import BootstrapFewShot

# Metric function
def validate_answer(example, prediction, trace=None):
    return example.answer.lower() in prediction.answer.lower()

optimizer = BootstrapFewShot(metric=validate_answer, max_bootstrapped_demos=4)

# trainset = [dspy.Example(context=..., question=..., answer=...), ...]
# optimized_rag = optimizer.compile(RAGModule(), trainset=trainset)
```

---

