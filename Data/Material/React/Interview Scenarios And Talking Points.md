# 1. Interview Scenarios & Talking Points

## 1.1 Principal-Level Discussion Topics

```mermaid
mindmap
  root((Principal Engineer\nReact Topics))
    Architecture Decisions
      When to use RSC vs CSR
      Micro-frontends trade-offs
      Monorepo vs polyrepo
      Build vs buy component library
    Performance at Scale
      Bundle size budgets
      Core Web Vitals strategy
      Rendering strategy per route
      CDN & caching architecture
    Team & Process
      Component API review process
      Testing strategy & coverage goals
      Design system governance
      Migration strategies
    Technical Vision
      React compiler (React Forget)
      Signals vs React model
      Edge computing & RSC
      Accessibility as architecture
```

## 1.2 Key Questions & How to Answer

### "How do you decide between CSR, SSR, SSG, and RSC?"

```mermaid
flowchart TD
    A{"Page Characteristics"} --> B{"SEO critical?"}
    B -->|No| C{"Highly interactive?"}
    B -->|Yes| D{"Data changes frequently?"}

    C -->|Yes| E["CSR\n(SPA / Dashboard)"]
    C -->|No| F["SSG\n(Marketing pages)"]

    D -->|Rarely| G["SSG + ISR\n(Blog, docs)"]
    D -->|Frequently| H["SSR or RSC\n(E-commerce, feeds)"]
    D -->|Real-time| I["SSR shell + CSR updates\n(Social media)"]

    style E fill:#3498db,color:#fff
    style F fill:#27ae60,color:#fff
    style G fill:#27ae60,color:#fff
    style H fill:#9b59b6,color:#fff
    style I fill:#e67e22,color:#fff
```

### "Walk me through a performance issue you've solved"

**Framework answer:**
1. **Identify**: How was it measured? (Core Web Vitals, Lighthouse, user reports)
2. **Diagnose**: What tools did you use? (React Profiler, Chrome DevTools, bundle analyzer)
3. **Root cause**: What specifically was wrong? (unnecessary re-renders, large bundle, slow API)
4. **Solution**: What did you implement? (code splitting, virtualization, memoization, caching)
5. **Validation**: How did you confirm improvement? (before/after metrics)
6. **Prevention**: What process did you put in place? (performance budgets, CI checks)

### "How would you migrate a large class component codebase to hooks?"

**Answer framework:**
1. **Don't rewrite** — migrate incrementally as you touch components
2. **Start with leaf components** (no children depending on their internals)
3. **Extract logic into custom hooks** first, class wrapper can remain
4. **Establish patterns** — create example migrations as reference
5. **Automated codemods** for simple patterns (e.g., `react-codemod`)
6. **Test before and after** — behavior should be identical
7. **Set timeline boundaries** — don't let migration drag indefinitely

### "How do you architect a component library / design system?"

**Key talking points:**
- **Token-driven**: All visual decisions flow from tokens (colors, spacing, typography)
- **Composable over configurable**: Prefer children/slots over mega-prop APIs
- **Headless separation**: Logic hooks (useCombobox) separate from styled components
- **Accessibility first**: ARIA patterns baked into base components
- **Versioning & governance**: Semver, changelogs, deprecation process
- **Documentation**: Storybook with interactive examples and usage guidelines
- **Testing**: Visual regression (Chromatic), unit tests, a11y audits

## 1.3 System Design Exercise: Build a Real-Time Dashboard

```mermaid
flowchart TD
    subgraph "Data Layer"
        WS["WebSocket\nReal-time data"]
        REST["REST API\nHistorical data"]
        Cache["TanStack Query\nCache Layer"]
    end

    subgraph "State Management"
        RT["Zustand Store\nReal-time metrics"]
        Filters["URL State\nFilters & date range"]
    end

    subgraph "UI Architecture"
        Shell["App Shell\n(Server Component)"]
        subgraph "Client Islands"
            Chart["Chart Widget\n(use client)"]
            Table["Data Table\n(use client)"]
            KPI["KPI Cards\n(use client)"]
            Alerts["Alert Feed\n(use client)"]
        end
    end

    subgraph "Performance"
        Virtual["Virtualized Table\n10k+ rows"]
        Workers["Web Worker\nData aggregation"]
        Memo["Selective Memoization"]
        Throttle["Throttled WS Updates\n(requestAnimationFrame)"]
    end

    WS --> RT
    REST --> Cache
    RT --> Chart & KPI & Alerts
    Cache --> Table
    Filters --> Cache

    Table --> Virtual
    RT --> Workers --> Memo
    WS --> Throttle --> RT

    style WS fill:#e74c3c,color:#fff
    style REST fill:#3498db,color:#fff
    style Shell fill:#27ae60,color:#fff
    style Workers fill:#9b59b6,color:#fff
```

**Key discussion points:**
- **WebSocket management**: Reconnection, backpressure, throttling updates
- **Rendering performance**: RAF batching, virtualization, memoization
- **Data aggregation**: Web Workers for heavy computation off main thread
- **Error resilience**: Error boundaries per widget, graceful degradation
- **Accessibility**: Live regions for alerts, keyboard navigation for tables

---
