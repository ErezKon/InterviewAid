# 2371. Minimize Maximum Value in a Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimize-maximum-value-in-a-grid](https://leetcode.com/problems/minimize-maximum-value-in-a-grid)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` grid of **distinct** positive integers, replace each value with a positive integer such that the **relative order** within each row and each column is preserved, and the **maximum value** in the grid is minimized.

---

## Key Insight

> Sort all cells by value. Process in order — for each cell, its assigned value must be greater than any previously assigned value in the same row or column. Track the max assigned value per row and per column.

---

## Approach: Sort + Row/Column Tracking — O(mn · log(mn)) ✅

```
FUNCTION minScore(grid):
    m, n ← dimensions of grid
    cells ← [(grid[r][c], r, c) FOR ALL r, c]
    SORT cells BY value
    
    rowMax ← ARRAY(m, 0)
    colMax ← ARRAY(n, 0)
    result ← COPY(grid)
    
    FOR (val, r, c) IN cells DO
        assign ← MAX(rowMax[r], colMax[c]) + 1
        result[r][c] ← assign
        rowMax[r] ← assign
        colMax[c] ← assign
    
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + greedy assign | **O(mn · log(mn))** | **O(mn)** |

---

## Key Takeaway

> **Coordinate compression with constraints** — process cells in value order, assigning the smallest valid rank that respects row and column ordering. Track maximums per row and column.

---
