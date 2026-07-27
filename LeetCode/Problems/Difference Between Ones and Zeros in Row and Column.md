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

Given an `m × n` binary matrix `grid`, create a difference matrix `diff` where:

`diff[i][j] = onesRow_i + onesCol_j - zerosRow_i - zerosCol_j`

Where `onesRow_i` = number of 1s in row `i`, `zerosRow_i` = number of 0s in row `i`, etc.

**Constraints:**
- `m == grid.length`, `n == grid[0].length`
- `1 <= m, n <= 10^5`
- `1 <= m × n <= 10^5`
- `grid[i][j]` is 0 or 1.

---

## Examples

```
Input: grid = [[0,1,1],
               [1,0,1],
               [0,0,1]]

onesRow = [2, 2, 1],  zerosRow = [1, 1, 2]
onesCol = [1, 1, 3],  zerosCol = [2, 2, 0]

diff[0][0] = 2+1-1-2 = 0
diff[0][1] = 2+1-1-2 = 0
diff[0][2] = 2+3-1-0 = 4

Output: [[0,0,4],
         [0,0,4],
         [-2,-2,2]]
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
