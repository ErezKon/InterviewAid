# 2385. Amount of Time for Binary Tree to Be Infected

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected)
**Companies:** Adobe, Amazon, Blinkit, Bloomberg, Flipkart, Goldman Sachs, Google, Microsoft, Phonepe, Servicenow, Sharechat, Uber

---

## Approach: Convert to Graph + BFS — O(n) ✅

```
FUNCTION amountOfTime(root, start):
    // Build adjacency list from tree
    graph = {}
    buildGraph(root, null, graph)

    // BFS from start
    visited = {start}
    queue = [start]
    time = -1

    WHILE queue:
        time += 1
        nextLevel = []
        FOR node IN queue:
            FOR neighbor IN graph[node]:
                IF neighbor NOT IN visited:
                    visited.ADD(neighbor)
                    nextLevel.ADD(neighbor)
        queue = nextLevel

    RETURN time
```

Same pattern as "All Nodes Distance K in Binary Tree" — convert tree to undirected graph, then BFS.
