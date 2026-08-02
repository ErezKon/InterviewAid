# 1. Interview Decision Framework

## Table of Contents

- [1.1 Master Data Structure Selection Flowchart](#11-master-data-structure-selection-flowchart)
- [1.2 Complexity Cheat Sheet](#12-complexity-cheat-sheet)
- [1.3 Principal-Level Interview Tips](#13-principal-level-interview-tips)
- [✅ Study Progression Recommendation](#study-progression-recommendation)

---


## 1.1 Master Data Structure Selection Flowchart

```mermaid
graph TD
    START["🎯 What operation<br/>do you need most?"] --> LOOKUP["Fast Lookup<br/>by Key?"]
    START --> ORDERED["Ordered<br/>Data?"]
    START --> HIERARCHY["Hierarchical<br/>Relationships?"]
    START --> FIFOLIFO["FIFO/LIFO<br/>Access?"]
    START --> NETWORK["Network/<br/>Relationships?"]
    START --> PREFIX["Prefix<br/>Matching?"]

    LOOKUP -->|"Yes"| HT["Dictionary / HashSet<br/>O(1) avg"]
    LOOKUP -->|"Sorted keys"| SD["SortedDictionary<br/>O(log n)"]

    ORDERED -->|"Random access"| ARR["Array / List&lt;T&gt;"]
    ORDERED -->|"Frequent insert/delete<br/>at both ends"| DEQUE["LinkedList&lt;T&gt; / Deque"]
    ORDERED -->|"Need min/max fast"| HEAP["Heap / PriorityQueue"]

    HIERARCHY -->|"Search"| BST["BST / AVL / Red-Black"]
    HIERARCHY -->|"General"| TREE["N-ary Tree"]

    FIFOLIFO -->|"LIFO"| STACK["Stack&lt;T&gt;"]
    FIFOLIFO -->|"FIFO"| QUEUE["Queue&lt;T&gt;"]

    NETWORK --> GRAPH["Graph<br/>(Adj List / Matrix)"]

    PREFIX --> TRIE["Trie"]

    style START fill:#8e44ad,stroke:#6c3483,color:#fff
    style HT fill:#27ae60,stroke:#1e8449,color:#fff
    style SD fill:#2ecc71,stroke:#27ae60,color:#fff
    style ARR fill:#3498db,stroke:#2980b9,color:#fff
    style HEAP fill:#f39c12,stroke:#e67e22,color:#fff
    style BST fill:#e67e22,stroke:#d35400,color:#fff
    style STACK fill:#e74c3c,stroke:#c0392b,color:#fff
    style QUEUE fill:#1abc9c,stroke:#16a085,color:#fff
    style GRAPH fill:#9b59b6,stroke:#8e44ad,color:#fff
    style TRIE fill:#d35400,stroke:#a04000,color:#fff
```

## 1.2 Complexity Cheat Sheet

| Data Structure | Access | Search | Insert | Delete | Space |
|---|---|---|---|---|---|
| **Array** | **O(1)** | O(n) | O(n) | O(n) | O(n) |
| **List\<T\>** | **O(1)** | O(n) | O(1)* / O(n) | O(n) | O(n) |
| **LinkedList** | O(n) | O(n) | **O(1)** | **O(1)** | O(n) |
| **Stack** | **O(1)** top | O(n) | **O(1)** | **O(1)** | O(n) |
| **Queue** | **O(1)** front | O(n) | **O(1)** | **O(1)** | O(n) |
| **HashSet/Dict** | N/A | **O(1)** | **O(1)** | **O(1)** | O(n) |
| **SortedDict** | N/A | **O(log n)** | **O(log n)** | **O(log n)** | O(n) |
| **Binary Heap** | **O(1)** min | O(n) | **O(log n)** | **O(log n)** | O(n) |
| **BST (balanced)** | N/A | **O(log n)** | **O(log n)** | **O(log n)** | O(n) |
| **Trie** | N/A | **O(m)** | **O(m)** | **O(m)** | O(n·m·σ) |
| **Graph (adj list)** | N/A | O(V+E) | **O(1)** edge | O(E) edge | O(V+E) |

## 1.3 Principal-Level Interview Tips

```mermaid
graph TD
    subgraph "🎓 What Distinguishes a Principal Answer"
        T1["1️⃣ Trade-off Analysis<br/>Never just 'use a HashMap'<br/>Discuss memory vs speed,<br/>cache locality, GC pressure"]
        T2["2️⃣ Scale Awareness<br/>What happens at 1B entries?<br/>Sharding, distributed structures,<br/>consistent hashing"]
        T3["3️⃣ Concurrency<br/>ConcurrentDictionary vs lock,<br/>lock-free structures,<br/>reader-writer patterns"]
        T4["4️⃣ .NET Specifics<br/>Span&lt;T&gt;, ArrayPool, FrozenDict,<br/>struct vs class for nodes,<br/>GC impact of allocations"]
        T5["5️⃣ Real-World Application<br/>How does Redis use skip lists?<br/>Why do databases use B+ trees?<br/>When would you use a Bloom filter?"]
    end

    style T1 fill:#e74c3c,stroke:#c0392b,color:#fff
    style T2 fill:#3498db,stroke:#2980b9,color:#fff
    style T3 fill:#27ae60,stroke:#1e8449,color:#fff
    style T4 fill:#9b59b6,stroke:#8e44ad,color:#fff
    style T5 fill:#e67e22,stroke:#d35400,color:#fff
```

### Key Phrases That Signal Principal-Level Thinking

```
✅ "The amortized cost is O(1) because..."
✅ "In practice, array-backed structures win due to cache locality..."
✅ "At this scale, we'd need to partition the data structure across nodes..."
✅ "The GC pressure from this many heap allocations would be problematic..."
✅ "We could use a probabilistic structure here since false positives are acceptable..."
✅ "The read/write ratio suggests we should optimize for..."
✅ "struct-based nodes on the stack with Span<T> would avoid GC entirely..."
```

---

## ✅ Study Progression Recommendation

```mermaid
graph LR
    W1["Week 1<br/>Arrays, Strings<br/>Hash Tables"] --> W2["Week 2<br/>Linked Lists<br/>Stacks, Queues"]
    W2 --> W3["Week 3<br/>Trees, BST<br/>Heaps"]
    W3 --> W4["Week 4<br/>Graphs<br/>BFS/DFS/Dijkstra"]
    W4 --> W5["Week 5<br/>Tries, Union-Find<br/>Advanced Structures"]
    W5 --> W6["Week 6<br/>System Design Integration<br/>Trade-off Discussions"]

    style W1 fill:#27ae60,stroke:#1e8449,color:#fff
    style W2 fill:#2ecc71,stroke:#27ae60,color:#fff
    style W3 fill:#f1c40f,stroke:#f39c12,color:#000
    style W4 fill:#e67e22,stroke:#d35400,color:#fff
    style W5 fill:#e74c3c,stroke:#c0392b,color:#fff
    style W6 fill:#8e44ad,stroke:#6c3483,color:#fff
```

---

> **This guide covers the full data structures landscape expected at the principal engineer level. Each section is designed to go beyond "textbook" answers — emphasizing trade-offs, real-world applications, .NET internals, and the kind of depth interviewers expect from someone leading technical direction.** Good luck with your interview! 🚀
