# 802. Find Eventual Safe States

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-eventual-safe-states](https://leetcode.com/problems/find-eventual-safe-states)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description

Find all nodes that eventually lead to a terminal node (no outgoing edges) regardless of path taken. Nodes in cycles are **not** safe.

---

## Approach: Reverse Topological Sort — O(V+E) ✅

```
FUNCTION eventualSafeNodes(graph):
    n = len(graph)
    reverseGraph = [[] for _ in range(n)]
    outDegree = [0] * n

    FOR u ← 0 TO n - 1:
        outDegree[u] = len(graph[u])
        FOR v IN graph[u]:
            reverseGraph[v].ADD(u)

    queue = [i for i if outDegree[i] == 0]    // terminal nodes
    safe = set(queue)

    WHILE queue:
        node = queue.DEQUEUE()
        FOR prev IN reverseGraph[node]:
            outDegree[prev] -= 1
            IF outDegree[prev] == 0:
                safe.ADD(prev)
                queue.ENQUEUE(prev)

    RETURN sorted(safe)
```

---

## Key Takeaway

> **Safe nodes = not in any cycle. Reverse topological sort: start from terminal nodes (out-degree 0), propagate backwards. Equivalent to cycle detection via coloring DFS.**
