# 2639. Find the Width of Columns of a Grid

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-width-of-columns-of-a-grid](https://leetcode.com/problems/find-the-width-of-columns-of-a-grid)
**Companies:** Atlassian, Samsung

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Column-wise Max Length — O(m · n) ✅](#2-approach-column-wise-max-length--om--n-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given an `m × n` grid of integers, find the width of each column. Width = max string length of any element in that column (including minus sign).

**Constraints:**
- `1 <= m, n <= 100`

---

## 2. Approach: Column-wise Max Length — O(m · n) ✅

```
FUNCTION findColumnWidth(grid):
    result ← []
    FOR c ← 0 TO n - 1 DO
        maxWidth ← 0
        FOR r ← 0 TO m - 1 DO
            maxWidth ← MAX(maxWidth, LENGTH(str(grid[r][c])))
        result.ADD(maxWidth)
    RETURN result
```

---

## 3. Key Takeaway

> Convert each element to a string and track the maximum length per column. O(m · n) straightforward scan.
