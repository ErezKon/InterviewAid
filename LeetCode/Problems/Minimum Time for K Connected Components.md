# 3608. Minimum Time for K Connected Components

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-for-k-connected-components](https://leetcode.com/problems/minimum-time-for-k-connected-components)
**Companies:** Amazon, Phonepe

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort Edges + Union-Find — O(E log E)](#3-approach-sort-edges--union-find)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a weighted undirected graph, edges disappear over time (edge with weight `w` disappears at time `w`). Find the **minimum** time at which the graph has at least `k` connected components.

**Constraints:**
- `1 <= n <= 10⁵`
- `0 <= edges.length <= 10⁵`

---

## 2. Key Insight

> Process edges in **reverse** — start with no edges (n components) and add edges by decreasing weight. When we add an edge, components merge. We want the latest time where components ≥ k. Equivalently, sort edges by weight descending, use Union-Find, and find when components first drop below k.

---

## 3. Approach: Sort Edges + Union-Find — O(E log E) ✅

```
FUNCTION minTimeForKComponents(n, edges, k):
    IF n >= k AND edges empty: RETURN 0
    SORT edges BY weight DESC
    uf = UnionFind(n)
    components = n

    FOR (u, v, w) IN edges:
        IF uf.find(u) != uf.find(v):
            uf.union(u, v)
            components -= 1
        IF components < k:
            RETURN w  // this edge's removal time creates k components

    RETURN 0  // already have >= k components at time 0
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E log E) — sorting |
| **Space** | O(n) — Union-Find |

---

## 5. Key Takeaway

> **Reverse Kruskal for disconnection** — instead of building MST, process edges in reverse to find when the graph fragments into k components. The critical edge weight is the answer.
