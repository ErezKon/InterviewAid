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

## Examples

**Example 1:**
```
Input: n = 5, edges = [[1,2,3],[1,3,3],[2,3,1],[1,4,2],[5,2,2],[3,5,1],[5,4,2]]
Output: 3
Explanation: The three restricted paths are:
1 → 2 → 5, 1 → 3 → 5, and 1 → 4 → 5.
```
**Example 2:**
```
Input: n = 7, edges = [[1,3,1],[4,1,5],[2,5,1],[7,6,1],[5,6,2],[3,6,1],[6,2,1],[5,2,1],[2,4,1]]
Output: 1
```
---

## Walkthrough

Consider Example 1. After running Dijkstra from node 5, distances are:
- dist[5] = 0
- dist[2] = 2, dist[3] = 1, dist[4] = 2, dist[1] = 3
Processing nodes in increasing distance order yields DP values:
- dp[5] = 1 (base case)
- dp[2] = dp[5] = 1 (edge 2→5)
- dp[3] = dp[5] = 1 (edge 3→5)
- dp[4] = dp[5] = 1 (edge 4→5)
- dp[1] = dp[2] + dp[3] + dp[4] = 3
Thus the answer is 3.
---

## 2. Key Insight

> Run Dijkstra from node `n` to get shortest distances. Then DP: process nodes in increasing distance order. `dp[node]` = count of restricted paths from `node` to `n`.

---

## 3. Approach: Dijkstra + DP — O(E log V) ✅

```text
FUNCTION countRestrictedPaths(n, edges):
    MOD ← 10^9 + 7
    // 1. Dijkstra from node n to compute shortest distances
    dist ← Dijkstra(graph, n)

    // 2. DP in increasing distance order
    dp ← ARRAY of size n+1 initialized to 0
    dp[n] ← 1
    nodes ← LIST of vertices sorted by dist ascending

    FOR node IN nodes:
        FOR neighbor IN adjacency[node]:
            IF dist[neighbor] > dist[node]:
                dp[neighbor] ← (dp[neighbor] + dp[node]) MOD MOD

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
