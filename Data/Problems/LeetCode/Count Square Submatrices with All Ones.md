# 1277. Count Square Submatrices with All Ones

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-square-submatrices-with-all-ones](https://leetcode.com/problems/count-square-submatrices-with-all-ones)
**Companies:** Amazon, Goldman Sachs, Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` binary matrix, return the total number of square submatrices that have all ones.

**Constraints:**
- `1 <= m, n <= 300`
- `matrix[i][j]` is `0` or `1`

---

## Examples

**Example 1:**
- **Input:** `matrix = [[0,1,1,1],[1,1,1,1],[0,1,1,1]]`
- **Output:** `15`
- **Explanation:** 10 squares of side 1, 4 of side 2, 1 of side 3 = 15.

---

## Key Insight

`dp[r][c]` = the side length of the **largest** all-ones square whose bottom-right corner is `(r, c)`. This value also equals **how many** squares end at `(r, c)` (one for each size 1 through `dp[r][c]`). So the answer is `sum(dp[r][c])` for all cells.

The recurrence: `dp[r][c] = 1 + min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1])` if `matrix[r][c] == 1`.

---

## Approach

```
FUNCTION countSquares(matrix):
    m, n = dimensions
    FOR r ← 1 TO m - 1:
        FOR c ← 1 TO n - 1:
            IF matrix[r][c] == 1:
                matrix[r][c] = 1 + MIN(matrix[r-1][c], matrix[r][c-1], matrix[r-1][c-1])
    RETURN SUM(SUM(row) for row in matrix)
```

This modifies the matrix in-place to serve as the DP table.

---

## Walkthrough

**Input:** `matrix = [[0,1,1,1],[1,1,1,1],[0,1,1,1]]`

```
After DP:
  [0, 1, 1, 1]
  [1, 1, 2, 2]
  [0, 1, 2, 3]

Sum: 0+1+1+1 + 1+1+2+2 + 0+1+2+3 = 15 ✅

Interpretation of dp[2][3] = 3:
  Three squares end at (2,3): 1×1, 2×2, and 3×3
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) |
| **Space** | O(1) — in-place modification |

---

## Follow-Up Questions

**Q1: Why does `min(top, left, diagonal)` work?**
A square of side `s` at `(r,c)` requires squares of side `s-1` at `(r-1,c)`, `(r,c-1)`, and `(r-1,c-1)`. The minimum determines the largest possible.

**Q2: How does this relate to "Maximal Square" (LeetCode #221)?**
Same DP recurrence, but #221 returns `max(dp[r][c])²` (area of the largest square). This problem sums all `dp[r][c]` values.

**Q3: Can this be done without modifying the original matrix?**
Yes — use a separate `dp` array or keep only the previous row (O(n) space).

---

## Key Takeaway

> **The "square submatrix" DP pattern uses `dp[r][c] = 1 + min(top, left, diagonal)`. The value at each cell counts squares ending there. Sum all values for total count; take max for the largest square.**
