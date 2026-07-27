# 2642. Design Graph With Shortest Path Calculator

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-graph-with-shortest-path-calculator](https://leetcode.com/problems/design-graph-with-shortest-path-calculator)
**Companies:** Nike, Samsung

---

## Problem Description

Design a directed weighted graph supporting `addEdge(from, to, cost)` and `shortestPath(node1, node2)`.

---

## Approach

```
CLASS Graph:
    CONSTRUCTOR(n, edges):
        adj = defaultdict(list)
        FOR [u, v, w] IN edges: adj[u].ADD((v, w))

    FUNCTION addEdge(edge):
        adj[edge[0]].ADD((edge[1], edge[2]))

    FUNCTION shortestPath(node1, node2):
        // Dijkstra's algorithm
        dist = [INF] * n; dist[node1] = 0
        pq = [(0, node1)]
        WHILE pq:
            d, u = heappop(pq)
            IF u == node2: RETURN d
            IF d > dist[u]: CONTINUE
            FOR (v, w) IN adj[u]:
                IF dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    heappush(pq, (dist[v], v))
        RETURN -1
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) addEdge, O((V+E) log V) shortestPath |
| **Space** | O(V + E) |

---

## Key Takeaway

> **Adjacency list + Dijkstra per query. Dynamic edge addition is O(1) — just append to the adjacency list. Each shortest path query runs fresh Dijkstra.**
