## 1. Skills & Workflows (Windsurf / Devin)

### Table of Contents

- [1.1 Skills](#11-skills)
- [1.2 Workflows](#12-workflows)
- [1.3 Skills vs Workflows](#13-skills-vs-workflows)

### 1.1 Skills

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

### 1.2 Workflows

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

### 1.3 Skills vs Workflows

| Aspect | Skill | Workflow |
|---|---|---|
| Scope | Single capability | Multi-step process |
| Granularity | Atomic | Composite |
| Reusability | Highly reusable across workflows | Task-specific |
| Analogy | A function | A program |
| Example | "Write a unit test" | "Implement feature end-to-end" |
