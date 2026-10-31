# 547. Number of Provinces

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/number-of-provinces
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft, Pinterest, Two Sigma, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

There are `n` cities. Some of them are connected, while some are not. If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`, then city `a` is connected indirectly with city `c`.

A **province** is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an `n x n` matrix `isConnected` where `isConnected[i][j] = 1` if the `i^th` city and the `j^th` city are directly connected, and `isConnected[i][j] = 0` otherwise.

Return *the total number of **provinces***.

**Constraints:**
- `1 <= n <= 200`
- `n == isConnected.length`
- `n == isConnected[i].length`
- `isConnected[i][j]` is `1` or `0`.
- `isConnected[i][i] == 1`
- `isConnected[i][j] == isConnected[j][i]`

---

## 2. Examples

**Example 1:**
```
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
```

**Example 2:**
```
Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
```

---

## 3. Approach

The problem reduces to counting connected components in an undirected graph.
Two common methods:
1. **Depth-First Search (DFS)** – traverse from each unvisited node, marking all reachable nodes.
2. **Union-Find (Disjoint Set Union)** – union nodes that are directly connected, then count distinct roots.
Both run in `O(n²)` time because the adjacency matrix must be scanned.

---

## 4. Walkthrough

Consider Example 1 (`isConnected = [[1,1,0],[1,1,0],[0,0,1]]`).
| Step | Action | Visited / DSU Roots |
|------|--------|----------------------|
| 1 | Start DFS at node 0 → visit 0, then neighbor 1 (edge 0-1) → visit 1. | {0,1} visited |
| 2 | Next unvisited node is 2 → start new DFS, visit 2 only. | {2} visited |
| 3 | All nodes visited; two separate traversals → 2 provinces.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | `O(n²)` – scanning the matrix and DFS/Union-Find operations. |
| **Space** | `O(n)` – visited array or DSU parent array. |

---

## 6. Follow-Up Questions

1. How would you adapt the solution for a **sparse graph** representation (edge list) to achieve `O(V+E)`?
2. Can you modify the algorithm to return the **list of provinces** (grouped city indices) instead of just the count?
3. What changes are needed if the graph is **directed** and you need strongly connected components?

---

## 7. Key Takeaway

> Counting provinces is equivalent to counting connected components in an undirected graph. DFS or Union-Find provides a straightforward `O(n²)` solution when the input is an adjacency matrix.
