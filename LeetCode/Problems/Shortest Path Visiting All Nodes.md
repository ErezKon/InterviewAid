# 847. Shortest Path Visiting All Nodes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-path-visiting-all-nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

Given an undirected graph, find the shortest path that visits **every node** (can revisit nodes and edges).

---

## Approach: BFS + Bitmask — O(2ⁿ·n²) ✅

```
FUNCTION shortestPathLength(graph):
    n = len(graph)
    allVisited = (1 << n) - 1
    queue = [(i, 1 << i, 0) for i in range(n)]
    visited = {(i, 1 << i) for i in range(n)}

    WHILE queue:
        (node, mask, dist) = queue.DEQUEUE()
        IF mask == allVisited: RETURN dist

        FOR neighbor IN graph[node]:
            newMask = mask | (1 << neighbor)
            IF (neighbor, newMask) NOT IN visited:
                visited.ADD((neighbor, newMask))
                queue.ENQUEUE((neighbor, newMask, dist + 1))

    RETURN -1
```

State = (current node, bitmask of visited nodes). BFS guarantees shortest path.
