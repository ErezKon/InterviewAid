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

There is an undirected weighted connected graph. You are given a positive integer `n` which denotes that the graph has `n` nodes labeled from `1` to `n`, and an array `edges` where each `edges[i] = [u_i, v_i, weight_i]` denotes that there is an edge between nodes `u_i` and `v_i` with weight equal to `weight_i`.

A path from node `start` to node `end` is a sequence of nodes `[z_0, z_1,_ z_2, ..., z_k]` such that `z_0 = start` and `z_k = end` and there is an edge between `z_i` and `z_i+1` where `0 <= i <= k-1`.

The distance of a path is the sum of the weights on the edges of the path. Let `distanceToLastNode(x)` denote the shortest distance of a path between node `n` and node `x`. A **restricted path** is a path that also satisfies that `distanceToLastNode(z_i) > distanceToLastNode(z_i+1)` where `0 <= i <= k-1`.

Return *the number of restricted paths from node* `1` *to node* `n`. Since that number may be too large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= n <= 2 * 10^4`
- `n - 1 <= edges.length <= 4 * 10^4`
- `edges[i].length == 3`
- `1 <= u_i, v_i <= n`
- `u_i != v_i`
- `1 <= weight_i <= 10^5`
- There is at most one edge between any two nodes.
- There is at least one path between any two nodes.

---

## Examples

**Example 1:**
```
Input: n = 5, edges = [[1,2,3],[1,3,3],[2,3,1],[1,4,2],[5,2,2],[3,5,1],[5,4,10]]
Output: 3
Explanation: Each circle contains the node number in black and its distanceToLastNode value in blue. The three restricted paths are:
1) 1 --> 2 --> 5
2) 1 --> 2 --> 3 --> 5
3) 1 --> 3 --> 5
```

**Example 2:**
```
Input: n = 7, edges = [[1,3,1],[4,1,2],[7,3,4],[2,5,3],[5,6,1],[6,7,2],[7,5,3],[2,6,4]]
Output: 1
Explanation: Each circle contains the node number in black and its distanceToLastNode value in blue. The only restricted path is 1 --> 3 --> 7.
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
