# 2685. Count the Number of Complete Components

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `n` nodes and a list of undirected edges, count the number of **complete** connected components. A component is complete if every pair of its nodes is directly connected by an edge.

**Constraints:**
- `1 <= n <= 50`
- `0 <= edges.length <= n*(n-1)/2`

---

## Key Insight

A connected component with `k` nodes is **complete** iff it has exactly `k × (k-1) / 2` edges (a complete graph). Use Union-Find to group nodes into components, then count nodes and edges per component.

---

## Approach

```
FUNCTION countCompleteComponents(n, edges):
    uf = UnionFind(n)
    FOR [u, v] IN edges: uf.union(u, v)
    groups = defaultdict(lambda: [0, 0])    // [nodes, edges]
    FOR i: groups[uf.find(i)][0] += 1
    FOR [u, v]: groups[uf.find(u)][1] += 1
    RETURN SUM(1 for nodes, edg in groups.values() if edg == nodes*(nodes-1)//2)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + E × α(n)) where E = edges, α = inverse Ackermann |
| **Space** | O(n) |

---

## Follow-Up Questions

**Q1: Can this be done with BFS/DFS instead of Union-Find?**
Yes — BFS/DFS finds connected components. For each component, count nodes and edges, then check completeness. Same time complexity.

**Q2: What if the graph is directed?**
Then "complete" would mean a tournament (edge between every pair). Check edge count = k(k-1) for directed complete graph.

---

## Key Takeaway

> **A connected component is complete iff edges = k(k-1)/2. Use Union-Find or BFS to find components, count nodes and edges in each, then check the formula.**
