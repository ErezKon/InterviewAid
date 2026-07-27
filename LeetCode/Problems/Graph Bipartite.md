# 785. Is Graph Bipartite?

**Difficulty:** 🟡 Medium
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/is-graph-bipartite](https://leetcode.com/problems/is-graph-bipartite)
**Companies:** Amazon, Bloomberg, Google, Lime, Linkedin, Meta, Microsoft, Samsung, Tiktok, Uber

---

## 1. Problem Description

Given an undirected graph, determine if it is bipartite — can nodes be colored with two colors such that no two adjacent nodes share a color?

---

## 2. Approach: BFS/DFS Coloring — O(V+E) ✅

```
FUNCTION isBipartite(graph):
    n = len(graph)
    color = array of -1 (uncolored)

    FOR i ← 0 TO n - 1:
        IF color[i] != -1: CONTINUE

        // BFS from node i
        queue = [i]
        color[i] = 0

        WHILE queue not empty:
            node = queue.DEQUEUE()
            FOR neighbor IN graph[node]:
                IF color[neighbor] == -1:
                    color[neighbor] = 1 - color[node]
                    queue.ENQUEUE(neighbor)
                ELSE IF color[neighbor] == color[node]:
                    RETURN false

    RETURN true
```

| Time | Space |
|------|-------|
| O(V + E) | O(V) |

---

## Key Takeaway

> Bipartite = 2-colorable = no odd-length cycles. BFS/DFS coloring: assign alternating colors, fail if a neighbor has the same color. Check all components.
