
---

## 1. How much autonomy does the agent get?

### The Autonomy Spectrum

```
Level 0          Level 1           Level 2           Level 3           Level 4
SUGGEST          DRAFT             APPLY WITH        AUTONOMOUS        FULLY
ONLY             & WAIT            APPROVAL          WITH GUARDRAILS   AUTONOMOUS
                                                     
AI suggests      AI writes code,   AI writes code,   AI writes, tests, AI does
completions      human applies     applies to files  and commits —     everything
inline           manually          after human       human reviews     including
                                   clicks "Accept"   after the fact    deploy
                                                     
(Copilot)        (Cursor Compose)  (Windsurf)        (Devin)           (Not yet safe)
```

### The Answer: Tiered Autonomy Based on Risk

You don't pick one level — you **assign autonomy per operation type**:

```
┌─────────────────────────────────┬───────────┬─────────────────────────┐
│ Operation                       │ Risk      │ Autonomy Level          │
├─────────────────────────────────┼───────────┼─────────────────────────┤
│ Read files / analyze code       │ None      │ Full autonomy           │
│ Write new files                 │ Low       │ Auto-apply, log it      │
│ Modify existing files           │ Medium    │ Diff review required    │
│ Run tests                       │ Low       │ Full autonomy           │
│ Install dependencies            │ Medium    │ Approval required       │
│ Run arbitrary shell commands    │ High      │ Allowlist only          │
│ Modify CI/CD config             │ High      │ Human approval + review │
│ Database migrations             │ Critical  │ Human-only with AI draft│
│ Delete files / resources        │ Critical  │ Explicit confirmation   │
│ Deploy to production            │ Critical  │ Never autonomous        │
└─────────────────────────────────┴───────────┴─────────────────────────┘
```

### Implementation Pattern: Permission Tiers

```python
class AgentPermissions:
    TIERS = {
        "unrestricted": [
            "file_read", "search_codebase", "run_tests",
            "lint", "type_check"
        ],
        "auto_with_logging": [
            "file_create", "file_write_new",
        ],
        "requires_diff_review": [
            "file_modify", "file_rename",
        ],
        "requires_explicit_approval": [
            "install_dependency", "modify_config",
            "shell_command", "file_delete",
        ],
        "forbidden": [
            "deploy", "drop_database", "modify_secrets",
            "push_to_main", "modify_ci_pipeline",
        ]
    }

    def check_permission(self, action: str) -> PermissionResult:
        if action in self.TIERS["forbidden"]:
            return PermissionResult.DENIED
        if action in self.TIERS["requires_explicit_approval"]:
            return PermissionResult.NEEDS_HUMAN_APPROVAL
        if action in self.TIERS["requires_diff_review"]:
            return PermissionResult.NEEDS_DIFF_REVIEW
        if action in self.TIERS["auto_with_logging"]:
            self.audit_log.record(action)
            return PermissionResult.ALLOWED
        return PermissionResult.ALLOWED
```

### Key Principle for the Interview

> "Autonomy should be proportional to reversibility. If an action is easily
> undone (read a file, run a test), automate it. If it's hard to undo
> (delete data, deploy to prod), require human approval. The harness
> enforces this — the agent doesn't get to decide its own permissions."

---

## 2. How do you prevent hallucinated code from reaching production?

### Multi-Layer Defense Strategy

```
AI generates code
       │
       ▼
┌──────────────────┐
│  LAYER 1:        │   Immediate automated checks
│  Static Analysis │   before the code is even shown to the developer
│  - TypeScript    │
│    compiler      │
│  - ESLint        │
│  - Type checking │
└──────┬───────────┘
       │ Pass?
       ▼
┌──────────────────┐
│  LAYER 2:        │   Does the code reference things that actually exist?
│  Hallucination   │
│  Detection       │
│  - Import check  │
│  - Function      │
│    existence     │
│  - API endpoint  │
│    verification  │
└──────┬───────────┘
       │ Pass?
       ▼
┌──────────────────┐
│  LAYER 3:        │   Does the code actually work?
│  Test Execution  │
│  - Existing tests│
│  - AI-generated  │
│    tests         │
│  - Integration   │
│    tests         │
└──────┬───────────┘
       │ Pass?
       ▼
┌──────────────────┐
│  LAYER 4:        │   Does a human (or second AI) agree it's correct?
│  Review Gate     │
│  - Human review  │
│  - Second LLM    │
│    review        │
│  - Spec          │
│    compliance    │
│    check         │
└──────┬───────────┘
       │ Pass?
       ▼
┌──────────────────┐
│  LAYER 5:        │   Standard CI/CD pipeline
│  CI Pipeline     │
│  - Full test     │
│    suite         │
│  - Security scan │
│  - Build check   │
│  - Staging       │
│    deploy + E2E  │
└──────┬───────────┘
       │ Pass?
       ▼
    Production
```

### Concrete Hallucination Detection

```python
class HallucinationDetector:
    """Catches common AI hallucination patterns before code is applied."""

    def check(self, generated_code: str, project_context: dict) -> list[Issue]:
        issues = []

        # 1. Phantom imports — AI invents packages that don't exist
        for import_stmt in extract_imports(generated_code):
            if import_stmt not in project_context["installed_packages"]:
                if not exists_on_npm(import_stmt):
                    issues.append(Issue(
                        severity="ERROR",
                        message=f"Hallucinated package: '{import_stmt}' "
                                f"does not exist in npm registry"
                    ))

        # 2. Phantom functions — AI calls functions that don't exist
        for function_call in extract_function_calls(generated_code):
            if not exists_in_codebase(function_call, project_context):
                issues.append(Issue(
                    severity="ERROR",
                    message=f"Hallucinated function: '{function_call}' "
                            f"not found in codebase"
                ))

        # 3. Phantom API endpoints — AI invents routes
        for api_call in extract_api_calls(generated_code):
            if api_call not in project_context["openapi_spec"]["paths"]:
                issues.append(Issue(
                    severity="WARNING",
                    message=f"API endpoint '{api_call}' not in OpenAPI spec"
                ))

        # 4. Outdated patterns — AI uses deprecated APIs
        for pattern in DEPRECATED_PATTERNS:
            if pattern.matches(generated_code):
                issues.append(Issue(
                    severity="WARNING",
                    message=f"Deprecated pattern: {pattern.description}"
                ))

        return issues
```

### Key Principle for the Interview

> "You treat AI-generated code exactly like code from an untrusted
> junior developer — it must pass the same gates as any other code:
> type checking, linting, tests, and human review. The harness
> automates the first three layers so humans only spend time on
> what requires judgment."

---

## 3. How do you manage context efficiently to avoid context rot?

### Strategy: Context Budget Architecture

```
Total Context Window: 128K tokens
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  PINNED (always present, re-injected every turn)         │
│  ┌────────────────────────────────────────────────────┐  │
│  │ System Prompt + Team Rules       (~2K tokens)      │  │
│  │ Current Spec / Task Definition   (~3K tokens)      │  │
│  │ Project Architecture Overview    (~1K tokens)      │  │
│  └────────────────────────────────────────────────────┘  │
│                                              ~6K fixed   │
│                                                          │
│  DYNAMIC (retrieved per-turn via RAG)                    │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Relevant source files            (~10K tokens)     │  │
│  │ Relevant docs / specs            (~5K tokens)      │  │
│  │ Similar past solutions           (~3K tokens)      │  │
│  └────────────────────────────────────────────────────┘  │
│                                              ~18K dynamic│
│                                                          │
│  CONVERSATION (sliding window with summarization)        │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Summary of earlier turns         (~2K tokens)      │  │
│  │ Last 5-10 turns verbatim         (~15K tokens)     │  │
│  └────────────────────────────────────────────────────┘  │
│                                              ~17K conv   │
│                                                          │
│  RESERVED FOR OUTPUT                                     │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Model's response                 (~8K tokens)      │  │
│  └────────────────────────────────────────────────────┘  │
│                                              ~8K output  │
│                                                          │
│  SAFETY BUFFER                               ~79K free   │
│  (room for larger files, longer conversations)           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Concrete Strategies

```python
class ContextManager:
    MAX_TOKENS = 128_000
    RESERVED_OUTPUT = 8_000
    PINNED_BUDGET = 6_000
    DYNAMIC_BUDGET = 20_000
    CONVERSATION_BUDGET = 20_000

    def build_context(self, user_message: str, session: Session) -> list[Message]:
        budget_remaining = self.MAX_TOKENS - self.RESERVED_OUTPUT

        # 1. PINNED — Always present (fight instruction drift)
        pinned = [
            self.system_prompt,                    # Rules, persona
            self.current_spec,                     # What we're building
            self.architecture_summary,             # Project structure
        ]
        budget_remaining -= count_tokens(pinned)

        # 2. DYNAMIC — RAG retrieval based on current message
        relevant_files = self.rag.retrieve(
            query=user_message,
            top_k=10,
            max_tokens=self.DYNAMIC_BUDGET
        )
        budget_remaining -= count_tokens(relevant_files)

        # 3. CONVERSATION — Summarize old turns, keep recent verbatim
        if session.turn_count > 10:
            # Summarize everything except the last 5 turns
            old_turns = session.messages[:-5]
            summary = self.llm.summarize(old_turns)
            recent_turns = session.messages[-5:]
            conversation = [summary] + recent_turns
        else:
            conversation = session.messages

        # 4. TRIM if over budget
        while count_tokens(conversation) > budget_remaining:
            conversation = self.compress(conversation)

        # 5. REASSERT critical instructions at the end
        #    (fights "lost in the middle" effect)
        reminder = {
            "role": "system",
            "content": "REMINDER: Follow the spec exactly. "
                       "Use TypeScript strict mode. "
                       "No `any` types."
        }

        return [*pinned, *relevant_files, *conversation,
                user_message, reminder]
```

### Session Rotation Policy

```
┌────────────────────────────────────────────────────────┐
│              SESSION ROTATION RULES                     │
│                                                        │
│  Start a NEW session when:                             │
│  ✦ Switching to a different feature / task             │
│  ✦ Context window exceeds 60% capacity                │
│  ✦ Agent starts contradicting earlier decisions        │
│  ✦ Agent hallucinates a function that existed earlier  │
│  ✦ More than ~30 turns in a single session             │
│                                                        │
│  Carry forward to new session:                         │
│  ✦ Spec file (always re-injected)                     │
│  ✦ Summary of decisions made                          │
│  ✦ List of files modified                             │
│  ✦ Known issues / TODOs                               │
│                                                        │
│  Do NOT carry forward:                                 │
│  ✦ Raw conversation history                           │
│  ✦ Failed attempts / debug cycles                     │
│  ✦ Exploratory tangents                               │
└────────────────────────────────────────────────────────┘
```

### Key Principle for the Interview

> "Context is a precious, finite resource — manage it like memory in an
> embedded system. Pin what's critical, retrieve what's relevant, summarize
> what's old, and rotate sessions before the quality cliff. The spec is
> your anchor — it survives across sessions and prevents drift."

---

## 4. How do you ensure the agent follows team coding standards?

### Multi-Layered Standards Enforcement

```
┌─────────────────────────────────────────────────────────────┐
│           STANDARDS ENFORCEMENT PIPELINE                     │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  LAYER 1: TELL (System Prompt + Rules Files)          │  │
│  │                                                       │  │
│  │  • System prompt includes coding standards            │  │
│  │  • .cursorrules / .windsurfrules / AGENTS.md          │  │
│  │  • Few-shot examples of correct patterns              │  │
│  │  • Project-specific conventions doc                   │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  LAYER 2: SHOW (RAG + Codebase Examples)              │  │
│  │                                                       │  │
│  │  • Retrieve similar existing code as reference        │  │
│  │  • "Here's how we did this in UserService.ts"         │  │
│  │  • Feed architectural patterns from actual codebase   │  │
│  │  • Include relevant test examples                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  LAYER 3: CHECK (Automated Enforcement)               │  │
│  │                                                       │  │
│  │  • ESLint / Prettier with team config                 │  │
│  │  • TypeScript strict mode (no implicit any)           │  │
│  │  • Custom lint rules for project patterns             │  │
│  │  • Architecture linting (dependency-cruiser)          │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  LAYER 4: FIX (Auto-Correction Loop)                  │  │
│  │                                                       │  │
│  │  If lint/type check fails:                            │  │
│  │    → Feed errors back to agent                        │  │
│  │    → Agent fixes and resubmits                        │  │
│  │    → Re-check (max 3 iterations)                      │  │
│  │    → If still failing → flag for human review         │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  LAYER 5: REVIEW (Human + AI Review)                  │  │
│  │                                                       │  │
│  │  • Second LLM reviews against standards checklist     │  │
│  │  • Human reviews for architectural fit                │  │
│  │  • PR template includes standards compliance section  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### The Rules File (Practical Example)

```markdown
# .cursorrules / .windsurfrules / AGENTS.md

## Architecture
- Follow hexagonal architecture: routes → controllers → services → repositories
- Never import from a sibling module's internal files; use the barrel export
- All business logic lives in /src/services/ — controllers are thin

## TypeScript
- strict mode always; no `any`, no `@ts-ignore`
- Use `unknown` + type guards for external data
- Prefer `interface` for object shapes, `type` for unions/intersections
- All functions must have explicit return types

## Naming
- Files: kebab-case (user-service.ts)
- Classes/Interfaces: PascalCase (UserService, CreateUserInput)
- Functions/variables: camelCase (getUserById)
- Constants: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
- Boolean variables: prefix with is/has/should (isActive, hasPermission)

## Error Handling
- Services return Result<T, E>, never throw
- Controllers catch and map to HTTP responses
- Use AppError class hierarchy, not raw Error

## Testing
- Test file next to source: user-service.ts → user-service.test.ts
- Use describe/it blocks with clear descriptions
- AAA pattern: Arrange, Act, Assert
- Mock external dependencies with MSW for HTTP, vi.mock for modules

## Forbidden Patterns
- No console.log (use logger.info/warn/error)
- No default exports (use named exports only)
- No magic numbers (extract to named constants)
- No nested ternaries
- No mutation of function parameters
```

### Key Principle for the Interview

> "You can't rely on *telling* the AI your standards — you have to *show*
> it (via RAG'd code examples), *check* it (via automated tooling), and
> *enforce* it (via a feedback loop). The rules file is necessary but not
> sufficient. The linter is your last line of defense, not your first."

---

## 5. How do you integrate with existing CI/CD pipelines?

### Architecture: AI Harness as a Pre-CI Layer

```
┌─────────────────────────────────────────────────────────────────┐
│                     DEVELOPMENT FLOW                             │
│                                                                 │
│  Developer + AI Agent                                           │
│       │                                                         │
│       ▼                                                         │
│  ┌──────────────────────┐                                       │
│  │   AI HARNESS         │                                       │
│  │   (Pre-CI Checks)    │                                       │
│  │                      │                                       │
│  │   ✦ Type check       │                                       │
│  │   ✦ Lint             │                                       │
│  │   ✦ Unit tests       │                                       │
│  │   ✦ Hallucination    │                                       │
│  │     detection        │                                       │
│  │   ✦ Spec compliance  │                                       │
│  └──────────┬───────────┘                                       │
│             │ All pass                                          │
│             ▼                                                   │
│  ┌──────────────────────┐                                       │
│  │   GIT COMMIT + PR    │  Agent creates branch + PR            │
│  │                      │  with structured description:         │
│  │   Branch: ai/feat-   │  - What spec section it implements   │
│  │   auth-jwt           │  - What files changed and why        │
│  │                      │  - What tests were added             │
│  └──────────┬───────────┘                                       │
│             │                                                   │
│             ▼                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              EXISTING CI/CD PIPELINE                      │   │
│  │              (unchanged — AI code is just code)           │   │
│  │                                                          │   │
│  │  Stage 1: Build                                          │   │
│  │    ✦ npm ci / install dependencies                       │   │
│  │    ✦ TypeScript compilation                              │   │
│  │    ✦ Build artifacts                                     │   │
│  │                                                          │   │
│  │  Stage 2: Quality                                        │   │
│  │    ✦ ESLint                                              │   │
│  │    ✦ Prettier check                                      │   │
│  │    ✦ Unit tests + coverage threshold                     │   │
│  │    ✦ Integration tests                                   │   │
│  │                                                          │   │
│  │  Stage 3: Security                                       │   │
│  │    ✦ npm audit                                           │   │
│  │    ✦ SAST (Semgrep / SonarQube)                          │   │
│  │    ✦ Secret scanning                                     │   │
│  │    ✦ License compliance                                  │   │
│  │                                                          │   │
│  │  Stage 4: Review Gate                                    │   │
│  │    ✦ Required human approvals (1-2 reviewers)            │   │
│  │    ✦ AI-generated PR summary for faster review           │   │
│  │    ✦ AI-generated diff annotations                       │   │
│  │                                                          │   │
│  │  Stage 5: Deploy                                         │   │
│  │    ✦ Staging deploy + E2E tests (Playwright)             │   │
│  │    ✦ Manual QA approval (for major features)             │   │
│  │    ✦ Production deploy (canary → full rollout)           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### CI Enhancements for AI-Generated Code

Things you **add** to your existing pipeline (not replace):

```yaml
# .github/workflows/ci.yml — additional steps for AI-generated code

jobs:
  ai-code-checks:
    runs-on: ubuntu-latest
    steps:
      # Standard steps (unchanged)
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test -- --coverage

      # NEW: AI-specific checks
      - name: Detect hallucinated imports
        run: |
          # Check that all imported packages exist in package.json
          node scripts/check-imports.js

      - name: Architecture boundary check
        run: |
          # Ensure no forbidden cross-module imports
          npx dependency-cruiser --config .dependency-cruiser.cjs src/

      - name: Spec compliance check
        run: |
          # Verify that acceptance criteria from spec have matching tests
          node scripts/spec-compliance.js specs/ src/__tests__/

      - name: AI provenance label
        if: contains(github.head_ref, 'ai/')
        run: |
          # Add label so reviewers know this is AI-generated
          gh pr edit ${{ github.event.pull_request.number }} \
            --add-label "ai-generated"

      - name: AI-assisted review comment
        if: contains(github.head_ref, 'ai/')
        run: |
          # Use a second LLM to review the diff and post comments
          node scripts/ai-review.js ${{ github.event.pull_request.number }}
```

### Branching Convention

```
main
 ├── feature/auth-system          ← human-driven feature branch
 ├── ai/auth-jwt-implementation   ← AI-generated (clearly labeled)
 ├── ai/fix-user-validation       ← AI-generated fix
 └── hotfix/payment-bug           ← human-driven hotfix
```

The `ai/` prefix:
- Triggers additional CI checks
- Adds an "ai-generated" label to the PR
- Routes to reviewers who are trained in reviewing AI code
- Enables tracking metrics (AI code quality over time)

### Metrics to Track

```
┌────────────────────────────────────────────────────────┐
│          AI CODE QUALITY METRICS                       │
│                                                        │
│  ✦ AI PR pass rate (% that pass CI on first push)     │
│  ✦ AI PR review turnaround (faster or slower?)        │
│  ✦ AI PR defect rate (bugs found post-merge)          │
│  ✦ AI PR revert rate (how often AI code gets reverted)│
│  ✦ Test coverage delta (does AI code meet thresholds?)│
│  ✦ Security findings per AI PR vs human PR            │
│  ✦ Time-to-merge: AI-assisted vs pure human           │
│  ✦ Lines of spec vs lines of code (spec leverage)     │
└────────────────────────────────────────────────────────┘
```

### Key Principle for the Interview

> "The CI/CD pipeline doesn't change — AI-generated code is just code,
> and it must pass the same quality gates as everything else. What you
> *add* is a pre-CI harness layer that catches AI-specific issues
> (hallucinated imports, spec drift, architectural violations) *before*
> they even hit the pipeline. And you *label* AI-generated PRs so you
> can measure quality over time and adjust your harness accordingly."

---

## Summary: The Five Answers at a Glance

| Question | One-Line Answer |
|---|---|
| **How much autonomy?** | Tiered by risk — full autonomy for reads/tests, human approval for destructive ops |
| **Prevent hallucinated code?** | Multi-layer defense: static analysis → hallucination detection → tests → review → CI |
| **Manage context?** | Budget architecture: pin critical context, RAG for relevance, summarize old turns, rotate sessions |
| **Enforce coding standards?** | Tell (rules file) → Show (RAG examples) → Check (linter) → Fix (feedback loop) → Review (human) |
| **CI/CD integration?** | AI code is just code — same pipeline, plus a pre-CI harness layer and AI-specific labels/metrics |