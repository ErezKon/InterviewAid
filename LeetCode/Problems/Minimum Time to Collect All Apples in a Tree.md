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

Given a tree with `n` nodes rooted at 0, some nodes have apples. Starting at root, return the **minimum** time to collect all apples and return. Each edge traversal costs 1 second.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Examples

```
Example 1:
  Input: n=7, edges=[[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple=[false,false,true,false,true,true,false]
  Output: 8
  Explanation: Visit nodes 4,5 (under 1) and node 2. Each edge traversed twice (down+up).
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
