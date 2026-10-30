# 1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree](https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree)
**Companies:** Amazon, Google, Uber

---

## Problem Description

Given a weighted undirected connected graph with `n` vertices numbered from `0` to `n - 1`, and an array `edges` where `edges[i] = [a_i, b_i, weight_i]` represents a bidirectional and weighted edge between nodes `a_i` and `b_i`. A minimum spanning tree (MST) is a subset of the graph's edges that connects all vertices without cycles and with the minimum possible total edge weight.

Find *all the critical and pseudo-critical edges in the given graph's minimum spanning tree (MST)*. An MST edge whose deletion from the graph would cause the MST weight to increase is called a *critical edge*. On the other hand, a pseudo-critical edge is that which can appear in some MSTs but not all.

Note that you can return the indices of the edges in any order.

**Constraints:**

- `2 <= n <= 100`
- `1 <= edges.length <= min(200, n * (n - 1) / 2)`
- `edges[i].length == 3`
- `0 <= a_i < b_i < n`
- `1 <= weight_i <= 1000`
- All pairs `(a_i, b_i)` are **distinct**.

---

## Examples

```
Example 1:
  Input: n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]
  Output: [[0,1],[2,3,4,5]]
  Explanation: The figure (in the official statement) describes the graph and all possible MSTs.
  Notice that the two edges 0 and 1 appear in all MSTs, therefore they are critical edges, so we return them in the first list of the output.
  The edges 2, 3, 4, and 5 are only part of some MSTs, therefore they are considered pseudo-critical edges. We add them to the second list of the output.
```

```
Example 2:
  Input: n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]
  Output: [[],[0,1,2,3]]
  Explanation: We can observe that since all 4 edges have equal weight, choosing any 3 edges from the given 4 will yield an MST. Therefore all 4 edges are pseudo-critical.
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