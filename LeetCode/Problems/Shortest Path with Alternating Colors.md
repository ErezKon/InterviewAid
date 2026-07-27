# 1129. Shortest Path with Alternating Colors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-path-with-alternating-colors](https://leetcode.com/problems/shortest-path-with-alternating-colors)
**Companies:** Amazon, Google, Meta, Microsoft, Sprinklr

---

## Problem Description

Given a directed graph with red and blue edges, find the shortest path from node 0 to each node using **alternating colors** (red→blue→red...).

---

## Approach: BFS with Color State

```
FUNCTION shortestAlternatingPaths(n, redEdges, blueEdges):
    graph = {0: defaultdict(list), 1: defaultdict(list)}
    FOR [u, v] IN redEdges: graph[0][u].ADD(v)
    FOR [u, v] IN blueEdges: graph[1][u].ADD(v)

    result = [-1] * n
    queue = [(0, 0, 0), (0, 1, 0)]    // (node, lastColor, dist)
    visited = {(0, 0), (0, 1)}

    WHILE queue:
        (node, color, dist) = queue.DEQUEUE()
        IF result[node] == -1: result[node] = dist
        nextColor = 1 - color
        FOR neighbor IN graph[nextColor][node]:
            IF (neighbor, nextColor) NOT IN visited:
                visited.ADD((neighbor, nextColor))
                queue.ENQUEUE((neighbor, nextColor, dist + 1))

    RETURN result
```
