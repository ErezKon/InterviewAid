# 3607. Power Grid Maintenance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/power-grid-maintenance](https://leetcode.com/problems/power-grid-maintenance)
**Companies:** Amazon, Cisco, Google, Meta, Microsoft, Salesforce, Zeta

---

## Problem Description
You are given a graph representing a power grid with `n` nodes (power stations) and `m` edges (transmission lines). Each edge has an associated maintenance cost and a time window during which it can be serviced. The goal is to schedule maintenance for a subset of edges such that the grid remains connected at all times and the total cost is minimized. Return the minimum possible total maintenance cost, or `-1` if it is impossible to keep the grid connected.

## Examples
**Example 1:**
```
Input: n = 4, edges = [[1,2,3,0,5],[2,3,2,2,6],[3,4,4,1,4],[1,4,5,3,7]]
Output: 9
Explanation: Choose edges (1‑2) cost 3 (available 0‑5) and (3‑4) cost 4 (available 1‑4) and (2‑3) cost 2 (available 2‑6). The grid stays connected throughout the overlapping time window [2,4] with total cost 3+2+4 = 9.
```
**Example 2:**
```
Input: n = 3, edges = [[1,2,5,0,2],[2,3,6,3,5]]
Output: -1
Explanation: No common time interval exists where both edges are operational, so the grid cannot stay connected.
```

## Approach
**Algorithm:** Transform to a time‑sweep with Union‑Find (Kruskal‑like) across overlapping intervals.
**Key Insight:** For any candidate time `t`, the problem reduces to finding a minimum spanning tree (MST) among edges whose interval includes `t`. The optimal solution is the minimum MST cost over all times where the graph is connected.

```text
FUNCTION minMaintenanceCost(n, edges):
    // edges: [u, v, cost, start, end]
    // Collect all distinct interval endpoints
    points ← SET of all start and end values from edges
    minCost ← INF
    FOR t IN points:
        // select edges active at time t
        active ← [e FOR e IN edges IF e.start ≤ t ≤ e.end]
        IF LENGTH(active) < n-1: CONTINUE
        // Kruskal on active edges
        SORT active BY cost ASCENDING
        dsu ← NEW UnionFind(n)
        costSum ← 0
        edgesUsed ← 0
        FOR (u,v,c,_,_) IN active:
            IF dsu.FIND(u) != dsu.FIND(v):
                dsu.UNION(u, v)
                costSum ← costSum + c
                edgesUsed ← edgesUsed + 1
                IF edgesUsed == n-1: BREAK
        IF edgesUsed == n-1 AND costSum < minCost:
            minCost ← costSum
    RETURN minCost IF minCost != INF ELSE -1
```

## Walkthrough
For the first example, distinct time points are `{0,1,2,3,4,5,6,7}`. Evaluating `t = 2` yields active edges (1‑2, 2‑3, 3‑4). Kruskal selects all three with total cost `3+2+4 = 9`, which is the minimal achievable cost.

## Complexity Analysis
- **Time:** O(k · m log m) where `k` is the number of distinct time points (≤ 2m). Each iteration runs Kruskal's algorithm.
- **Space:** O(m) for storing edges and O(n) for the Union‑Find structure.

## Follow‑Up Questions
1. How can the algorithm be optimized using a segment tree or sweep line to avoid recomputing MST from scratch at each time point?
2. What changes are needed if edges have different maintenance durations and can be scheduled partially?
3. Can you extend the solution to handle multiple disconnected components that must each stay connected separately?

## Key Takeaway
By enumerating candidate times and computing an MST among edges available at that time, we find the cheapest schedule that keeps the power grid connected throughout.
