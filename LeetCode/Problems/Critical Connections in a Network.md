# 1192. Critical Connections in a Network

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/critical-connections-in-a-network](https://leetcode.com/problems/critical-connections-in-a-network)
**Companies:** Akuna Capital, Amazon, Bloomberg, Flipkart, Google, Kla Tencor, Microsoft, Servicenow

---

## Problem Description

Find all **bridges** (critical connections) in an undirected graph — edges whose removal disconnects the graph.

---

## Key Insight

Tarjan's bridge-finding algorithm: track `disc[u]` (discovery time) and `low[u]` (earliest reachable ancestor). Edge `(u, v)` is a bridge if `low[v] > disc[u]`, meaning `v`'s subtree has no back edge reaching above `u`.

---

## Approach: Tarjan's Algorithm — O(V+E) ✅

```
FUNCTION criticalConnections(n, connections):
    graph = adjacency list
    disc = [-1] * n
    low = [0] * n
    timer = 0
    bridges = []

    FUNCTION dfs(u, parent):
        disc[u] = low[u] = timer
        timer += 1

        FOR v IN graph[u]:
            IF v == parent: CONTINUE
            IF disc[v] == -1:
                dfs(v, u)
                low[u] = MIN(low[u], low[v])
                IF low[v] > disc[u]:
                    bridges.ADD([u, v])
            ELSE:
                low[u] = MIN(low[u], disc[v])

    dfs(0, -1)
    RETURN bridges
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(V + E) |
| **Space** | O(V + E) |

---

## Key Takeaway

> **Tarjan's algorithm finds bridges in O(V+E): an edge (u,v) is a bridge iff `low[v] > disc[u]`. The `low` array tracks the earliest ancestor reachable via back edges from the subtree.**
