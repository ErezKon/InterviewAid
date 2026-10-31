# 2662. Minimum Cost of a Path With Special Roads

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-cost-of-a-path-with-special-roads
**Companies:** Samsung

---
## Problem Description
You are given an array `start` where `start = [startX, startY]` represents your initial position `(startX, startY)` in a 2D space. You are also given the array `target` where `target = [targetX, targetY]` represents your target position `(targetX, targetY)`.

The **cost** of going from a position `(x1, y1)` to any other position in the space `(x2, y2)` is `|x2 - x1| + |y2 - y1|`.

There are also some **special roads**. You are given a 2D array `specialRoads` where `specialRoads[i] = [x1i, y1i, x2i, y2i, costi]` indicates that the `i-th` special road goes in **one direction** from `(x1i, y1i)` to `(x2i, y2i)` with a cost equal to `costi`. You can use each special road any number of times.

Return the **minimum** cost required to go from `(startX, startY)` to `(targetX, targetY)`.

**Constraints:**
- `start.length == target.length == 2`
- `1 <= startX <= targetX <= 10⁵`
- `1 <= startY <= targetY <= 10⁵`
- `1 <= specialRoads.length <= 200`
- `specialRoads[i].length == 5`
- `startX <= x1i, x2i <= targetX`
- `startY <= y1i, y2i <= targetY`
- `1 <= costi <= 10⁵`

## Examples

```
Example 1:
  Input: start = [1,1], target = [4,5], specialRoads = [[1,2,3,3,2],[3,4,4,5,1]]
  Output: 5
  Explanation:
  1. (1,1) to (1,2) with a cost of |1 - 1| + |2 - 1| = 1.
  2. (1,2) to (3,3). Use specialRoads[0] with the cost 2.
  3. (3,3) to (3,4) with a cost of |3 - 3| + |4 - 3| = 1.
  4. (3,4) to (4,5). Use specialRoads[1] with the cost 1.
  So the total cost is 1 + 2 + 1 + 1 = 5.
```

```
Example 2:
  Input: start = [3,2], target = [5,7], specialRoads = [[5,7,3,2,1],[3,2,3,4,4],[3,3,5,5,5],[3,4,5,6,6]]
  Output: 7
  Explanation: It is optimal not to use any special edges and go directly from the starting to the ending position with a cost |5 - 3| + |7 - 2| = 7.
  Note that the specialRoads[0] is directed from (5,7) to (3,2).
```

```
Example 3:
  Input: start = [1,1], target = [10,4], specialRoads = [[4,2,1,1,3],[1,2,7,4,4],[10,3,6,1,2],[6,1,1,2,3]]
  Output: 8
  Explanation:
  1. (1,1) to (1,2) with a cost of |1 - 1| + |2 - 1| = 1.
  2. (1,2) to (7,4). Use specialRoads[1] with the cost 4.
  3. (7,4) to (10,4) with a cost of |10 - 7| + |4 - 4| = 3.
```

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
| Space  | O(N²) for the adjacency matrix (can be optimized to O(N) with on-the-fly edge generation) |

## Follow-Up Questions
1. How would you modify the algorithm if special roads could be used in both directions?
2. Can you improve the time complexity by only connecting each point to its nearest neighbors instead of all pairs?
3. What if the cost of moving off-grid is not Manhattan distance but Euclidean distance?

## Key Takeaway
Model the problem as a graph of key points and run Dijkstra, using Manhattan distances for regular moves and special-road edges for cheaper shortcuts.
