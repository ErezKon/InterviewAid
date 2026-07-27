# 1786. Number of Restricted Paths From First to Last Node

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-restricted-paths-from-first-to-last-node](https://leetcode.com/problems/number-of-restricted-paths-from-first-to-last-node)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Dijkstra + DP — O(E log V)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

A restricted path goes from node 1 to node `n`, always moving to a node with a **smaller** shortest distance to `n`. Count such paths mod 10⁹+7.

---

## 2. Key Insight

> Run Dijkstra from node `n` to get shortest distances. Then DP: process nodes in increasing distance order. `dp[node]` = count of restricted paths from `node` to `n`.

---

## 3. Approach: Dijkstra + DP — O(E log V) ✅

```
FUNCTION countRestrictedPaths(n, edges):
    MOD = 10^9 + 7
    // 1. Dijkstra from node n
    dist = Dijkstra(graph, n)

    // 2. DP in increasing distance order
    dp = [0] * (n + 1); dp[n] = 1
    nodes = sorted by dist[node] ascending

    FOR node IN nodes:
        FOR neighbor IN adj[node]:
            IF dist[neighbor] > dist[node]:
                dp[neighbor] = (dp[neighbor] + dp[node]) % MOD

    RETURN dp[1]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E log V) — Dijkstra + sort |
| **Space** | O(V + E) |

---

## 5. Key Takeaway

> **Dijkstra for distances, then DP on the DAG.** Restricted path = strictly decreasing distance → forms a DAG. Process in topological order (increasing distance).
