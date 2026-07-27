# 547. Number of Provinces

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-provinces](https://leetcode.com/problems/number-of-provinces)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft, Pinterest, Two Sigma, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS / Union-Find — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an `n × n` adjacency matrix `isConnected`, return the number of connected components (provinces).

---

## 2. Key Insight

> Count connected components in an undirected graph. DFS from each unvisited node, or use Union-Find.

---

## 3. Approach: DFS / Union-Find — O(n²) ✅

```
FUNCTION findCircleNum(isConnected):
    n = len(isConnected)
    visited = [false] * n
    count = 0

    FOR i ← 0 TO n - 1:
        IF NOT visited[i]:
            count += 1
            dfs(i, isConnected, visited)

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Connected components on adjacency matrix.** Same as Number of Islands but on a matrix representation. DFS or Union-Find both work in O(n²).
