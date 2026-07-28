# 2361. Minimum Costs Using the Train Line

**Difficulty:** 🔴 Hard
**LeetCode:** https://leetcode.com/problems/minimum-costs-using-the-train-line
**Companies:** Citadel

---
## Problem Description
You are given `n` stations numbered from `0` to `n-1` on a train line. For each station `i` you have a list of direct train connections to other stations `j` with an associated travel cost `cost[i][j]`. Additionally, you may choose to walk between any two stations `i` and `j` at a cost equal to the Manhattan distance `|i-j|`. Starting from station `0`, compute the minimum total cost to reach station `n-1`.

## Examples
**Example 1**
Input: `n = 5`, `train = [[0,2,5],[2,0,3],[5,3,0,1],[0,1,0,0,4],[0,0,4,0,0]]`
Output: `7`
Explanation: Take train from `0→1` (cost 2), walk `1→3` (cost |1-3|=2), then train `3→4` (cost 4). Total = 2+2+4 = 8, but a cheaper route is `0→2` (5), walk `2→4` (2) = 7.

**Example 2**
Input: `n = 3`, `train = [[0,0,0],[0,0,0],[0,0,0]]`
Output: `2`
Explanation: No train connections, so you must walk from `0→2` costing |0-2| = 2.

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
