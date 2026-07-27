# 2608. Shortest Cycle in a Graph

**Difficulty:** 🔴 Hard

**Companies:** Meta, Phonepe, Zomato
---

## Problem Description

Given an undirected graph with `n` nodes and `edges`, find the length of the **shortest cycle**. Return `-1` if no cycle exists.

---

## Approach: BFS from each node — O(V · (V+E))

```
FUNCTION findShortestCycle(n, edges):
    graph = adjacency list
    minCycle = infinity
    FOR src ← 0 TO n - 1:
        dist = [-1] * n; dist[src] = 0
        BFS from src:
            FOR each neighbor of current node:
                IF dist[neighbor] >= 0 AND neighbor != parent:
                    minCycle = MIN(minCycle, dist[node] + dist[neighbor] + 1)
    RETURN minCycle IF minCycle < infinity ELSE -1
```

| Time | Space |
|------|-------|
| O(V·(V+E)) | O(V+E) |

---

## Key Takeaway

> BFS from every node detects the shortest cycle passing through that node. When BFS finds an already-visited non-parent neighbor, the cycle length is `dist[u] + dist[v] + 1`.
