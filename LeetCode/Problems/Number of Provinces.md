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

Given an `n × n` adjacency matrix `isConnected`, where `isConnected[i][j] = 1` indicates that city `i` and city `j` are directly connected, return the number of **provinces** (connected components) in the graph.

---

## 2. Examples

**Example 1**
```
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Explanation: Cities 0 and 1 form one province, city 2 is isolated.
```

**Example 2**
```
Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
Explanation: No cities are connected, each forms its own province.
```

---

## 3. Approach

The problem reduces to counting connected components in an undirected graph.
Two common methods:
1. **Depth‑First Search (DFS)** – traverse from each unvisited node, marking all reachable nodes.
2. **Union‑Find (Disjoint Set Union)** – union nodes that are directly connected, then count distinct roots.
Both run in `O(n²)` time because the adjacency matrix must be scanned.

---

## 4. Walkthrough

Consider Example 1 (`isConnected = [[1,1,0],[1,1,0],[0,0,1]]`).
| Step | Action | Visited / DSU Roots |
|------|--------|----------------------|
| 1 | Start DFS at node 0 → visit 0, then neighbor 1 (edge 0‑1) → visit 1. | {0,1} visited |
| 2 | Next unvisited node is 2 → start new DFS, visit 2 only. | {2} visited |
| 3 | All nodes visited; two separate traversals → 2 provinces.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | `O(n²)` – scanning the matrix and DFS/Union‑Find operations. |
| **Space** | `O(n)` – visited array or DSU parent array. |

---

## 6. Follow-Up Questions

1. How would you adapt the solution for a **sparse graph** representation (edge list) to achieve `O(V+E)`?
2. Can you modify the algorithm to return the **list of provinces** (grouped city indices) instead of just the count?
3. What changes are needed if the graph is **directed** and you need strongly connected components?

---

## 7. Key Takeaway

> Counting provinces is equivalent to counting connected components in an undirected graph. DFS or Union‑Find provides a straightforward `O(n²)` solution when the input is an adjacency matrix.
