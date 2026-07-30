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

Given a weighted undirected graph with `n` vertices and a list of edges where each edge has a weight `w`. An edge disappears at time `w`. Determine the **minimum** time at which the graph has at least `k` connected components.

**Constraints:**
- `1 <= n <= 10⁵`
- `0 <= edges.length <= 10⁵`
- `1 <= k <= n`

---

## 2. Examples

**Example 1:**
```
n = 4
edges = [[0,1,3],[1,2,2],[2,3,4]]
k = 3
Output: 2
```
*Explanation:* At time 2 the edge `(1,2)` disappears, leaving components `{0,1}`, `{2}`, `{3}` → 3 components.

**Example 2:**
```
n = 5
edges = [[0,1,5],[1,2,5],[2,3,5],[3,4,5]]
k = 2
Output: 0
```
*Explanation:* Initially there are 5 isolated vertices, already ≥ 2 components, so the answer is `0`.

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
