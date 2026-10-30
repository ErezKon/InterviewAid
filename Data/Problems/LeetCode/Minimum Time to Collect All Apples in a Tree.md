# 1443. Minimum Time to Collect All Apples in a Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree](https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree)
**Companies:** Amazon, Cisco, Google, Meta, Microsoft, Myntra

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DFS — O(n)](#4-approach-dfs--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an undirected tree consisting of `n` vertices numbered from `0` to `n-1`, which has some apples in their vertices. You spend 1 second to walk over one edge of the tree. *Return the minimum time in seconds you have to spend to collect all apples in the tree, starting at **vertex 0** and coming back to this vertex.*

The edges of the undirected tree are given in the array `edges`, where `edges[i] = [a_i, b_i]` means that exists an edge connecting the vertices `a_i` and `b_i`. Additionally, there is a boolean array `hasApple`, where `hasApple[i] = true` means that vertex `i` has an apple; otherwise, it does not have any apple.

**Constraints:**
- `1 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= a_i < b_i <= n - 1`
- `hasApple.length == n`

---

## 2. Examples

**Example 1:**
```
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,true,true,false]
Output: 8
Explanation: The figure above represents the given tree where red vertices have an apple. One optimal path to collect all apples is shown by the green arrows.
```

**Example 2:**
```
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,false,true,false]
Output: 6
Explanation: The figure above represents the given tree where red vertices have an apple. One optimal path to collect all apples is shown by the green arrows.
```

**Example 3:**
```
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,false,false,false,false,false]
Output: 0
```

---

## 3. Key Insight

> DFS from root. Only include an edge (both directions = +2) if the subtree below contains at least one apple. A subtree "has apples" if the node itself has one OR any descendant does (childTime > 0).

---

## 4. Approach: DFS — O(n) ✅

```
FUNCTION minTime(n, edges, hasApple):
    graph = adjacency list
    visited = set()

    FUNCTION dfs(node):
        visited.ADD(node)
        totalTime = 0
        FOR child IN graph[node]:
            IF child IN visited: CONTINUE
            childTime = dfs(child)
            IF childTime > 0 OR hasApple[child]:
                totalTime += childTime + 2
        RETURN totalTime

    RETURN dfs(0)
```

---

## 5. Walkthrough

```
Tree:     0
         / \
        1   2
       / \  / \
      4  5 3   6

hasApple: [F, F, T, F, T, T, F]

dfs(4): leaf, apple → return 0. Parent adds 0+2=2.
dfs(5): leaf, apple → return 0. Parent adds 0+2=2.
dfs(1): total=4 (edges to 4 and 5). No apple at 1, but childTime>0 → parent adds 4+2=6.
dfs(3): no apple, return 0. Parent skips.
dfs(6): no apple, return 0. Parent skips.
dfs(2): apple at 2 → parent adds 0+2=2.
dfs(0): total from 1 = 6, total from 2 = 2. Answer = 8 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — visit each node once |
| **Space** | O(n) — recursion stack |

---

## 7. Key Takeaway

> **DFS with conditional edge counting** — only traverse edges leading to apple-containing subtrees. Each such edge contributes +2 (down and back up). Classic tree DFS pattern.
