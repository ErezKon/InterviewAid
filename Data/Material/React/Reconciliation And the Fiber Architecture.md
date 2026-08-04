# 1. Reconciliation & Fiber Architecture

## 1.1 The Reconciliation Algorithm

React uses **heuristic O(n) diffing** instead of the theoretical O(n³) tree diff:

**Two key assumptions:**
1. Elements of **different types** produce different trees → tear down old, build new
2. Developer provides **`key`** props to hint which children are stable across renders

```mermaid
flowchart TD
    A["Render Triggered"] --> B{"Same element type?"}
    B -->|Yes| C["Keep DOM node\nUpdate changed attributes\nRecurse on children"]
    B -->|No| D["Unmount old tree\nMount new tree"]
    C --> E{"Children have keys?"}
    E -->|Yes| F["Match by key\nReorder / insert / delete"]
    E -->|No| G["Compare by index\n(can cause bugs)"]

    style A fill:#3498db,color:#fff
    style B fill:#e67e22,color:#fff
    style D fill:#e74c3c,color:#fff
    style C fill:#27ae60,color:#fff
    style F fill:#27ae60,color:#fff
    style G fill:#e74c3c,color:#fff
```

## 1.2 Fiber Architecture (React 16+)

Fiber is React's **reimplemented reconciler** that enables:
- **Incremental rendering** — split work into chunks
- **Prioritization** — some updates are more urgent
- **Concurrency** — pause, abort, or reuse work

```mermaid
flowchart TD
    subgraph "Fiber Node Structure"
        A["Fiber Node"] --> B["type: Function/Class/Host"]
        A --> C["stateNode: DOM element or instance"]
        A --> D["memoizedState: hooks linked list"]
        A --> E["memoizedProps"]
        A --> F["effectTag: Placement | Update | Deletion"]
        A --> G["Pointers:"]
        G --> G1["child → first child fiber"]
        G --> G2["sibling → next sibling fiber"]
        G --> G3["return → parent fiber"]
    end

    style A fill:#8e44ad,color:#fff
```

### Fiber Tree Traversal

```mermaid
flowchart TD
    App["App (Fiber)"]
    App -->|child| Header["Header"]
    Header -->|sibling| Main["Main"]
    Main -->|sibling| Footer["Footer"]
    Main -->|child| Sidebar["Sidebar"]
    Sidebar -->|sibling| Content["Content"]
    Header -->|return| App
    Main -->|return| App
    Footer -->|return| App
    Sidebar -->|return| Main
    Content -->|return| Main

    style App fill:#e74c3c,color:#fff
    style Header fill:#3498db,color:#fff
    style Main fill:#3498db,color:#fff
    style Footer fill:#3498db,color:#fff
    style Sidebar fill:#27ae60,color:#fff
    style Content fill:#27ae60,color:#fff
```

React traverses this as a **linked list** (not recursion), enabling pausing mid-tree.

## 1.3 Two-Phase Rendering

```mermaid
flowchart LR
    subgraph "Phase 1: Render (Interruptible)"
        A["Build Work-in-Progress tree"]
        B["Call render / function body"]
        C["Compute diffs"]
        D["Collect effects"]
        A --> B --> C --> D
    end

    subgraph "Phase 2: Commit (Synchronous)"
        E["Apply DOM mutations"]
        F["Run layoutEffects"]
        G["Schedule passive effects"]
        E --> F --> G
    end

    D -->|"Complete"| E

    style A fill:#3498db,color:#fff
    style B fill:#3498db,color:#fff
    style C fill:#3498db,color:#fff
    style D fill:#3498db,color:#fff
    style E fill:#e74c3c,color:#fff
    style F fill:#e74c3c,color:#fff
    style G fill:#e74c3c,color:#fff
```

> **Principal-level insight:** The render phase must be **pure** (no side effects). It can be called multiple times, skipped, or restarted. Side effects belong in the commit phase (effects, refs).

---
