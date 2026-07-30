# 3651. Minimum Cost Path with Teleportations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-path-with-teleportations](https://leetcode.com/problems/minimum-cost-path-with-teleportations)
**Companies:** Amazon, Google, Meta, Visa

---

## Problem Description

You are given a directed weighted graph with `n` nodes labeled `0 … n-1`. Each edge `(u, v, w)` has a non‑negative weight `w`. Additionally, every node has a color (an integer). You may teleport from any node to any other node of the same color at a fixed cost `teleportCost`. Find the minimum total cost to travel from a given `source` node to a `target` node.

Constraints:
- `1 ≤ n ≤ 10^5`
- `0 ≤ w, teleportCost ≤ 10^9`
- The graph may contain multiple edges and self‑loops.
- Colors are in the range `0 … C-1` where `C` ≤ `n`.

## Examples

**Example 1**
```
Input: n = 5, edges = [[0,1,2],[1,2,2],[2,3,2],[3,4,2]], colors = [0,1,0,1,0], teleportCost = 3,
       source = 0, target = 4
Output: 7
Explanation: Path 0→1 (2) → teleport from 1 (color 1) to 3 (cost 3) → 3→4 (2) = 7.
```

**Example 2**
```
Input: n = 3, edges = [[0,1,5],[1,2,5]], colors = [0,0,0], teleportCost = 1,
       source = 0, target = 2
Output: 2
Explanation: Teleport directly from 0 to 2 using color 0 costs 1, plus no other edges needed (0→2 via supernode costs 1+0 = 1, plus initial move 0 cost) total 2.
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
