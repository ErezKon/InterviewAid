# 3123. Find Edges in Shortest Paths

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-edges-in-shortest-paths](https://leetcode.com/problems/find-edges-in-shortest-paths)
**Companies:** Doordash, Weride

---

## Problem Description

Given a weighted undirected graph, mark each edge as `true` if it lies on **any** shortest path from node 0 to node n-1.

---

## Key Insight

> Run Dijkstra from node 0 (`distS[]`) and from node n-1 (`distT[]`). Edge `(u,v,w)` is on a shortest path iff `distS[u] + w + distT[v] == distS[n-1]` (or the reverse direction).

---

## Approach: Two Dijkstras — O(E log V) ✅

```
FUNCTION findEdgesInShortestPaths(n, edges):
    distS = dijkstra(0)
    distT = dijkstra(n - 1)
    shortest = distS[n - 1]
    result = []
    FOR [u, v, w] IN edges:
        IF distS[u] + w + distT[v] == shortest OR distS[v] + w + distT[u] == shortest:
            result.ADD(true)
        ELSE:
            result.ADD(false)
    RETURN result
```

---

## Key Takeaway

> **Two Dijkstras (from source and target). An edge is on a shortest path if its weight perfectly bridges the shortest distances from both ends.**
