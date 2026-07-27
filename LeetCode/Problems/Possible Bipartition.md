# 886. Possible Bipartition

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/possible-bipartition](https://leetcode.com/problems/possible-bipartition)
**Companies:** Amazon, Google, Linkedin, Meesho, Meta, Microsoft, Samsung, Snapchat, Tiktok, Uber

---

## Approach: Graph Coloring (BFS/DFS) — O(V+E) ✅

```
FUNCTION possibleBipartition(n, dislikes):
    graph = build adjacency list from dislikes
    color = [-1] * (n + 1)

    FOR i ← 1 TO n:
        IF color[i] != -1: CONTINUE
        queue = [i]
        color[i] = 0
        WHILE queue:
            node = queue.DEQUEUE()
            FOR neighbor IN graph[node]:
                IF color[neighbor] == -1:
                    color[neighbor] = 1 - color[node]
                    queue.ENQUEUE(neighbor)
                ELSE IF color[neighbor] == color[node]:
                    RETURN false

    RETURN true
```

Same as Is Graph Bipartite? (#785). Two-color the graph; if conflict → not bipartite.
