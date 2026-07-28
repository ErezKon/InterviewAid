# 2685. Count the Number of Complete Components

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
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

## Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1],[1,2],[0,2]]
Output: 1
Explanation: The whole graph is a triangle, which is a complete component.
```

**Example 2:**
```
Input: n = 4, edges = [[0,1],[2,3]]
Output: 2
Explanation: Two components {0,1} and {2,3} each have a single edge, which is complete for 2‑node components.
```

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
    FOR i FROM 0 TO n-1:
        root ← uf.find(i)
        groups[root][0] ← groups[root][0] + 1
    FOR [u, v] IN edges:
        root ← uf.find(u)
        groups[root][1] ← groups[root][1] + 1
    RETURN SUM(1 for nodes, edg IN groups.values() IF edg == nodes*(nodes-1)//2)
```

---

## Walkthrough

**Input:** `n = 5, edges = [[0,1],[0,2],[1,2],[3,4]]`

1. Union‑Find merges {0,1,2} and {3,4}.
2. Component A: nodes=3, edges=3 → `3*2/2 = 3` → complete.
3. Component B: nodes=2, edges=1 → `2*1/2 = 1` → complete.
4. Result = 2 complete components.

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