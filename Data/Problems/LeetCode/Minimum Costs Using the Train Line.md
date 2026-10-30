# 2361. Minimum Costs Using the Train Line

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/minimum-costs-using-the-train-line
**Companies:** Citadel

---
## Problem Description
A train line going through a city has two routes, the regular route and the express route. Both routes go through the **same** `n + 1` stops labeled from `0` to `n`. Initially, you start on the regular route at stop `0`.

You are given two **1-indexed** integer arrays `regular` and `express`, both of length `n`. `regular[i]` describes the cost it takes to go from stop `i - 1` to stop `i` using the regular route, and `express[i]` describes the cost it takes to go from stop `i - 1` to stop `i` using the express route.

You are also given an integer `expressCost` which represents the cost to transfer from the regular route to the express route.

Note that:
- There is no cost to transfer from the express route back to the regular route.
- You pay `expressCost` **every** time you transfer from the regular route to the express route.
- There is no extra cost to stay on the express route.

Return *a **1-indexed** array* `costs` *of length* `n`*, where* `costs[i]` *is the **minimum** cost to reach stop* `i` *from stop* `0`.

Note that a stop can be counted as **reached** from either route.

**Constraints:**
- `n == regular.length == express.length`
- `1 <= n <= 10^5`
- `1 <= regular[i], express[i], expressCost <= 10^5`

## Examples

```
Example 1:
  Input: regular = [1,6,9,5], express = [5,2,3,10], expressCost = 8
  Output: [1,7,14,19]
  Explanation: The diagram shows how to reach stop 4 from stop 0 with minimum cost.
  - Take the regular route from stop 0 to stop 1, costing 1.
  - Take the express route from stop 1 to stop 2, costing 8 + 2 = 10.
  - Take the express route from stop 2 to stop 3, costing 3.
  - Take the regular route from stop 3 to stop 4, costing 5.
  The total cost is 1 + 10 + 3 + 5 = 19.
  Note that a different route could be taken to reach the other stops with minimum cost.
```

```
Example 2:
  Input: regular = [11,5,13], express = [7,10,6], expressCost = 3
  Output: [10,15,24]
  Explanation: The diagram shows how to reach stop 3 from stop 0 with minimum cost.
  - Take the express route from stop 0 to stop 1, costing 3 + 7 = 10.
  - Take the regular route from stop 1 to stop 2, costing 5.
  - Take the express route from stop 2 to stop 3, costing 3 + 6 = 9.
  The total cost is 10 + 5 + 9 = 24.
  Note that the expressCost is paid again to transfer back to the express route.
```

## Approach
**Algorithm:** Dijkstra on an implicit graph
Treat each station as a node. For every node `i` add edges:
- To every other node `j` with weight `|i-j|` (walking).
- To each directly connected station `j` with weight `train[i][j]` (train).
Run Dijkstra starting from node `0` to obtain the shortest distance to node `n-1`.

```text
FUNCTION minCostTrainLine(n, train):
    dist ← ARRAY of size n, filled with INFINITY
    dist[0] ← 0
    pq ← MIN_HEAP containing (0, 0)
    WHILE pq NOT EMPTY DO
        (d, u) ← pq.POP()
        IF d > dist[u] THEN CONTINUE
        // walking edges
        FOR v ← 0 TO n-1 DO
            IF v = u THEN CONTINUE
            w ← ABS(u - v)
            IF d + w < dist[v] THEN
                dist[v] ← d + w
                pq.PUSH((dist[v], v))
        // train edges
        FOR each (v, w) IN train[u] WHERE w > 0 DO
            IF d + w < dist[v] THEN
                dist[v] ← d + w
                pq.PUSH((dist[v], v))
    RETURN dist[n-1]
```

## Walkthrough
For the first example (`n=5`):
1. Initialise `dist[0]=0`.
2. From node 0, walking edges give distances `[0,1,2,3,4]`; train edge to 1 gives distance 2 (better than walking 1). Update `dist[1]=2`.
3. Extract node 1 (dist 2). Its train edge to 2 costs 3 → total 5, better than walking 1 (dist 3). Update `dist[2]=5`.
4. Continue extracting the smallest distance node, relaxing both walking and train edges until node 4 is settled with distance 7.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n² log n) – each node relaxes up to n walking edges and its train edges |
| Space  | O(n) for distance array and priority queue |

## Follow‑Up Questions
1. How would the solution change if walking was only allowed between adjacent stations?
2. Can you improve the time complexity by pre‑computing walking distances with a monotonic queue?
3. What modifications are needed if train connections are bidirectional with different costs each way?

## Key Takeaway
Model walking and train moves as edges in a weighted graph and apply Dijkstra to obtain the cheapest route from the start to the destination.
