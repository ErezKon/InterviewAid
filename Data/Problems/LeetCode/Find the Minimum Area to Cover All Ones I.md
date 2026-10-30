# 3195. Find the Minimum Area to Cover All Ones I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-i](https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-i)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Walkthrough](#3-walkthrough)
4. [Key Insight](#4-key-insight)
5. [Approach: Bounding Box — O(m·n) ✅](#5-approach-bounding-box--omn-)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a 2D **binary** array `grid`. Find a rectangle with horizontal and vertical sides with the **smallest** area, such that all the 1's in `grid` lie inside this rectangle.

Return the **minimum** possible area of the rectangle.

**Constraints:**
- `1 <= grid.length, grid[i].length <= 1000`
- `grid[i][j]` is either 0 or 1.
- The input is generated such that there is at least one 1 in `grid`.

---

## 2. Examples

```
Example 1:
  Input: grid = [[0,1,0],[1,0,1]]
  Output: 6
  Explanation: The smallest rectangle has a height of 2 and a width of 3, so it has an area of
  2 * 3 = 6.

Example 2:
  Input: grid = [[1,0],[0,0]]
  Output: 1
  Explanation: The smallest rectangle has both height and width 1, so its area is 1 * 1 = 1.
```

---

## 3. Walkthrough

We scan the grid once, tracking the extreme rows and columns of any cell containing `1`.

| Variable | Initial | Update Rule |
|----------|---------|-------------|
| `minR`   | `m`     | `minR = MIN(minR, r)` when `grid[r][c] == 1` |
| `maxR`   | `0`     | `maxR = MAX(maxR, r)` |
| `minC`   | `n`     | `minC = MIN(minC, c)` |
| `maxC`   | `0`     | `maxC = MAX(maxC, c)` |

After processing all cells, the rectangle spans rows `minR..maxR` and columns `minC..maxC`. Its area is `(maxR - minR + 1) * (maxC - minC + 1)`.

---

## 4. Key Insight

> The minimum bounding rectangle is defined by the extreme positions of all 1s: min/max row and min/max column.

---

## 5. Approach: Bounding Box — O(m·n) ✅

```
FUNCTION minimumArea(grid):
    m ← NUMBER_OF_ROWS(grid)
    n ← NUMBER_OF_COLUMNS(grid)
    minR ← m; maxR ← 0; minC ← n; maxC ← 0
    FOR r FROM 0 TO m-1 DO
        FOR c FROM 0 TO n-1 DO
            IF grid[r][c] == 1 THEN
                minR ← MIN(minR, r)
                maxR ← MAX(maxR, r)
                minC ← MIN(minC, c)
                maxC ← MAX(maxC, c)
    RETURN (maxR - minR + 1) * (maxC - minC + 1)
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n) — scan all cells |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Minimum bounding rectangle** = track the 4 extreme positions (min/max row and column) of all 1s. Area = width × height.
