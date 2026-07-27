# Principal Full Stack Engineer — AI & Modern Development Study Guide

> A comprehensive reference covering Generative AI, Agentic AI, LLMs, RAG, MCP,
> Vibe Coding, Spec-Driven Development, and the surrounding ecosystem.

---

## Table of Contents

1. [Generative AI vs Agentic AI](#1-generative-ai-vs-agentic-ai)
2. [How Large Language Models (LLMs) Work](#2-how-large-language-models-llms-work)
3. [AI Agents & Sub-Agents](#3-ai-agents--sub-agents)
4. [Context Window & Context Rot](#4-context-window--context-rot)
5. [AI Harness](#5-ai-harness)
6. [Skills & Workflows (Windsurf / Devin)](#6-skills--workflows-windsurf--devin)
7. [Agent Memory](#7-agent-memory)
8. [Vector Databases](#8-vector-databases)
9. [RAG — Retrieval-Augmented Generation](#9-rag--retrieval-augmented-generation)
10. [MCP — Model Context Protocol](#10-mcp--model-context-protocol)
11. [System Prompt](#11-system-prompt)
12. [n8n & LangGraph](#12-n8n--langgraph)
13. [Vibe Coding — And Why It Is Problematic](#13-vibe-coding--and-why-it-is-problematic)
14. [SDD — Spec-Driven Development](#14-sdd--spec-driven-development)
15. [Quick-Reference Comparison Tables](#15-quick-reference-comparison-tables)
16. [Interview Tips & Talking Points](#16-interview-tips--talking-points)

---

## 1. Generative AI vs Agentic AI

### 1.1 Generative AI

**Definition:**
Generative AI refers to a class of artificial-intelligence models that can *generate*
new content — text, images, audio, video, or code — by learning statistical patterns
from massive training datasets. The model produces outputs that are *novel* but
*statistically consistent* with the data it was trained on.

**Key characteristics:**

| Characteristic | Detail |
|---|---|
| Output type | Content creation (text, image, code, music, etc.) |
| Interaction model | Single prompt → single response (stateless by default) |
| Decision making | None — it *generates*, it does not *decide* or *act* |
| Examples | ChatGPT, DALL·E, Stable Diffusion, GitHub Copilot, Claude |

**How it works (simplified):**

```
User Prompt ──▶ Model (e.g., GPT-4) ──▶ Generated Output
                   ▲
            Training Data
         (books, code, web, etc.)
```

### 1.2 Agentic AI

**Definition:**
Agentic AI refers to AI systems that can *autonomously plan, reason, use tools,
and take multi-step actions* to accomplish a goal. Rather than producing a single
response, an agent **loops** — it observes, thinks, acts, and re-evaluates until
the task is complete.

**Key characteristics:**

| Characteristic | Detail |
|---|---|
| Output type | Actions + decisions + content |
| Interaction model | Goal → plan → iterative tool use → result |
| Decision making | Yes — autonomous planning and execution |
| Persistence | Maintains state, memory, and context across steps |
| Examples | Devin, OpenAI Agents SDK, AutoGPT, CrewAI, LangGraph agents |

**How it works (simplified):**

```
User Goal
   │
   ▼
┌──────────────┐
│   OBSERVE    │◀──────────────────┐
│  (read state)│                   │
└──────┬───────┘                   │
       ▼                           │
┌──────────────┐                   │
│    THINK     │                   │
│ (plan / LLM) │                   │
└──────┬───────┘                   │
       ▼                           │
┌──────────────┐                   │
│     ACT      │                   │
│ (use tools)  │───────────────────┘
└──────┬───────┘        (loop until done)
       ▼
     Result
```

### 1.3 Side-by-Side Comparison

| Dimension | Generative AI | Agentic AI |
|---|---|---|
| Autonomy | Low — responds to prompts | High — pursues goals |
| State | Stateless (unless chat history is managed externally) | Stateful — maintains memory |
| Tool use | None (unless explicitly integrated) | Core capability |
| Planning | None | Multi-step planning & re-planning |
| Error recovery | None — user must re-prompt | Self-correcting loops |
| Example use case | "Write me a function that sorts an array" | "Build and deploy a REST API for user management" |

### 1.4 The Spectrum

It is more accurate to think of this as a **spectrum** rather than a binary:

```
Pure Generative ◄────────────────────────────────────► Fully Agentic
     │                        │                              │
  Single-turn           Multi-turn with               Autonomous
  completion            tool calling                   goal pursuit
  (GPT completion)      (ChatGPT + plugins)            (Devin, AutoGPT)
```

---

## 2. How Large Language Models (LLMs) Work

### 2.1 Core Concept

An LLM is a deep neural network — specifically a **Transformer** — trained to
predict the next token in a sequence. Despite this seemingly simple objective,
scale (billions of parameters + massive data) produces emergent capabilities
like reasoning, translation, code generation, and summarization.

### 2.2 Architecture — The Transformer

The Transformer architecture (Vaswani et al., 2017, "Attention Is All You Need")
is the foundation of all modern LLMs.

```
Input Text
    │
    ▼
┌─────────────┐
│ Tokenizer   │   "Hello world" → [15496, 995]
└──────┬──────┘
       ▼
┌─────────────┐
│ Embedding   │   Token IDs → dense vectors (e.g., 4096-dim)
│   Layer     │
└──────┬──────┘
       ▼
┌─────────────────────────────────┐
│  Transformer Blocks (×N)       │
│  ┌───────────────────────────┐  │
│  │  Multi-Head Self-Attention│  │  ← "Which tokens should I attend to?"
│  └────────────┬──────────────┘  │
│               ▼                 │
│  ┌───────────────────────────┐  │
│  │  Feed-Forward Network     │  │  ← Non-linear transformation
│  └────────────┬──────────────┘  │
│               ▼                 │
│  ┌───────────────────────────┐  │
│  │  Layer Normalization +    │  │
│  │  Residual Connection      │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
       │  (repeat N times; N=96 for GPT-4 class)
       ▼
┌─────────────┐
│  Linear +   │   Produces logits over vocabulary (~100k tokens)
│  Softmax    │
└──────┬──────┘
       ▼
  Next Token Prediction
  (token with highest probability, or sampled with temperature)
```

### 2.3 Key Concepts

#### Tokenization
Text is split into sub-word units called **tokens**.

```
"unhappiness" → ["un", "happiness"]
"ChatGPT"    → ["Chat", "G", "PT"]
```

Common tokenizers: BPE (Byte-Pair Encoding), SentencePiece, tiktoken.

#### Self-Attention Mechanism
Every token computes **attention scores** against every other token, enabling the
model to understand relationships regardless of distance in the text.

```
Query (Q), Key (K), Value (V) matrices:

Attention(Q, K, V) = softmax(Q × Kᵀ / √d_k) × V
```

This is what allows the model to understand that in "The cat sat on the mat
because **it** was tired," the word "it" refers to "cat."

#### Training Phases

| Phase | What happens | Data |
|---|---|---|
| **Pre-training** | Next-token prediction on massive corpus | Trillions of tokens from the internet |
| **Supervised Fine-Tuning (SFT)** | Train on curated prompt-response pairs | High-quality human-written examples |
| **RLHF / RLAIF** | Reinforce preferred responses using human or AI feedback | Comparison / preference data |

#### Inference Parameters

| Parameter | Effect |
|---|---|
| **Temperature** | Controls randomness. 0 = deterministic, 1+ = creative |
| **Top-p (nucleus sampling)** | Only sample from tokens comprising the top p% of probability mass |
| **Top-k** | Only sample from the k most likely tokens |
| **Max tokens** | Hard cap on output length |
| **Stop sequences** | Strings that signal the model to stop generating |

### Top-k vs Top-p Sampling

#### Top-k: Fixed Number of Candidates

Top-k keeps exactly the **k most probable tokens**, regardless of their actual probabilities.

```
Example: top_k = 3

Token        Probability
─────────    ───────────
"Paris"      0.50   ✅ (rank 1)
"London"     0.25   ✅ (rank 2)
"Berlin"     0.10   ✅ (rank 3)
"Madrid"     0.05   ❌ (rank 4 — cut off)
"Rome"       0.04   ❌
"Tokyo"      0.03   ❌
...others    0.03   ❌

→ Model samples from {"Paris", "London", "Berlin"} only
→ Always exactly 3 candidates, no matter what
```

**The problem with top-k:** It's blind to the probability distribution.

```
SCENARIO A: Model is confident          SCENARIO B: Model is uncertain
top_k = 3                               top_k = 3

"Paris"   0.90  ✅                       "Paris"   0.12  ✅
"London"  0.04  ✅ ← noise, shouldn't    "London"  0.11  ✅
"Berlin"  0.02  ✅ ← be here             "Berlin"  0.10  ✅
"Madrid"  0.01  ❌                       "Madrid"  0.09  ❌ ← should be included
"Rome"    0.01  ❌                       "Rome"    0.08  ❌ ← should be included
                                         "Tokyo"   0.08  ❌ ← should be included

In A: top-k=3 includes junk tokens (too many candidates)
In B: top-k=3 excludes valid tokens (too few candidates)
```

---

#### Top-p (Nucleus Sampling): Dynamic Number Based on Cumulative Probability

Top-p keeps the **smallest set of tokens whose cumulative probability reaches p**, so the number of candidates **adapts** to the model's confidence.

```
Example: top_p = 0.90

Token        Probability   Cumulative
─────────    ───────────   ──────────
"Paris"      0.50          0.50   ✅ (still under 0.90)
"London"     0.25          0.75   ✅ (still under 0.90)
"Berlin"     0.10          0.85   ✅ (still under 0.90)
"Madrid"     0.05          0.90   ✅ (just hit 0.90 — include, then stop)
"Rome"       0.04          0.94   ❌ (over threshold)
"Tokyo"      0.03          0.97   ❌
...

→ Model samples from {"Paris", "London", "Berlin", "Madrid"}
→ 4 candidates this time — but could be 2 or 20 depending on distribution
```

**Top-p adapts automatically:**

```
SCENARIO A: Model is confident          SCENARIO B: Model is uncertain
top_p = 0.90                            top_p = 0.90

"Paris"   0.90  ✅  cum=0.90 STOP       "Paris"   0.12  ✅  cum=0.12
                                         "London"  0.11  ✅  cum=0.23
→ Only 1 candidate!                      "Berlin"  0.10  ✅  cum=0.33
   (Model is sure, so let it be sure)    "Madrid"  0.09  ✅  cum=0.42
                                         "Rome"    0.08  ✅  cum=0.50
                                         "Tokyo"   0.08  ✅  cum=0.58
                                         "Oslo"    0.07  ✅  cum=0.65
                                         "Cairo"   0.07  ✅  cum=0.72
                                         "Lima"    0.06  ✅  cum=0.78
                                         "Seoul"   0.06  ✅  cum=0.84
                                         "Delhi"   0.06  ✅  cum=0.90 STOP

                                         → 11 candidates!
                                            (Model is unsure, so explore more)
```

---

#### Side-by-Side Summary

| Dimension | Top-k | Top-p |
|---|---|---|
| **What it controls** | Number of candidate tokens | Probability mass of candidates |
| **Fixed or dynamic?** | Fixed count (always k tokens) | Dynamic count (adapts to confidence) |
| **When model is confident** | Still picks k tokens (may include noise) | Narrows to very few tokens |
| **When model is uncertain** | Still only k tokens (may miss good options) | Expands to many tokens |
| **Typical values** | k = 10–100 | p = 0.85–0.95 |
| **Analogy** | "Pick the top 5 students" | "Pick enough students to cover 90% of the total score" |

#### In Practice

Most modern APIs **default to top-p** (nucleus sampling) because it adapts better. Some APIs let you combine them — in that case, both filters are applied and the **more restrictive** one wins:

```
top_k = 50, top_p = 0.90

Step 1: Take top-50 tokens
Step 2: From those 50, keep only enough to reach 90% cumulative probability
→ You might end up with 5 tokens if the distribution is concentrated
```

**Rule of thumb:**
- Use **top-p** for most tasks (set between 0.9–0.95)
- Use **top-k** when you want a hard cap on candidate diversity
- Lower values → more focused/deterministic; higher values → more creative/random

### 2.4 Limitations

- **No true understanding** — statistical pattern matching, not comprehension
- **Hallucinations** — confidently produces plausible but incorrect information
- **Knowledge cutoff** — training data has a fixed date
- **Context window limits** — can only process a finite number of tokens at once
- **Expensive** — training costs millions of dollars; inference costs scale with usage

---

## 3. AI Agents & Sub-Agents

### 3.1 What Is an AI Agent?

An **AI agent** is a software system that uses an LLM as its "brain" to
autonomously **perceive**, **plan**, **decide**, and **act** in pursuit of a goal.
It combines the reasoning capabilities of an LLM with the ability to use external
**tools** (APIs, databases, file systems, browsers, code interpreters).

**Core components:**

```
┌──────────────────────────────────────────────────┐
│                   AI AGENT                       │
│                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │   LLM      │  │   Tools    │  │  Memory    │ │
│  │  (Brain)   │  │ (Hands)    │  │ (History)  │ │
│  └────────────┘  └────────────┘  └────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │          Planning / Orchestration          │  │
│  │   (ReAct, CoT, Tool Selection, Looping)   │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### 3.2 The ReAct Pattern (Reasoning + Acting)

The most common agent loop:

```
Goal: "Find the current stock price of AAPL and email it to john@example.com"

Step 1 — THOUGHT:  I need to look up the stock price of AAPL.
Step 2 — ACTION:   call tool `get_stock_price(ticker="AAPL")`
Step 3 — OBSERVATION: $213.47
Step 4 — THOUGHT:  Now I have the price. I need to send an email.
Step 5 — ACTION:   call tool `send_email(to="john@example.com",
                   subject="AAPL Price", body="Current price: $213.47")`
Step 6 — OBSERVATION: Email sent successfully.
Step 7 — THOUGHT:  Task complete.
Step 8 — FINAL ANSWER: "Done. Emailed AAPL price ($213.47) to john@example.com."
```

### 3.3 What Is a Sub-Agent?

A **sub-agent** is a specialized agent that is **delegated to by a parent agent**
to handle a specific subtask. This creates a **hierarchical multi-agent system**.

```
┌──────────────────────────────────────┐
│         ORCHESTRATOR AGENT           │
│   (Understands the full goal)        │
│                                      │
│   Delegates to:                      │
│   ┌──────────┐  ┌──────────┐        │
│   │ Research  │  │  Coding  │        │
│   │ Sub-Agent │  │ Sub-Agent│        │
│   └──────────┘  └──────────┘        │
│   ┌──────────┐  ┌──────────┐        │
│   │  Testing  │  │  Deploy  │        │
│   │ Sub-Agent │  │ Sub-Agent│        │
│   └──────────┘  └──────────┘        │
└──────────────────────────────────────┘
```

**How sub-agents work:**

1. The **orchestrator** receives a high-level goal
2. It **decomposes** the goal into subtasks
3. Each subtask is **delegated** to a specialized sub-agent
4. Sub-agents execute independently, potentially with their own tools and memory
5. Results are **returned** to the orchestrator
6. The orchestrator **synthesizes** results and continues

**Example — Devin-style coding agent:**

```
User: "Add user authentication to the Express app"

Orchestrator Agent:
  ├── Planning Sub-Agent → Creates implementation plan
  ├── Research Sub-Agent → Looks up best practices, checks docs
  ├── Coding Sub-Agent   → Writes the actual code (passport.js setup, routes, etc.)
  ├── Testing Sub-Agent  → Writes and runs tests
  └── Review Sub-Agent   → Reviews code for security issues
```

### 3.4 Pros and Cons

| Aspect | Pros | Cons |
|---|---|---|
| Single Agent | Simple, easy to debug | Limited capability, context overload |
| Multi-Agent (Sub-Agents) | Separation of concerns, specialized tools per agent | Complex orchestration, higher cost, error propagation |

### 3.5 Frameworks for Building Agents

| Framework | Creator | Key Feature |
|---|---|---|
| **OpenAI Agents SDK** | OpenAI | Native handoffs, tool calling, guardrails |
| **LangGraph** | LangChain | Graph-based stateful agent workflows |
| **CrewAI** | CrewAI | Role-based multi-agent collaboration |
| **AutoGen** | Microsoft | Multi-agent conversation framework |
| **Semantic Kernel** | Microsoft | Enterprise-grade agent orchestration |

---

## 4. Context Window & Context Rot

### 4.1 Context Window

**Definition:**
The **context window** is the maximum number of tokens an LLM can process in a
single inference call. It includes *everything* — the system prompt, conversation
history, user input, tool results, AND the model's output.

```
◄──────────────── Context Window (e.g., 128K tokens) ────────────────►
┌────────────┬──────────────────┬──────────────┬────────────────────┐
│  System    │  Conversation    │   Current    │   Model's          │
│  Prompt    │  History         │   User Input │   Output           │
│  (~500)    │  (~50,000)       │   (~2,000)   │   (~4,000)         │
└────────────┴──────────────────┴──────────────┴────────────────────┘
```

**Context windows by model (as of mid-2025):**

| Model | Context Window |
|---|---|
| GPT-4o | 128K tokens |
| Claude 3.5 / Claude 4 | 200K tokens |
| Gemini 1.5 Pro | 1M–2M tokens |
| Llama 3 | 8K–128K tokens |
| Mistral Large | 128K tokens |

**Important:**
A larger context window does NOT mean the model pays equal attention to all parts.
Research (e.g., "Lost in the Middle" paper) shows models attend most to the
**beginning** and **end** of the context, with degraded attention in the middle.

### 4.2 Context Rot (Context Degradation)

**Definition:**
**Context rot** is the progressive degradation of an AI agent's effectiveness as
its context window fills up during a long-running session. The model begins to
"forget," contradict itself, lose track of earlier instructions, or hallucinate.

**Why it happens:**

1. **Attention dilution** — With more tokens, self-attention scores spread thinner
2. **Lost in the middle** — Important information buried in the middle is ignored
3. **Instruction drift** — System prompt influence weakens as conversation grows
4. **Conflicting signals** — Earlier and later messages may contradict each other
5. **Summarization loss** — When history is compressed, nuance is lost

**Symptoms of context rot:**

```
Early in conversation:          Late in conversation:
✅ Follows coding standards      ❌ Ignores established patterns
✅ Remembers file structure      ❌ Creates duplicate files
✅ Consistent variable naming    ❌ Mixes naming conventions
✅ Accurate references           ❌ Hallucinates function names
✅ Follows system prompt         ❌ Drifts from original instructions
```

**Mitigation strategies:**

| Strategy | How It Helps |
|---|---|
| **Chunked sessions** | Start fresh sessions for new tasks |
| **Context summarization** | Periodically summarize and replace history |
| **RAG** | Keep knowledge external; retrieve only what's needed |
| **Pinned instructions** | Repeat critical instructions at the end of the prompt |
| **Spec files** | Feed structured specs instead of relying on memory |
| **Agent memory systems** | Store important facts externally, inject as needed |

---

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

---

## 6. Skills & Workflows (Windsurf / Devin)

### 6.1 Skills

**Definition:**
A **Skill** is a predefined, reusable capability that an AI coding agent can invoke.
It encapsulates a specific competency — like "write a unit test," "refactor a
function," or "create a database migration" — along with the instructions, context,
and constraints needed to execute it well.

**Analogy:** If the agent is a developer, skills are items on their résumé.

```yaml
# Example skill definition (conceptual)
skill:
  name: "create-react-component"
  description: "Creates a new React component following team conventions"
  inputs:
    - component_name: string
    - props: list
    - style_approach: "css-modules" | "tailwind" | "styled-components"
  instructions: |
    1. Create component file in src/components/{component_name}/
    2. Use functional component with TypeScript
    3. Include prop types interface
    4. Create accompanying test file
    5. Create index.ts barrel export
  constraints:
    - Must use named exports
    - Must include JSDoc comments
    - Must be accessible (ARIA attributes where applicable)
```

**In Windsurf:**
Windsurf allows developers to define and share custom skills that the Cascade agent
can use. These go beyond simple prompts — they include structured instructions,
file templates, and validation rules.

**In Devin:**
Devin has built-in skills (terminal use, browser navigation, code editing) and can
learn new skills through demonstration and instruction.

### 6.2 Workflows

**Definition:**
A **Workflow** is a structured, multi-step sequence of operations (often composed
of multiple skills) that defines how an agent should approach a complex task from
start to finish.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Step 1:    │────▶│   Step 2:    │────▶│   Step 3:    │
│  Read Spec   │     │ Generate Code│     │  Run Tests   │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                                          ┌───────▼───────┐
                                    ┌─ NO─┤ Tests Pass?   │
                                    │     └───────┬───────┘
                                    │             │ YES
                                    ▼             ▼
                             ┌──────────┐  ┌──────────────┐
                             │ Fix Code │  │  Step 4:     │
                             │ (loop)   │  │  Create PR   │
                             └──────────┘  └──────────────┘
```

**Example workflow in Windsurf/Devin context:**

```yaml
workflow:
  name: "feature-implementation"
  trigger: "implement feature from spec"
  steps:
    - skill: "read-spec"
      input: "{spec_file}"
    - skill: "analyze-codebase"
      input: "find relevant files and patterns"
    - skill: "create-implementation-plan"
      output: "plan.md"
    - skill: "implement-code"
      input: "plan.md"
      loop_until: "all acceptance criteria met"
    - skill: "write-tests"
      input: "implementation files"
    - skill: "run-tests"
      retry: 3
      on_failure: "fix-code"
    - skill: "lint-and-format"
    - skill: "create-pull-request"
      input: "all changed files"
```

### 6.3 Skills vs Workflows

| Aspect | Skill | Workflow |
|---|---|---|
| Scope | Single capability | Multi-step process |
| Granularity | Atomic | Composite |
| Reusability | Highly reusable across workflows | Task-specific |
| Analogy | A function | A program |
| Example | "Write a unit test" | "Implement feature end-to-end" |

---

## 7. Agent Memory

### 7.1 Definition

**Agent memory** is the mechanism by which AI agents store, retrieve, and use
information across interactions. Without memory, every interaction starts from
scratch.

### 7.2 Types of Memory

```
┌─────────────────────────────────────────────────────────────────┐
│                      AGENT MEMORY                               │
│                                                                 │
│  ┌─────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │  SHORT-TERM     │  │  LONG-TERM       │  │  EPISODIC     │  │
│  │  (Working)      │  │  (Persistent)    │  │  (Experience) │  │
│  │                 │  │                  │  │               │  │
│  │  Current        │  │  Facts, prefs,   │  │  Past task    │  │
│  │  conversation   │  │  project rules   │  │  outcomes,    │  │
│  │  context        │  │  stored in DB    │  │  successes,   │  │
│  │                 │  │                  │  │  failures     │  │
│  └─────────────────┘  └──────────────────┘  └───────────────┘  │
│                                                                 │
│  ┌─────────────────┐  ┌──────────────────┐                     │
│  │  SEMANTIC       │  │  PROCEDURAL      │                     │
│  │  (Knowledge)    │  │  (How-to)        │                     │
│  │                 │  │                  │                     │
│  │  Domain facts,  │  │  Learned         │                     │
│  │  relationships, │  │  patterns,       │                     │
│  │  embeddings in  │  │  skills,         │                     │
│  │  vector DB      │  │  workflows       │                     │
│  └─────────────────┘  └──────────────────┘                     │
└─────────────────────────────────────────────────────────────────┘
```

### 7.3 Detailed Breakdown

#### Short-Term Memory (Working Memory)
- **What:** The current context window contents
- **Lifespan:** Single session / conversation
- **Capacity:** Limited by context window (e.g., 128K tokens)
- **Example:** The current chat history in Cursor or Windsurf

#### Long-Term Memory (Persistent Memory)
- **What:** Information stored externally and retrieved when needed
- **Lifespan:** Persists across sessions indefinitely
- **Storage:** Vector databases, key-value stores, relational DBs
- **Example:** Windsurf remembering your coding preferences across projects

```
Session 1: User says "I prefer tabs over spaces and use 4-width indentation"
   → Stored in long-term memory

Session 47: Agent retrieves preference automatically when generating code
   → Code uses tabs with 4-width indentation
```

#### Episodic Memory
- **What:** Records of past interactions, tasks, and their outcomes
- **Purpose:** Learn from experience — avoid repeating mistakes
- **Example:** "Last time I tried to refactor auth.ts, tests broke because
  of mock dependencies. I should update mocks first."

#### Semantic Memory
- **What:** Factual knowledge about the codebase, domain, or world
- **Storage:** Often vector databases with embeddings
- **Example:** Embeddings of all project documentation for RAG retrieval

#### Procedural Memory
- **What:** Knowledge of *how* to do things — patterns, workflows, skills
- **Example:** "When creating a new API endpoint, always: create route → 
  controller → service → test → update OpenAPI spec"

### 7.4 Implementation Patterns

```python
# Conceptual example: Memory-augmented agent

class AgentMemory:
    def __init__(self):
        self.short_term = []           # Current conversation
        self.long_term = VectorDB()    # Persistent knowledge
        self.episodic = []             # Past experiences
    
    def remember(self, fact: str, memory_type: str = "long_term"):
        if memory_type == "long_term":
            embedding = embed(fact)
            self.long_term.store(fact, embedding)
        elif memory_type == "episodic":
            self.episodic.append({
                "event": fact,
                "timestamp": now(),
                "outcome": None  # filled in later
            })
    
    def recall(self, query: str, top_k: int = 5) -> list[str]:
        """Retrieve relevant memories for the current context."""
        query_embedding = embed(query)
        return self.long_term.search(query_embedding, top_k=top_k)
    
    def get_context(self, current_query: str) -> str:
        """Build full context from all memory types."""
        relevant_memories = self.recall(current_query)
        recent_episodes = self.episodic[-5:]  # Last 5 episodes
        
        return f"""
        ## Relevant Knowledge
        {relevant_memories}
        
        ## Recent Experience
        {recent_episodes}
        
        ## Current Conversation
        {self.short_term[-20:]}  # Last 20 messages
        """
```

---

## 8. Vector Databases

### 8.1 Definition

A **vector database** (vectorized DB) is a specialized database designed to store,
index, and query **high-dimensional vectors** (embeddings). These embeddings are
numerical representations of data (text, images, audio) that capture *semantic
meaning*.

### 8.2 How Embeddings Work

```
Text: "The cat sat on the mat"
         │
         ▼
   Embedding Model (e.g., OpenAI text-embedding-3-small)
         │
         ▼
   Vector: [0.023, -0.041, 0.087, ..., 0.012]  ← 1536 dimensions
```

**Key insight:** Similar meanings produce vectors that are *close together* in
vector space, regardless of the exact words used.

```
"How do I reset my password?"  ←─── cosine similarity: 0.92 ───→  "Password recovery steps"
"How do I reset my password?"  ←─── cosine similarity: 0.23 ───→  "Best pizza in New York"
```

### 8.3 How Vector Databases Work

```
┌───────────────────────────────────────────────────────┐
│                  VECTOR DATABASE                       │
│                                                       │
│  Storage:                                             │
│  ┌─────────┬──────────────────────┬────────────────┐  │
│  │   ID    │   Vector (embedding) │   Metadata     │  │
│  ├─────────┼──────────────────────┼────────────────┤  │
│  │  doc_1  │  [0.02, -0.04, ...]  │  {src: "api"} │  │
│  │  doc_2  │  [0.15,  0.03, ...]  │  {src: "auth"} │ │
│  │  doc_3  │  [-0.01, 0.22, ...]  │  {src: "db"}  │  │
│  └─────────┴──────────────────────┴────────────────┘  │
│                                                       │
│  Indexing Algorithms:                                 │
│  • HNSW (Hierarchical Navigable Small World)          │
│  • IVF (Inverted File Index)                          │
│  • PQ (Product Quantization)                          │
│  • ScaNN (Scalable Nearest Neighbors)                 │
│                                                       │
│  Query: "How does authentication work?"               │
│    → embed → [0.14, 0.02, ...] → nearest neighbors   │
│    → Returns: doc_2 (similarity: 0.94)                │
└───────────────────────────────────────────────────────┘
```

### 8.4 Similarity Metrics

| Metric | Formula | Best For |
|---|---|---|
| **Cosine Similarity** | cos(θ) = A·B / (‖A‖·‖B‖) | Text similarity (most common) |
| **Euclidean Distance** | √Σ(aᵢ - bᵢ)² | When magnitude matters |
| **Dot Product** | Σ(aᵢ × bᵢ) | Normalized vectors, performance |

### 8.5 Popular Vector Databases

| Database | Type | Key Features |
|---|---|---|
| **Pinecone** | Cloud-managed | Serverless, easy setup, metadata filtering |
| **Weaviate** | Open-source | GraphQL API, hybrid search, multi-modal |
| **ChromaDB** | Open-source | Lightweight, embedded, great for prototyping |
| **Qdrant** | Open-source | Rust-based, high performance, rich filtering |
| **Milvus** | Open-source | Distributed, handles billions of vectors |
| **pgvector** | PostgreSQL extension | Use your existing Postgres with vector support |
| **FAISS** | Library (Meta) | Not a DB; in-memory index for fast similarity search |

### 8.6 Example: Using ChromaDB

```python
import chromadb
from chromadb.utils import embedding_functions

# Initialize
client = chromadb.PersistentClient(path="./chroma_data")
ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="sk-...",
    model_name="text-embedding-3-small"
)

# Create collection
collection = client.get_or_create_collection(
    name="codebase_docs",
    embedding_function=ef
)

# Add documents
collection.add(
    documents=[
        "The authentication module uses JWT tokens with RS256 signing.",
        "Database migrations are managed with Knex.js.",
        "The API rate limiter allows 100 requests per minute per user.",
    ],
    ids=["doc1", "doc2", "doc3"],
    metadatas=[
        {"module": "auth"},
        {"module": "database"},
        {"module": "api"},
    ]
)

# Query
results = collection.query(
    query_texts=["How does login work?"],
    n_results=2
)
# Returns: doc1 (auth/JWT) with highest similarity
```

### 8.7 Pros and Cons

| Pros | Cons |
|---|---|
| Semantic search (meaning, not just keywords) | Embedding quality depends on the model |
| Fast nearest-neighbor retrieval | Additional infrastructure to manage |
| Scalable to billions of vectors | Not suitable for exact-match or transactional queries |
| Enable RAG, recommendation, anomaly detection | Approximate results (trade-off: speed vs. accuracy) |

---

## 9. RAG — Retrieval-Augmented Generation

### 9.1 Definition

**RAG (Retrieval-Augmented Generation)** is an architecture pattern that enhances
LLM responses by **retrieving relevant information from external knowledge sources**
and injecting it into the prompt before generation. This grounds the model's
output in factual, up-to-date, domain-specific data.

### 9.2 Why RAG Exists

| Problem with Plain LLMs | How RAG Solves It |
|---|---|
| Knowledge cutoff (training data is stale) | Retrieves current information |
| Hallucinations | Grounds answers in real documents |
| No access to private/proprietary data | Indexes your internal docs |
| Context window limits | Retrieves only relevant chunks |
| Expensive fine-tuning | No retraining needed — just update the index |

### 9.3 How RAG Works

```
                        ┌─────────────────────────┐
                        │   INDEXING PHASE         │
                        │   (done once / on update)│
                        │                          │
  Documents ──────────▶ │  1. Chunk documents      │
  (PDFs, code, docs,   │  2. Generate embeddings   │
   wikis, APIs)         │  3. Store in Vector DB    │
                        └─────────────────────────┘

                        ┌─────────────────────────────────────┐
                        │   QUERY PHASE (every user query)     │
                        │                                     │
  User Query ─────┬────▶│  1. Embed the query                 │
                  │     │  2. Search Vector DB (top-k)        │
                  │     │  3. Retrieve relevant chunks        │
                  │     │  4. Construct augmented prompt:     │
                  │     │     [System + Context + Query]      │
                  │     │  5. Send to LLM                     │
                  │     │  6. LLM generates grounded answer   │
                  │     └─────────────────────────────────────┘
                  │
                  │     ┌─────────────────────────────────────┐
                  └────▶│         AUGMENTED PROMPT             │
                        │                                     │
                        │  System: You are a helpful assistant.│
                        │  Answer based on the provided       │
                        │  context only.                      │
                        │                                     │
                        │  Context:                           │
                        │  [Retrieved chunk 1]                │
                        │  [Retrieved chunk 2]                │
                        │  [Retrieved chunk 3]                │
                        │                                     │
                        │  User Question: {query}             │
                        └─────────────────────────────────────┘
```

### 9.4 Chunking Strategies

How you split documents significantly impacts retrieval quality.

| Strategy | Description | Best For |
|---|---|---|
| **Fixed-size** | Split every N characters/tokens | Simple, predictable |
| **Recursive** | Split by paragraphs → sentences → words | General purpose |
| **Semantic** | Split by meaning boundaries using embeddings | High-quality retrieval |
| **Code-aware** | Split by functions, classes, modules | Codebases |
| **Document-aware** | Split by headers, sections | Structured docs (Markdown, HTML) |

```python
# Example: Recursive chunking with LangChain
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,     # Overlap prevents losing context at boundaries
    separators=["\n\n", "\n", ". ", " ", ""]
)

chunks = splitter.split_text(document_text)
```

### 9.5 Advanced RAG Patterns

#### Naive RAG

Query → Embed → Retrieve → Generate

Simple but often insufficient for complex queries.

#### Advanced RAG

| Technique | Description |
|---|---|
| **Query Rewriting** | Rephrase the user query for better retrieval |
| **HyDE** (Hypothetical Document Embeddings) | Generate a hypothetical answer, embed it, use that for retrieval |
| **Multi-Query** | Generate multiple query variations, retrieve for each, merge results |
| **Re-Ranking** | Retrieve top-50, then use a cross-encoder to re-rank to top-5 |
| **Contextual Compression** | Compress retrieved chunks to only the relevant parts |
| **Parent-Child Retrieval** | Retrieve small chunks but return the larger parent chunk |

#### Modular RAG / Agentic RAG

```
Query → Agent decides:
  ├── Do I need retrieval at all?
  ├── Which knowledge base(s) to search?
  ├── Should I decompose the query first?
  ├── Are the retrieved results sufficient?
  │     └── No → reformulate query and retry
  └── Generate final answer from best context
```

### 9.6 RAG vs Fine-Tuning

| Dimension | RAG | Fine-Tuning |
|---|---|---|
| Knowledge update | Easy — update the index | Hard — retrain the model |
| Cost | Low (embedding + storage) | High (GPU training) |
| Transparency | High — can cite sources | Low — knowledge is implicit |
| Latency | Higher (retrieval step) | Lower (direct generation) |
| Best for | Factual Q&A, docs, codebase | Style, tone, format, specialized reasoning |

---

## 10. MCP — Model Context Protocol

### 10.1 Definition

**MCP (Model Context Protocol)** is an open standard (introduced by Anthropic, now
broadly adopted) that defines a **universal interface for connecting AI models to
external data sources and tools**. Think of it as the "USB-C for AI" — a standard
plug that lets any AI model connect to any data source or tool.

### 10.2 The Problem MCP Solves

Before MCP, every AI tool integration was custom:

```
BEFORE MCP (N×M integration problem):
┌───────────┐     ┌──────────┐
│ Claude     │────▶│ GitHub   │  Custom integration
│ ChatGPT   │────▶│ GitHub   │  Different custom integration
│ Cursor     │────▶│ GitHub   │  Yet another integration
│ Windsurf   │────▶│ GitHub   │  And another...
└───────────┘     └──────────┘
   × every tool = N×M integrations

AFTER MCP (N+M integration):
┌───────────┐     ┌─────────┐     ┌──────────┐
│ Claude     │     │         │     │ GitHub   │
│ ChatGPT   │────▶│   MCP   │◀────│ Slack    │
│ Cursor     │     │ Protocol│     │ Jira     │
│ Windsurf   │     │         │     │ Postgres │
└───────────┘     └─────────┘     └──────────┘
   N clients    +   standard    +  M servers = N+M integrations
```

### 10.3 Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     MCP ARCHITECTURE                         │
│                                                              │
│  ┌────────────┐        ┌────────────┐        ┌────────────┐ │
│  │  MCP HOST  │        │ MCP CLIENT │        │ MCP SERVER │ │
│  │            │ 1:many │            │  1:1   │            │ │
│  │ (Claude,   │───────▶│ (Protocol  │───────▶│ (GitHub,   │ │
│  │  Cursor,   │        │  handler)  │        │  Postgres, │ │
│  │  IDE)      │        │            │        │  Slack)    │ │
│  └────────────┘        └────────────┘        └────────────┘ │
│                                                              │
│  The HOST creates CLIENT instances that connect to SERVERs   │
└──────────────────────────────────────────────────────────────┘
```

### 10.4 MCP Capabilities (Primitives)

| Primitive | Direction | Description | Example |
|---|---|---|---|
| **Tools** | Server → Client (model-invoked) | Functions the LLM can call | `create_github_issue()` |
| **Resources** | Server → Client (app-controlled) | Data the server exposes | File contents, DB schemas |
| **Prompts** | Server → Client (user-invoked) | Pre-built prompt templates | "Summarize this PR" template |
| **Sampling** | Client → Server | Server can request LLM completions | Server asks the LLM to analyze data |

### 10.5 Example: Building an MCP Server

```python
# Simple MCP server using the Python SDK
from mcp.server import Server, stdio_server
from mcp.types import Tool, TextContent

server = Server("my-project-server")

@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="get_project_structure",
            description="Returns the file/folder structure of the project",
            inputSchema={
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Root path to scan"
                    }
                },
                "required": ["path"]
            }
        ),
        Tool(
            name="run_tests",
            description="Runs the project test suite",
            inputSchema={
                "type": "object",
                "properties": {
                    "test_path": {
                        "type": "string",
                        "description": "Specific test file or directory"
                    }
                }
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "get_project_structure":
        structure = scan_directory(arguments["path"])
        return [TextContent(type="text", text=structure)]
    elif name == "run_tests":
        result = run_test_suite(arguments.get("test_path", "."))
        return [TextContent(type="text", text=result)]

async def main():
    async with stdio_server() as (read, write):
        await server.run(read, write)
```

### 10.6 MCP Configuration (in Claude Desktop / Cursor)

```json
// claude_desktop_config.json or .cursor/mcp.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"]
    }
  }
}
```

### 10.7 Pros and Cons

| Pros | Cons |
|---|---|
| Universal standard — write once, use everywhere | Still evolving — breaking changes possible |
| Growing ecosystem of pre-built servers | Security surface area — agents get tool access |
| Open source and vendor-neutral | Debugging can be complex (stdio/SSE transport) |
| Reduces integration overhead dramatically | Not all AI platforms fully support it yet |
| Enables powerful agentic workflows | Performance overhead for simple use cases |

---

## 11. System Prompt

### 11.1 Definition

A **system prompt** (also called a **system message** or **system instruction**) is
a special instruction block sent to the LLM *before* the user's message that defines
the model's **identity, behavior, constraints, tone, and capabilities** for the
entire conversation.

### 11.2 How It Fits in the Message Structure

```json
{
  "messages": [
    {
      "role": "system",        // ◄── SYSTEM PROMPT
      "content": "You are a senior TypeScript developer. 
                  Always use functional components. 
                  Never use `any` type."
    },
    {
      "role": "user",          // ◄── User's message
      "content": "Create a React component for a todo list"
    },
    {
      "role": "assistant",     // ◄── Model's response
      "content": "Here's a TodoList component..."
    }
  ]
}
```

### 11.3 Anatomy of an Effective System Prompt

```
# System Prompt Structure

## 1. Identity & Role
You are [role]. You specialize in [domain].

## 2. Core Behavior
- Always do X
- Never do Y
- Prefer Z approach

## 3. Output Format
- Use [language/format]
- Include [required elements]
- Structure responses as [structure]

## 4. Constraints & Guardrails
- Do not [prohibited actions]
- If unsure, [fallback behavior]
- Always [safety requirement]

## 5. Context & Knowledge
- The project uses [tech stack]
- Follow [coding standards]
- Reference [documentation]

## 6. Examples (Few-Shot)
### Input: [example input]
### Output: [example output]
```

### 11.4 Real-World Example

```
You are a Principal Full Stack Engineer AI assistant for an enterprise SaaS platform.

## Tech Stack
- Frontend: React 18, TypeScript 5, TanStack Query, Tailwind CSS
- Backend: Node.js 20, Express, Prisma ORM, PostgreSQL 16
- Testing: Vitest, Playwright, MSW
- Infrastructure: AWS (ECS, RDS, S3), Terraform

## Coding Standards
- Use functional components with hooks; no class components
- All functions must have explicit return types
- Use `unknown` instead of `any`; use type guards for narrowing
- Prefer composition over inheritance
- All API endpoints must have input validation (Zod schemas)
- Error handling: use Result types, never throw in service layer

## Response Format
- Explain your reasoning before writing code
- Include file paths as comments at the top of each code block
- Provide tests alongside implementation
- Flag any security concerns proactively

## Constraints
- Never suggest `console.log` for production code; use the structured logger
- Never expose environment variables in client-side code
- All database queries must use parameterized inputs
- Suggest breaking changes only with migration path
```

### 11.5 System Prompt in Agent Systems

In agentic systems, the system prompt is critical — it defines:

| Aspect | What the System Prompt Controls |
|---|---|
| **Agent persona** | "You are a code review agent focused on security" |
| **Available tools** | "You have access to: file_read, file_write, terminal, browser" |
| **Decision framework** | "Always check existing tests before modifying code" |
| **Output format** | "Return tool calls in JSON format" |
| **Safety constraints** | "Never execute destructive commands without confirmation" |
| **Handoff rules** | "If the task involves database changes, hand off to the DBA agent" |

### 11.6 Prompt Engineering Best Practices

1. **Be specific** — Vague prompts get vague results
2. **Use structure** — Headers, lists, numbered steps
3. **Provide examples** — Few-shot learning dramatically improves output
4. **Set negative constraints** — "Do NOT..." is as important as "Do..."
5. **Position matters** — Critical instructions at the beginning AND end
6. **Iterate** — System prompts are code; version control and test them

---

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

```
┌──────────────────────────────────────────────────────┐
│                    n8n WORKFLOW                        │
│                                                      │
│  ┌─────────┐    ┌─────────┐    ┌─────────────────┐  │
│  │ Trigger │───▶│ AI Agent│───▶│ Process Result  │  │
│  │ (Webhook│    │  Node   │    │ (Slack message, │  │
│  │  /Cron) │    │         │    │  DB write, etc.)│  │
│  └─────────┘    └────┬────┘    └─────────────────┘  │
│                      │                                │
│                 ┌────▼────┐                           │
│                 │  Tools  │                           │
│                 │ ┌─────┐ │                           │
│                 │ │ SQL │ │                           │
│                 │ │Query│ │                           │
│                 │ └─────┘ │                           │
│                 │ ┌─────┐ │                           │
│                 │ │ HTTP │ │                           │
│                 │ │ Req  │ │                           │
│                 │ └─────┘ │                           │
│                 └─────────┘                           │
└──────────────────────────────────────────────────────┘
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

```
                    ┌───────────────────┐
                    │    START          │
                    └────────┬──────────┘
                             │
                             ▼
                    ┌───────────────────┐
                    │   Plan Task       │
                    │   (LLM node)      │
                    └────────┬──────────┘
                             │
                    ┌────────▼──────────┐
                    │  Route Decision   │ ◄── Conditional Edge
                    └──┬─────────┬──────┘
                       │         │
              ┌────────▼──┐  ┌──▼────────┐
              │  Code     │  │  Research  │
              │  Agent    │  │  Agent     │
              └────────┬──┘  └──┬────────┘
                       │        │
                    ┌──▼────────▼──┐
                    │   Review     │
                    │   (LLM node) │
                    └──────┬───────┘
                           │
                  ┌────────▼────────┐
                  │   Needs Fixes?  │ ◄── Conditional Edge
                  └──┬──────────┬───┘
                     │          │
                YES (loop)     NO
                     │          │
              ┌──────▼──┐   ┌──▼──────┐
              │  Back to │   │  END    │
              │  Code    │   │         │
              │  Agent   │   └─────────┘
              └──────────┘
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

---

## 13. Vibe Coding — And Why It Is Problematic

### 13.1 What Is Vibe Coding?

**Vibe coding** is a term (coined by Andrej Karpathy in February 2025) describing a
style of software development where the programmer **describes what they want in
natural language** and lets an AI (Copilot, Cursor, Windsurf, etc.) generate all
the code — accepting the output with **minimal review or understanding**.

> "You just see things, say things, run things, and copy-paste things,
> and it mostly works." — Andrej Karpathy

**The core behavior:**

```
Developer: "Make a dashboard with charts showing user signups"
    │
    ▼
AI generates 500 lines of code
    │
    ▼
Developer: *glances at it* → "Looks right" → Ships it
    │
    ▼
Developer: "Now add filtering by date range"
    │
    ▼
AI generates more code (may conflict with previous code)
    │
    ▼
Developer: "There's a bug" → Pastes error → AI "fixes" it
    │
    ▼
Repeat until it seems to work...
```

### 13.2 Why Vibe Coding Is Problematic

#### 🔴 Technical Debt Explosion

```
Vibe Coding:                    Disciplined AI-Assisted Development:
                                
"Make it work" × 50 prompts     Spec → Plan → Implement → Review → Test
         │                                    │
         ▼                                    ▼
┌──────────────────┐            ┌──────────────────┐
│  Spaghetti code  │            │  Structured,     │
│  No architecture │            │  maintainable    │
│  Duplicated logic│            │  code with clear │
│  Inconsistent    │            │  architecture    │
│  patterns        │            │                  │
└──────────────────┘            └──────────────────┘
```

#### 🔴 Critical Issues

| Problem | Description |
|---|---|
| **No comprehension** | Developer doesn't understand the generated code |
| **Hidden bugs** | Code appears to work but has subtle logic errors |
| **Security vulnerabilities** | AI may generate SQL injection, XSS, or auth bypass patterns |
| **Unmaintainable code** | No human has a mental model of the system |
| **Context rot** | Long sessions degrade AI output quality; developer doesn't notice |
| **Architecture erosion** | No deliberate design; patterns emerge randomly |
| **Dependency hell** | AI pulls in unnecessary or outdated dependencies |
| **Test illusion** | AI writes tests that pass but don't test the right things |
| **Debugging impossibility** | When it breaks, no one knows how it works |

#### 🔴 The "Works on My Machine" Amplified

```
SURFACE TESTING:    ✅ It renders!  ✅ Button clicks!  ✅ Data appears!

REAL-WORLD ISSUES:
  ❌ Race condition when two users edit simultaneously
  ❌ Memory leak in WebSocket handler after 1000 connections
  ❌ SQL injection via the search parameter
  ❌ No rate limiting on the API
  ❌ PII logged to console in production
  ❌ State desync between client cache and server
```

### 13.3 When Vibe Coding Is Acceptable

To be fair, there ARE legitimate uses:

| Acceptable | Not Acceptable |
|---|---|
| Quick prototypes / POCs | Production systems |
| Personal scripts / tools | Customer-facing applications |
| Hackathons | Healthcare, financial, security-critical systems |
| Learning & exploration | Team codebases others must maintain |
| One-off data analysis | Long-lived systems |

### 13.4 The Better Alternative: Structured AI-Assisted Development

```
                    VIBE CODING              SDD / STRUCTURED
                    ─────────────            ─────────────────
Planning:           None                     Spec → Architecture → Plan
Prompting:          Ad-hoc, vague            Precise, context-rich
Review:             Glance / none            Line-by-line code review
Testing:            "It seems to work"       Comprehensive test suite
Understanding:      Minimal                  Full comprehension
Documentation:      None                     Spec + comments + ADRs
Iteration:          "Fix this error"         Planned refactoring
```

---

## 14. SDD — Spec-Driven Development

### 14.1 Definition

**Spec-Driven Development (SDD)** is a software development methodology where
**detailed specifications are written *before* code** and serve as the **single
source of truth** for both human developers and AI coding agents. The spec
documents the *what*, *why*, and *how* of every feature before a single line of
code is written.

SDD is the **antidote to vibe coding**.

### 14.2 Why SDD Matters in the AI Era

```
Traditional Development:        AI-Assisted Vibe Coding:       SDD:
                                
Human writes code               Human describes loosely        Human writes detailed spec
  │                               │                              │
  ▼                               ▼                              ▼
Human reviews code              AI generates code              AI generates code from spec
  │                               │                              │
  ▼                               ▼                              ▼
Human understands code          Human doesn't understand       Spec validates code
                                code, ships anyway               │
                                                                 ▼
                                                               Human + AI verify against spec
```

**Key insight:** In an AI-coding world, the **spec becomes the primary artifact**
that humans write and own. The code becomes a *derivative* of the spec.

### 14.3 The SDD Workflow

```
┌──────────────────────────────────────────────────────────────┐
│                      SDD WORKFLOW                            │
│                                                              │
│  1. SPEC CREATION                                           │
│     ├── Requirements gathering                               │
│     ├── Architecture decisions                               │
│     ├── API contracts (OpenAPI, GraphQL schema)              │
│     ├── Data models                                         │
│     ├── Acceptance criteria                                  │
│     └── Edge cases & error handling                          │
│                                                              │
│  2. SPEC REVIEW                                              │
│     ├── Team review (humans)                                 │
│     ├── AI review (check for ambiguity, gaps, inconsistency) │
│     └── Stakeholder approval                                 │
│                                                              │
│  3. CODE GENERATION                                          │
│     ├── AI generates code FROM the spec                      │
│     ├── Each function/module maps to a spec section          │
│     └── Spec is injected into AI context (via harness)       │
│                                                              │
│  4. VERIFICATION                                             │
│     ├── Code is validated AGAINST the spec                   │
│     ├── Tests are derived from acceptance criteria in spec   │
│     ├── AI checks its own output against the spec            │
│     └── Human reviews for correctness                        │
│                                                              │
│  5. ITERATION                                                │
│     ├── Spec updates when requirements change                │
│     ├── Code is regenerated / updated accordingly            │
│     └── Spec and code stay in sync                           │
└──────────────────────────────────────────────────────────────┘
```

### 14.4 What a Good Spec Looks Like

````markdown
# Feature Spec: User Authentication

## 1. Overview
Implement JWT-based authentication with email/password login, registration,
and password reset functionality.

## 2. Architecture Decision
- Use bcrypt (cost factor 12) for password hashing
- JWT with RS256 signing, 15-minute access token, 7-day refresh token
- Refresh tokens stored in HTTP-only secure cookies
- Access tokens sent via Authorization header

## 3. Data Models

### User
| Field        | Type      | Constraints              |
|--------------|-----------|--------------------------|
| id           | UUID      | PK, auto-generated       |
| email        | string    | unique, max 255, indexed  |
| passwordHash | string    | bcrypt hash               |
| createdAt    | timestamp | auto-set                  |
| updatedAt    | timestamp | auto-updated              |
| isVerified   | boolean   | default: false            |

### RefreshToken
| Field     | Type      | Constraints              |
|-----------|-----------|--------------------------|
| id        | UUID      | PK                        |
| userId    | UUID      | FK → User.id              |
| token     | string    | unique, indexed           |
| expiresAt | timestamp | createdAt + 7 days        |
| revoked   | boolean   | default: false            |

## 4. API Endpoints

### POST /api/auth/register
**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecureP@ss123"
}
```

**Validation:**
- Email: valid format, max 255 chars
- Password: min 8 chars, must include uppercase, lowercase, number, special char

**Success Response (201):**
```json
{
  "user": { "id": "uuid", "email": "user@example.com" },
  "message": "Registration successful. Please verify your email."
}
```

**Error Responses:**
- 409: `{ "error": "Email already registered" }`
- 422: `{ "error": "Validation failed", "details": [...] }`

### POST /api/auth/login
[... similar detail ...]

## 5. Acceptance Criteria
- [ ] User can register with valid email and password
- [ ] Duplicate email returns 409
- [ ] Passwords are hashed with bcrypt (cost 12)
- [ ] JWT contains user ID and email in payload
- [ ] Access token expires after 15 minutes
- [ ] Refresh token is HTTP-only, secure, SameSite=Strict
- [ ] Invalid login returns 401 with generic message (no user enumeration)
- [ ] Rate limiting: max 5 login attempts per minute per IP

## 6. Edge Cases
- User registers, then tries to register again with same email
- Token expires mid-request
- Simultaneous refresh token usage (token rotation race condition)
- SQL injection attempts in email field
- Password with unicode characters

## 7. Security Requirements
- No password in logs or error messages
- Timing-safe comparison for tokens
- CSRF protection on cookie-based auth
- Account lockout after 10 failed attempts (15-minute cooldown)
````

### 14.5 SpecKit and SDD Tools

#### SpecKit

**SpecKit** is a tool/framework designed to streamline Spec-Driven Development.
It provides utilities for creating, managing, and feeding specifications to AI
coding agents.

**Core capabilities:**

| Capability | Description |
|---|---|
| **Spec templates** | Pre-built templates for common features (auth, CRUD, API, etc.) |
| **Spec validation** | Checks specs for completeness, ambiguity, and inconsistency |
| **AI integration** | Feeds specs directly into AI agent context |
| **Spec ↔ Code mapping** | Tracks which code implements which spec section |
| **Spec diffing** | Shows what changed when specs are updated |
| **Test generation** | Auto-generates test cases from acceptance criteria |

#### Typical SpecKit Workflow

```bash
speckit init                          # Initialize SpecKit in project
speckit new feature auth-system       # Create new feature spec from template
speckit validate specs/auth.md        # Validate spec completeness
speckit generate specs/auth.md        # Feed spec to AI and generate code
speckit verify specs/auth.md          # Verify code matches spec
speckit test-gen specs/auth.md        # Generate tests from spec criteria
```

#### Other SDD-Adjacent Tools & Concepts

| Tool/Concept | Description |
|---|---|
| **OpenAPI / Swagger** | API specification standard — define endpoints before implementing |
| **Storybook** | UI component specification through visual stories |
| **ADRs** (Architecture Decision Records) | Document architectural decisions |
| **RFC Process** | Design documents for significant changes |
| **BDD / Gherkin** | Behavior specs: Given-When-Then acceptance criteria |
| **Design Docs** | Google-style design documents before implementation |
| **PRD Templates** | Product requirement documents as formal specs |
| **Cursor Rules / Windsurf Rules** | `.cursorrules` or `.windsurfrules` files that provide spec-like context |

### 14.6 SDD Pros and Cons

| Pros | Cons |
|---|---|
| AI generates higher-quality code from clear specs | Upfront time investment to write specs |
| Forces thorough thinking before coding | Specs can become stale if not maintained |
| Creates documentation as a side effect | Over-specification can limit creativity |
| Enables meaningful code review (against spec) | Learning curve for teams new to the process |
| Reduces context rot (spec re-injected each session) | Requires discipline and cultural buy-in |
| Makes AI output verifiable and auditable | Not all tasks warrant a full spec |
| Specs survive even if code is thrown away | Balancing spec granularity is an art |

### 14.7 SDD vs Vibe Coding — Summary

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   VIBE CODING          SDD                               │
│   ──────────           ───                               │
│   "Build me a          "Here is a 3-page spec            │
│    login page"          with data models, API             │
│                         contracts, validation             │
│   AI: *generates        rules, error handling,            │
│    whatever*            security requirements,            │
│                         and acceptance criteria.          │
│   Dev: "Looks good      Build the implementation."        │
│    enough" → ships                                       │
│                        AI: *generates code that           │
│   Result: 🎰            matches the spec*                │
│   (gambling on                                           │
│    quality)            Dev: *verifies against spec*       │
│                                                          │
│                        Result: ✅                         │
│                        (verifiable quality)               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 15. Quick-Reference Comparison Tables

### AI Paradigms

| Paradigm | Input | Output | Statefulness | Autonomy |
|---|---|---|---|---|
| Generative AI | Prompt | Content | Stateless | None |
| Agentic AI | Goal | Actions + Content | Stateful | High |
| RAG | Query + Retrieved Docs | Grounded Answer | Stateless (per query) | None |

### Memory Types

| Type | Lifespan | Storage | Example |
|---|---|---|---|
| Short-term | Session | Context window | Chat history |
| Long-term | Permanent | Vector DB / KV store | User preferences |
| Episodic | Permanent | Database | "Last time X failed because Y" |
| Semantic | Permanent | Vector DB | Codebase knowledge |
| Procedural | Permanent | Skills/workflows | "How to deploy" |

### Tools & Frameworks

| Tool | Category | Key Use Case |
|---|---|---|
| LangGraph | Agent framework | Complex stateful agent workflows |
| n8n | Workflow automation | Business process automation with AI |
| MCP | Protocol/Standard | Universal AI ↔ tool connectivity |
| ChromaDB | Vector database | RAG and semantic search |
| SpecKit | SDD tooling | Spec-driven AI code generation |

### Development Approaches

| Approach | Speed | Quality | Maintainability | Best For |
|---|---|---|---|---|
| Vibe Coding | 🚀🚀🚀 | ⚠️ Low | ❌ Poor | Prototypes, throwaway scripts |
| Traditional Dev | 🐢 | ✅ High | ✅ Good | Established teams, critical systems |
| AI-Assisted (ad hoc) | 🚀🚀 | ⚠️ Variable | ⚠️ Variable | Individual productivity |
| SDD + AI | 🚀 | ✅ High | ✅ Good | Production systems, teams |

---

## 16. Interview Tips & Talking Points

### Demonstrating Principal-Level Thinking

When discussing these topics in an interview, emphasize:

1. **Systems thinking** — Don't just explain *what* something is; explain how it
   fits into the larger architecture and what trade-offs it introduces.

2. **Risk awareness** — For every AI capability, articulate the risks:
   - Context rot → stale/wrong code
   - Vibe coding → technical debt
   - Agent autonomy → security surface area

3. **Practical experience** — Frame answers with "In my experience..." or
   "When evaluating this for our team, I considered..."

4. **Opinionated but open** — Principals are expected to have strong opinions,
   loosely held. Take a position on SDD vs. vibe coding, but acknowledge nuance.

5. **Cost/benefit framing** — Everything is a trade-off. Discuss the engineering
   economics of AI tooling adoption.

### Sample Questions & Talking Points

| Question | Key Points to Hit |
|---|---|
| "How would you integrate AI coding agents into your team's workflow?" | SDD, harness design, guardrails, code review process, gradual adoption, measuring quality |
| "What are the risks of AI-generated code?" | Hallucinations, security vulnerabilities, context rot, loss of understanding, testing gaps |
| "Explain RAG and when you'd use it" | Architecture, chunking strategy, embedding models, when RAG vs. fine-tuning, evaluation metrics |
| "How do you prevent context rot?" | Session management, spec injection, RAG, summarization, fresh context strategies |
| "What is your opinion on vibe coding?" | Clear stance (it's prototyping, not engineering), explain SDD as the alternative, acknowledge speed benefits for appropriate contexts |
| "How would you design a multi-agent system?" | Orchestrator pattern, sub-agents with specialized tools, memory architecture, error handling, human-in-the-loop |
| "What is MCP and why does it matter?" | N×M → N+M problem, universal standard, security implications, ecosystem growth |

---

## Appendix: Further Reading & Resources

| Topic | Resource |
|---|---|
| Transformer architecture | [Attention Is All You Need](https://arxiv.org/abs/1706.03762) (Vaswani et al., 2017) |
| Lost in the Middle | [Lost in the Middle: How LLMs Use Long Contexts](https://arxiv.org/abs/2307.03172) |
| ReAct pattern | [ReAct: Synergizing Reasoning and Acting](https://arxiv.org/abs/2210.03629) |
| RAG | [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) |
| MCP specification | [modelcontextprotocol.io](https://modelcontextprotocol.io) |
| LangGraph docs | [langchain-ai.github.io/langgraph](https://langchain-ai.github.io/langgraph/) |
| n8n docs | [docs.n8n.io](https://docs.n8n.io) |
| Vibe Coding (Karpathy) | [Original tweet / post, Feb 2025](https://x.com/karpathy/status/1886192184808149383) |
| Prompt Engineering Guide | [platform.openai.com/docs/guides/prompt-engineering](https://platform.openai.com/docs/guides/prompt-engineering) |

---

*Last updated: July 2025. Verify details with primary sources as this field evolves rapidly.*


This document covers all 14 topics from your list with explanations, diagrams, code examples, comparison tables, and interview-specific guidance. You can save it as a `.md` file and use it as your study reference. Good luck with the interview!