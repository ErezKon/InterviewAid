# 3607. Power Grid Maintenance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/power-grid-maintenance](https://leetcode.com/problems/power-grid-maintenance)
**Companies:** Amazon, Cisco, Google, Meta, Microsoft, Salesforce, Zeta

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented MST-over-time-windows problem, not this one. Correct idea: union-find the stations into grids; keep a min-heap (or sorted set) of online ids per grid root. Query `[1,x]`: return `x` if online, otherwise pop offline ids from the top of its grid's heap and return the top (or `-1`). Query `[2,x]`: mark `x` offline (lazy deletion). O((c + n + q) log c).*

You are given an integer `c` representing `c` power stations, each with a unique identifier `id` from 1 to `c` (1‑based indexing).

These stations are interconnected via `n` **bidirectional** cables, represented by a 2D array `connections`, where each element `connections[i] = [u_i, v_i]` indicates a connection between station `u_i` and station `v_i`. Stations that are directly or indirectly connected form a **power grid**.

Initially, **all** stations are online (operational).

You are also given a 2D array `queries`, where each query is one of the following *two* types:

- `[1, x]`: A maintenance check is requested for station `x`. If station `x` is online, it resolves the check by itself. If station `x` is offline, the check is resolved by the operational station with the smallest `id` in the same **power grid** as `x`. If **no** **operational** station *exists* in that grid, return -1.
- `[2, x]`: Station `x` goes offline (i.e., it becomes non-operational).

Return an array of integers representing the results of each query of type `[1, x]` in the **order** they appear.

**Note:** The power grid preserves its structure; an offline (non‑operational) node remains part of its grid and taking it offline does not alter connectivity.

**Constraints:**
- `1 <= c <= 10^5`
- `0 <= n == connections.length <= min(10^5, c * (c - 1) / 2)`
- `connections[i].length == 2`
- `1 <= u_i, v_i <= c`
- `u_i != v_i`
- `1 <= queries.length <= 2 * 10^5`
- `queries[i].length == 2`
- `queries[i][0]` is either 1 or 2.
- `1 <= queries[i][1] <= c`

## Examples

**Example 1:**
```
Input: c = 5, connections = [[1,2],[2,3],[3,4],[4,5]], queries = [[1,3],[2,1],[1,1],[2,2],[1,2]]
Output: [3,2,3]
Explanation:
- Initially, all stations {1, 2, 3, 4, 5} are online and form a single power grid.
- Query [1,3]: Station 3 is online, so the maintenance check is resolved by station 3.
- Query [2,1]: Station 1 goes offline. The remaining online stations are {2, 3, 4, 5}.
- Query [1,1]: Station 1 is offline, so the check is resolved by the operational station with the smallest id among {2, 3, 4, 5}, which is station 2.
- Query [2,2]: Station 2 goes offline. The remaining online stations are {3, 4, 5}.
- Query [1,2]: Station 2 is offline, so the check is resolved by the operational station with the smallest id among {3, 4, 5}, which is station 3.
```

**Example 2:**
```
Input: c = 3, connections = [], queries = [[1,1],[2,1],[1,1]]
Output: [1,-1]
Explanation:
- There are no connections, so each station is its own isolated grid.
- Query [1,1]: Station 1 is online in its isolated grid, so the maintenance check is resolved by station 1.
- Query [2,1]: Station 1 goes offline.
- Query [1,1]: Station 1 is offline and there are no other stations in its grid, so the result is -1.
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
