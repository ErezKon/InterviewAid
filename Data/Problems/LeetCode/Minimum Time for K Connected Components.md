# 3608. Minimum Time for K Connected Components

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-for-k-connected-components](https://leetcode.com/problems/minimum-time-for-k-connected-components)
**Companies:** Amazon, Phonepe

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort Edges + Union-Find — O(E log E)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given an integer `n` and an undirected graph with `n` nodes labeled from 0 to `n - 1`. This is represented by a 2D array `edges`, where `edges[i] = [u_i, v_i, time_i]` indicates an undirected edge between nodes `u_i` and `v_i` that can be removed at `time_i`.

You are also given an integer `k`.

Initially, the graph may be connected or disconnected. Your task is to find the **minimum** time `t` such that after removing all edges with `time <= t`, the graph contains **at least** `k` connected components.

Return the **minimum** time `t`.

A **connected component** is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.

**Constraints:**
- `1 <= n <= 10^5`
- `0 <= edges.length <= 10^5`
- `edges[i] = [u_i, v_i, time_i]`
- `0 <= u_i, v_i < n`
- `u_i != v_i`
- `1 <= time_i <= 10^9`
- `1 <= k <= n`
- There are no duplicate edges.

---

## 2. Examples

**Example 1:**
```
Input: n = 2, edges = [[0,1,3]], k = 2
Output: 3
Explanation: - Initially, there is one connected component {0, 1}.
- At time = 1 or 2, the graph remains unchanged.
- At time = 3, edge [0, 1] is removed, resulting in k = 2 connected components {0}, {1}. Thus, the answer is 3.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1,2],[1,2,4]], k = 3
Output: 4
Explanation: - Initially, there is one connected component {0, 1, 2}.
- At time = 2, edge [0, 1] is removed, resulting in two connected components {0}, {1, 2}.
- At time = 4, edge [1, 2] is removed, resulting in k = 3 connected components {0}, {1}, {2}. Thus, the answer is 4.
```

**Example 3:**
```
Input: n = 3, edges = [[0,2,5]], k = 2
Output: 0
Explanation: - Since there are already k = 2 disconnected components {1}, {0, 2}, no edge removal is needed. Thus, the answer is 0.
```

---

## 3. Key Insight

> Process edges **in reverse** (from largest weight to smallest). Start with `n` isolated components and add edges one by one. When adding an edge merges two components, the component count decreases. The moment the count drops below `k` gives the time of the last removed edge, which is the answer.

---

## 4. Approach: Sort Edges + Union-Find — O(E log E) ✅

```text
FUNCTION minTimeForKComponents(n, edges, k):
    IF n >= k AND edges IS EMPTY: RETURN 0
    SORT edges BY weight DESCENDING
    uf ← UnionFind(n)
    components ← n
    FOR (u, v, w) IN edges:
        IF uf.find(u) != uf.find(v):
            uf.union(u, v)
            components ← components - 1
        IF components < k:
            RETURN w   // this edge's disappearance time creates k components
    RETURN 0   // already have ≥ k components at time 0
```

---

## 5. Walkthrough

Consider **Example 1** (`n=4`, edges `[(0,1,3),(1,2,2),(2,3,4)]`, `k=3`).
| Step | Edge Added (weight) | Components after union | When components < k? |
|------|---------------------|------------------------|----------------------|
| Start | – | 4 | No |
| 1 | (2,3,4) | merges 2‑3 → 3 components | No |
| 2 | (0,1,3) | merges 0‑1 → 2 components | **Yes**, components dropped below 3, so answer = weight of next edge to disappear = 2 |
Thus the minimum time is `2`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E log E) — sorting + near‑linear Union‑Find |
| **Space** | O(n) for Union‑Find structure |

---

## 7. Follow-Up Questions

1. How would the solution change if edges could appear instead of disappear?
2. Can you extend the approach to handle dynamic edge insertions and deletions online?
3. What if each edge had a different activation delay rather than a simple weight‑based disappearance?

---

## 8. Key Takeaway

> **Reverse Kruskal** – by adding edges from the largest weight downwards, we can efficiently determine the exact moment the graph fragments into `k` components.
