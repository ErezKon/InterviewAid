## 1. System Prompt

### Table of Contents

- [1.1 Definition](#11-definition)
- [1.2 How It Fits in the Message Structure](#12-how-it-fits-in-the-message-structure)
- [1.3 Anatomy of an Effective System Prompt](#13-anatomy-of-an-effective-system-prompt)
- [1.4 Real-World Example](#14-real-world-example)
- [1.5 System Prompt in Agent Systems](#15-system-prompt-in-agent-systems)
- [1.6 Prompt Engineering Best Practices](#16-prompt-engineering-best-practices)

### 1.1 Definition

A **system prompt** (also called a **system message** or **system instruction**) is
a special instruction block sent to the LLM *before* the user's message that defines
the model's **identity, behavior, constraints, tone, and capabilities** for the
entire conversation.

### 1.2 How It Fits in the Message Structure

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

### 1.3 Anatomy of an Effective System Prompt

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

### 1.4 Real-World Example

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

### 1.5 System Prompt in Agent Systems

In agentic systems, the system prompt is critical — it defines:

| Aspect | What the System Prompt Controls |
|---|---|
| **Agent persona** | "You are a code review agent focused on security" |
| **Available tools** | "You have access to: file_read, file_write, terminal, browser" |
| **Decision framework** | "Always check existing tests before modifying code" |
| **Output format** | "Return tool calls in JSON format" |
| **Safety constraints** | "Never execute destructive commands without confirmation" |
| **Handoff rules** | "If the task involves database changes, hand off to the DBA agent" |

### 1.6 Prompt Engineering Best Practices

1. **Be specific** — Vague prompts get vague results
2. **Use structure** — Headers, lists, numbered steps
3. **Provide examples** — Few-shot learning dramatically improves output
4. **Set negative constraints** — "Do NOT..." is as important as "Do..."
5. **Position matters** — Critical instructions at the beginning AND end
6. **Iterate** — System prompts are code; version control and test them
