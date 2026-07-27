# 1020. Number of Enclaves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-enclaves](https://leetcode.com/problems/number-of-enclaves)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Border DFS + Count — O(m·n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count the number of land cells (`1`s) that cannot reach the border (enclosed land cells).

---

## 2. Key Insight

> Flood fill from all border land cells to remove reachable land. Remaining `1`s are enclaves.

---

## 3. Approach: Border DFS + Count — O(m·n) ✅

```
FUNCTION numEnclaves(grid):
    // Flood fill from border land cells
    FOR each border cell (r, c):
        IF grid[r][c] == 1:
            dfs(grid, r, c)    // marks border-connected land as 0

    // Count remaining land cells
    RETURN count of 1s in grid
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) |
| **Space** | O(m · n) — recursion stack |

---

## 5. Key Takeaway

> **Eliminate border-connected land, count remainder.** Same pattern as Surrounded Regions (#130) and Number of Closed Islands (#1254).
