# 2304. Minimum Path Cost in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-path-cost-in-a-grid](https://leetcode.com/problems/minimum-path-cost-in-a-grid)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP Row by Row — O(m·n²)](#4-approach-dp-row-by-row--omn²)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an `m × n` grid where each cell has a value, and a `moveCost` matrix where `moveCost[v][j]` is the cost to move from a cell with value `v` to column `j` in the next row. Find the **minimum cost** path from any cell in the first row to any cell in the last row.

The total cost = sum of cell values along the path + sum of move costs between consecutive cells.

**Constraints:**
- `m, n <= 50`
- All cell values are unique in `[0, m·n)`

---

## 2. Examples

```
Example 1:
  Input: grid = [[5,3],[4,0],[2,1]], moveCost = [[9,8],[1,5],[10,12],[18,6],[2,4],[14,3]]
  Output: 17
  Explanation: Path 3→0→1: cost = 3 + moveCost[3][1] + 0 + moveCost[0][1] + 1
```

---

## 3. Key Insight

> Standard DP: for each cell in the current row, consider all cells from the previous row and pick the one giving the minimum total cost (cell value + move cost).

---

## 4. Approach: DP Row by Row — O(m·n²) ✅

```
FUNCTION minPathCost(grid, moveCost):
    m, n = dimensions of grid
    dp = copy of grid[0]  // first row costs

    FOR i ← 1 TO m - 1:
        newDp = [infinity] * n
        FOR j ← 0 TO n - 1:        // target column in current row
            FOR k ← 0 TO n - 1:    // source column in previous row
                cost = dp[k] + moveCost[grid[i-1][k]][j] + grid[i][j]
                newDp[j] = MIN(newDp[j], cost)
        dp = newDp

    RETURN MIN(dp)
```

---

## 5. Walkthrough

```
grid = [[5,3],[4,0],[2,1]]
moveCost indexed by cell value

Row 0: dp = [5, 3]

Row 1 (values [4,0]):
  j=0 (val=4): from k=0: 5+moveCost[5][0]+4, from k=1: 3+moveCost[3][0]+4
  j=1 (val=0): from k=0: 5+moveCost[5][1]+0, from k=1: 3+moveCost[3][1]+0

Row 2 (values [2,1]): similar computation
  
Final: MIN(dp) = minimum cost path ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n²) — for each of m rows, check n×n transitions |
| **Space** | O(n) — single row DP |

---

## 7. Key Takeaway

> **Grid DP with explicit transition costs** — unlike standard path sum where movement cost is implicit, here it depends on cell values. The DP structure remains the same: iterate row by row, consider all source cells.
