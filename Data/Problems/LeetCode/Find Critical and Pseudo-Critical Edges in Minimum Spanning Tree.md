# 1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree](https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree)
**Companies:** Amazon, Google, Uber

---

## Problem Description

Given a weighted undirected graph, find all **critical** edges (must be in every MST) and **pseudo‑critical** edges (appear in at least one MST but not all).

---

## Examples

**Example 1:**
```
Input: n = 5, edges = [[0,1,1],[1,2,1],[0,2,1],[0,3,2],[3,4,2],[1,4,3]]
Output: [[0,1,2],[3,4,5]]
Explanation:
- Edges 0,1,2 are critical because removing any of them increases the MST weight.
- Edges 3,4,5 are pseudo‑critical; each can appear in some MST without changing the total weight.
```

**Example 2:**
```
Input: n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1],[0,2,2]]
Output: [[],[0,1,2,3,4]]
Explanation: No edge is critical; all edges can be part of some MST.
```

---

## Approach: Kruskal's with Edge Testing — O(E²·α(V)) ✅

```text
FUNCTION findCriticalAndPseudo(n, edges):
    mstWeight = kruskal(n, edges)  // baseline MST
    critical = []
    pseudo = []
    FOR i, edge IN enumerate(edges):
        // Test critical: exclude edge i
        w = kruskal(n, edges without i)
        IF w > mstWeight OR graph disconnected:
            critical.ADD(i)
            CONTINUE
        // Test pseudo‑critical: force‑include edge i first
        w = kruskal(n, edges, forceInclude=i)
        IF w == mstWeight:
            pseudo.ADD(i)
    RETURN [critical, pseudo]
```

---

## Walkthrough

Consider Example 1. The baseline MST weight using Kruskal is 7.
1. Exclude edge 0 (weight 1). The MST weight becomes 8 → edge 0 is **critical**.
2. Exclude edge 3 (weight 2). The MST weight remains 7 → edge 3 is **not critical**.
3. Force‑include edge 3 first, then run Kruskal. The resulting MST weight is still 7, so edge 3 is **pseudo‑critical**.
Repeating this for every edge yields the critical list `[0,1,2]` and pseudo‑critical list `[3,4,5]`.

---

## Complexity Analysis

- Running Kruskal once costs `O(E log E)`.
- We run Kruskal `2·E` times (exclude and force‑include) → `O(E² log E)`; with Union‑Find α(V) factor it is `O(E²·α(V))`.
- Space: `O(V + E)` for the Union‑Find structure and edge list.

---

## Follow‑Up Questions

- How would you modify the algorithm to return the actual edges instead of their indices?
- Can you design a linear‑time solution for dense graphs?
- How does the approach change for directed graphs with edge constraints?

---

## Key Takeaway

> **Two tests per edge: exclude (critical check) and force‑include (pseudo‑critical check). Each test runs Kruskal's. O(E²·α(V)) total.**