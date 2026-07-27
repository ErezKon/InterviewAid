# 694. Number of Distinct Islands

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-distinct-islands](https://leetcode.com/problems/number-of-distinct-islands)
**Companies:** Amazon, Anduril, Aurora, Bloomberg, Coupang, Google, Microsoft, Oracle, Servicenow, Snapchat, Splunk, Tiktok, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS + Path Signature — O(m·n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count the number of **distinct island shapes** in a binary grid. Two islands are the same if one can be translated to match the other.

---

## 2. Key Insight

> Record each island as relative coordinates from the first cell found. Two islands with the same relative coordinate set have the same shape.

---

## 3. Approach: DFS + Path Signature — O(m·n) ✅

```
FUNCTION numDistinctIslands(grid):
    visited = set()
    shapes = set()

    FOR r, c where grid[r][c] == 1 AND not visited:
        path = []
        dfs(grid, r, c, r, c, visited, path)
        shapes.ADD(tuple(path))

    RETURN len(shapes)

FUNCTION dfs(grid, r, c, baseR, baseC, visited, path):
    IF out of bounds OR visited OR grid[r][c] == 0: RETURN
    visited.ADD((r, c))
    path.ADD((r - baseR, c - baseC))    // relative coordinates
    dfs(r+1, c, ...); dfs(r-1, c, ...); dfs(r, c+1, ...); dfs(r, c-1, ...)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) |
| **Space** | O(m · n) |

---

## 5. Key Takeaway

> **Relative coordinates as shape signature.** Translate each island to origin using offset from first cell. Store as tuple in a set for uniqueness. Alternative: record DFS traversal direction sequence.
