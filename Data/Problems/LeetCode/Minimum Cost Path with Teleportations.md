# 3651. Minimum Cost Path with Teleportations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-path-with-teleportations](https://leetcode.com/problems/minimum-cost-path-with-teleportations)
**Companies:** Amazon, Google, Meta, Visa

---

## Problem Description

You are given a `m x n` 2D integer array `grid` and an integer `k`. You start at the top-left cell `(0, 0)` and your goal is to reach the bottom‑right cell `(m - 1, n - 1)`.

There are two types of moves available:
- **Normal move**: You can move right or down from your current cell `(i, j)`, i.e. you can move to `(i, j + 1)` (right) or `(i + 1, j)` (down). The cost is the value of the destination cell.
- **Teleportation**: You can teleport from any cell `(i, j)`, to any cell `(x, y)` such that `grid[x][y] <= grid[i][j]`; the cost of this move is 0. You may teleport at most `k` times.

Return the **minimum** total cost to reach cell `(m - 1, n - 1)` from `(0, 0)`.

**Constraints:**
- `2 ≤ m, n ≤ 80`
- `m == grid.length`
- `n == grid[i].length`
- `0 ≤ grid[i][j] ≤ 10^4`
- `0 ≤ k ≤ 10`

## Examples

```
Example 1:
  Input: grid = [[1,3,3],[2,5,4],[4,3,5]], k = 2
  Output: 7
  Explanation: Initially we are at (0, 0) and cost is 0.
  Current Position | Move               | New Position | Total Cost
  (0, 0)           | Move Down          | (1, 0)       | 0 + 2 = 2
  (1, 0)           | Move Right         | (1, 1)       | 2 + 5 = 7
  (1, 1)           | Teleport to (2, 2) | (2, 2)       | 7 + 0 = 7
  The minimum cost to reach bottom-right cell is 7.
```

```
Example 2:
  Input: grid = [[1,2],[2,3],[3,4]], k = 1
  Output: 9
  Explanation: Initially we are at (0, 0) and cost is 0.
  Current Position | Move       | New Position | Total Cost
  (0, 0)           | Move Down  | (1, 0)       | 0 + 2 = 2
  (1, 0)           | Move Right | (1, 1)       | 2 + 3 = 5
  (1, 1)           | Move Down  | (2, 1)       | 5 + 4 = 9
  The minimum cost to reach bottom-right cell is 9.
```

## Approach

**Algorithm:** Dijkstra with Color Supernodes (range‑reduction trick)

Instead of adding an edge between every pair of same‑color nodes (which would be O(n²)), create a *supernode* for each color. Connect each original node to its color’s supernode with a directed edge of cost `0` (entering) and from the supernode back to the node with cost `teleportCost` (exiting). Any teleport from node `u` to node `v` of the same color now corresponds to `u → supercolor → v` with total cost `0 + teleportCost = teleportCost`.

Run standard Dijkstra on the expanded graph (original nodes + supernodes).

```text
FUNCTION minCostTeleport(n, edges, colors, teleportCost, source, target):
    // Build adjacency list for original edges
    graph ← ADJ_LIST(n + maxColor + 1)   // extra slots for supernodes
    FOR each (u, v, w) IN edges DO
        graph[u].APPEND((v, w))
    END FOR
    // Add supernode connections
    FOR node ← 0 TO n-1 DO
        color ← colors[node]
        super ← n + color               // unique index for this color
        graph[node].APPEND((super, 0))          // enter supernode for free
        graph[super].APPEND((node, teleportCost)) // exit with teleport cost
    END FOR
    // Dijkstra
    dist ← ARRAY(LEN(graph), INFINITY)
    dist[source] ← 0
    pq ← MIN_HEAP()
    pq.PUSH((0, source))
    WHILE pq NOT EMPTY DO
        (d, u) ← pq.POP()
        IF d > dist[u] THEN CONTINUE
        FOR (v, w) IN graph[u] DO
            nd ← d + w
            IF nd < dist[v] THEN
                dist[v] ← nd
                pq.PUSH((nd, v))
            END IF
        END FOR
    END WHILE
    RETURN dist[target] IF dist[target] ≠ INFINITY ELSE -1
```

## Walkthrough

| Step | Node processed | Edge considered | Updated distance |
|------|----------------|-----------------|------------------|
| 1 | source = 0 | 0→1 (2) | dist[1] = 2 |
| 2 | node 1 | 1→supercolor1 (0) | dist[super1] = 2 |
| 3 | supercolor1 | super1→3 (teleportCost=3) | dist[3] = 5 |
| 4 | node 3 | 3→4 (2) | dist[4] = 7 (target) |

The algorithm stops when the target is extracted with its final shortest distance.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O((V + E) log V)** – Dijkstra on `V = n + C` vertices and `E = originalEdges + 2n` edges |
| Space  | **O(V + E)** – adjacency list plus distance array |

## Follow‑Up Questions

1. How would the solution change if teleportation cost depended on the distance between nodes?
2. Can we handle dynamic updates to colors or teleport cost without rebuilding the whole graph?
3. What if teleportation is only allowed a limited number of times?

## Key Takeaway

By introducing a supernode per color, teleport edges are collapsed into O(n) connections, enabling Dijkstra to find the minimum‑cost path in linearithmic time.
