# 2482. Difference Between Ones and Zeros in Row and Column

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/difference-between-ones-and-zeros-in-row-and-column](https://leetcode.com/problems/difference-between-ones-and-zeros-in-row-and-column)
**Companies:** Amazon

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Precompute Row/Column Counts](#approach-precompute-rowcolumn-counts)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** `m x n` binary matrix `grid`.

A **0-indexed** `m x n` difference matrix `diff` is created with the following procedure:

- Let the number of ones in the `i^th` row be `onesRow_i`.
- Let the number of ones in the `j^th` column be `onesCol_j`.
- Let the number of zeros in the `i^th` row be `zerosRow_i`.
- Let the number of zeros in the `j^th` column be `zerosCol_j`.
- `diff[i][j] = onesRow_i + onesCol_j - zerosRow_i - zerosCol_j`

Return *the difference matrix *`diff`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 10^5`
- `1 <= m * n <= 10^5`
- `grid[i][j]` is either `0` or `1`.

---

## Examples

**Example 1:**
```
Input: grid = [[0,1,1],[1,0,1],[0,0,1]]
Output: [[0,0,4],[0,0,4],[-2,-2,2]]
Explanation: - diff[0][0] = onesRow_0 + onesCol_0 - zerosRow_0 - zerosCol_0 = 2 + 1 - 1 - 2 = 0
- diff[0][1] = onesRow_0 + onesCol_1 - zerosRow_0 - zerosCol_1 = 2 + 1 - 1 - 2 = 0
- diff[0][2] = onesRow_0 + onesCol_2 - zerosRow_0 - zerosCol_2 = 2 + 3 - 1 - 0 = 4
- diff[1][0] = onesRow_1 + onesCol_0 - zerosRow_1 - zerosCol_0 = 2 + 1 - 1 - 2 = 0
- diff[1][1] = onesRow_1 + onesCol_1 - zerosRow_1 - zerosCol_1 = 2 + 1 - 1 - 2 = 0
- diff[1][2] = onesRow_1 + onesCol_2 - zerosRow_1 - zerosCol_2 = 2 + 3 - 1 - 0 = 4
- diff[2][0] = onesRow_2 + onesCol_0 - zerosRow_2 - zerosCol_0 = 1 + 1 - 2 - 2 = -2
- diff[2][1] = onesRow_2 + onesCol_1 - zerosRow_2 - zerosCol_1 = 1 + 1 - 2 - 2 = -2
- diff[2][2] = onesRow_2 + onesCol_2 - zerosRow_2 - zerosCol_2 = 1 + 3 - 2 - 0 = 2
```

**Example 2:**
```
Input: grid = [[1,1,1],[1,1,1]]
Output: [[5,5,5],[5,5,5]]
Explanation: - diff[0][0] = onesRow_0 + onesCol_0 - zerosRow_0 - zerosCol_0 = 3 + 2 - 0 - 0 = 5
- diff[0][1] = onesRow_0 + onesCol_1 - zerosRow_0 - zerosCol_1 = 3 + 2 - 0 - 0 = 5
- diff[0][2] = onesRow_0 + onesCol_2 - zerosRow_0 - zerosCol_2 = 3 + 2 - 0 - 0 = 5
- diff[1][0] = onesRow_1 + onesCol_0 - zerosRow_1 - zerosCol_0 = 3 + 2 - 0 - 0 = 5
- diff[1][1] = onesRow_1 + onesCol_1 - zerosRow_1 - zerosCol_1 = 3 + 2 - 0 - 0 = 5
- diff[1][2] = onesRow_1 + onesCol_2 - zerosRow_1 - zerosCol_2 = 3 + 2 - 0 - 0 = 5
```

---

## Key Insight

> Since `zerosRow_i = n - onesRow_i` and `zerosCol_j = m - onesCol_j`, the formula simplifies to:
> `diff[i][j] = 2 * onesRow_i + 2 * onesCol_j - m - n`
>
> Precompute `onesRow` and `onesCol` arrays, then fill the result.

---

## Approach: Precompute Row/Column Counts ✅

```
FUNCTION onesMinusZeros(grid):
    m, n ← dimensions of grid
    onesRow ← array[m]  // count of 1s in each row
    onesCol ← array[n]  // count of 1s in each col

    FOR i ← 0 TO m-1 DO
        onesRow[i] ← SUM(grid[i])
    FOR j ← 0 TO n-1 DO
        onesCol[j] ← SUM(grid[r][j] for r in 0..m-1)

    diff ← m×n matrix
    FOR i ← 0 TO m-1 DO
        FOR j ← 0 TO n-1 DO
            diff[i][j] ← 2 * onesRow[i] + 2 * onesCol[j] - m - n

    RETURN diff
END FUNCTION
```

---

## Walkthrough

```
grid = [[0,1,1],[1,0,1],[0,0,1]]
m=3, n=3
onesRow = [2, 2, 1]
onesCol = [1, 1, 3]
```

`diff[i][j] = 2*onesRow[i] + 2*onesCol[j] - 3 - 3`

| (i,j) | 2×onesRow[i] | 2×onesCol[j] | -6 | diff |
|--------|-------------|-------------|-----|------|
| (0,0)  | 4           | 2           | -6  | 0    |
| (0,2)  | 4           | 6           | -6  | 4    |
| (2,2)  | 2           | 6           | -6  | 2    |

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(m × n) | Count rows/cols + fill result |
| **Space** | O(m + n) | Row and column count arrays |

---

## Key Takeaway

> **When a matrix cell depends on aggregate row/column statistics, precompute per-row and per-column counts, then combine them — this avoids redundant recomputation and keeps the solution O(m×n).**
