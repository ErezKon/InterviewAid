# 3243. Shortest Distance After Road Addition Queries I

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Microsoft
---

## Problem Description

Cities 0..n-1 are initially connected by edges i→i+1. After each query adds a new edge, report the shortest path from 0 to n-1.

---

## Approach

```
FUNCTION shortestDistanceAfterQueries(n, queries):
    graph ← adjacency list with initial edges i→i+1
    result ← []
    FOR [u, v] IN queries:
        graph[u].ADD(v)
        // BFS from 0 to n-1
        result.ADD(BFS(graph, 0, n-1))
    RETURN result
```

| Time | Space |
|------|-------|
| O(q · (V+E)) | O(V+E) |

---

## Key Takeaway

> Incremental shortest path — after each edge addition, re-run BFS. For small n, this is efficient enough. DP approach: `dp[i] = min(dp[j] + 1)` for all edges j→i.
