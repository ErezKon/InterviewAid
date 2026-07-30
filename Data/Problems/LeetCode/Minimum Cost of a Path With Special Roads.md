# 2662. Minimum Cost of a Path With Special Roads

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-cost-of-a-path-with-special-roads
**Companies:** Samsung

---
## Problem Description
You are given a start point `start = [sx, sy]`, a target point `target = [tx, ty]`, and a list of special roads. Each special road is represented as `[x1, y1, x2, y2, cost]` meaning you can travel from `(x1, y1)` to `(x2, y2)` at the given `cost`. Outside of special roads, you may move in the plane using Manhattan distance (cost = |x1‑x2| + |y1‑y2|). Compute the minimum total cost to travel from `start` to `target`.

## Examples
**Example 1**
Input: start = [0,0], target = [10,10], specialRoads = [[0,0,5,5,3],[5,5,10,10,3]]
Output: 6
Explanation: Take the first special road (cost 3) then the second (cost 3). Direct Manhattan distance would be 20.

**Example 2**
Input: start = [0,0], target = [1,1], specialRoads = []
Output: 2
Explanation: No special roads, cost equals Manhattan distance.

## Approach
**Algorithm:** Dijkstra on a graph of key points
Create nodes for `start`, `target`, and every endpoint of a special road. For any two nodes, the edge weight is the Manhattan distance between them. For each special road, add a directed edge from its start endpoint to its end endpoint with the given `cost` (which may be cheaper than the Manhattan distance). Run Dijkstra from `start` to compute the shortest distance to `target`.

```text
FUNCTION minimumCost(start, target, specialRoads):
    points ← LIST containing start, target, and all road endpoints
    // Build adjacency list
    FOR each point p IN points:
        FOR each point q IN points:
            IF p ≠ q:
                ADD edge (p → q) with weight MANHATTAN(p, q)
    FOR each road [x1, y1, x2, y2, c] IN specialRoads:
        ADD directed edge ((x1,y1) → (x2,y2)) with weight c
    
    // Dijkstra
    dist ← MAP with default INFINITY
    dist[start] ← 0
    pq ← MIN_HEAP containing (0, start)
    WHILE pq NOT EMPTY:
        (d, u) ← pq.POP()
        IF d > dist[u] THEN CONTINUE
        FOR each (v, w) IN adjacency[u]:
            IF d + w < dist[v]:
                dist[v] ← d + w
                pq.PUSH((dist[v], v))
    RETURN dist[target]
```

## Walkthrough
For the first example:
1. Nodes: (0,0), (5,5), (10,10).
2. Direct edges: (0,0)→(5,5) weight 10, (5,5)→(10,10) weight 10, (0,0)→(10,10) weight 20.
3. Special edges: (0,0)→(5,5) weight 3, (5,5)→(10,10) weight 3.
4. Dijkstra picks the cheap special edges, total cost 6.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(N² log N) where N is the number of distinct points (≤ 2·|specialRoads|+2) |
| Space  | O(N²) for the adjacency matrix (can be optimized to O(N) with on‑the‑fly edge generation) |

## Follow‑Up Questions
1. How would you modify the algorithm if special roads could be used in both directions?
2. Can you improve the time complexity by only connecting each point to its nearest neighbors instead of all pairs?
3. What if the cost of moving off‑grid is not Manhattan distance but Euclidean distance?

## Key Takeaway
Model the problem as a graph of key points and run Dijkstra, using Manhattan distances for regular moves and special‑road edges for cheaper shortcuts.
