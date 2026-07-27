# 2603. Collect Coins in a Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/collect-coins-in-a-tree](https://leetcode.com/problems/collect-coins-in-a-tree)
**Companies:** Cisco, Google, Graviton, Lucid, Meesho, Meta, Millennium, Oracle, Phonepe, Salesforce, Uber, Uipath

---

## Approach: Topological Pruning — O(n) ✅

1. Remove all leaf nodes without coins (they're useless).
2. Remove coin leaves twice (we can collect from 2 edges away).
3. Answer = 2 × remaining edges.

```
FUNCTION collectTheCoins(coins, edges):
    n = len(coins)
    graph = adjacency list
    degree = [0] * n

    // Build graph
    FOR [u, v] IN edges:
        graph[u].ADD(v); graph[v].ADD(u)
        degree[u] += 1; degree[v] += 1

    // Step 1: Remove non-coin leaves repeatedly
    queue = [i for i if degree[i] == 1 AND coins[i] == 0]
    WHILE queue:
        node = queue.DEQUEUE()
        degree[node] = 0
        FOR neighbor IN graph[node]:
            degree[neighbor] -= 1
            IF degree[neighbor] == 1 AND coins[neighbor] == 0:
                queue.ENQUEUE(neighbor)

    // Step 2: Remove coin leaves twice (collect from distance 2)
    FOR round ← 0 TO 1:
        leaves = [i for i if degree[i] == 1]
        FOR node IN leaves:
            degree[node] = 0
            FOR neighbor IN graph[node]:
                degree[neighbor] -= 1

    // Remaining edges
    remaining = SUM(1 for [u,v] in edges if degree[u] >= 1 AND degree[v] >= 1)
    RETURN 2 * remaining
```
