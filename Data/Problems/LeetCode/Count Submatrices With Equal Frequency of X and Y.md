# 3212. Count Submatrices With Equal Frequency of X and Y

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-submatrices-with-equal-frequency-of-x-and-y](https://leetcode.com/problems/count-submatrices-with-equal-frequency-of-x-and-y)
**Companies:** Amazon, Google, Microsoft

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

Given a 2D character matrix `grid`, where `grid[i][j]` is either `'X'`, `'Y'`, or `'.'`, return the number of submatrices that contain:

- `grid[0][0]`
- an **equal** frequency of `'X'` and `'Y'`.
- **at least** one `'X'`.

**Constraints:**
- `1 <= grid.length, grid[i].length <= 1000`
- `grid[i][j]` is either `'X'`, `'Y'`, or `'.'`.

---

## Examples

**Example 1:**
```
Input: grid = [["X","Y","."],["Y",".","."]]
Output: 3
Explanation: ![img](https://assets.leetcode.com/uploads/2024/06/07/examplems.png)
```

**Example 2:**
```
Input: grid = [["X","X"],["X","Y"]]
Output: 0
Explanation: No submatrix has an equal frequency of 'X' and 'Y'.
```

**Example 3:**
```
Input: grid = [[".","."],[".","."]]
Output: 0
Explanation: No submatrix has at least one 'X'.
```

---

## Key Insight

Since all submatrices start at `(0,0)`, a **2‑D prefix sum** for each character type lets us compute the count of X and Y in any `(0,0)-(i,j)` rectangle in O(1). Comparing the two prefix sums for each cell yields the answer.

---

## Approach

```text
FUNCTION countSubmatrices(grid):
    m, n ← DIMENSIONS(grid)
    // Prefix sums for X and Y, 1‑based indexing
    prefX ← MATRIX of size (m+1) × (n+1) filled with 0
    prefY ← MATRIX of size (m+1) × (n+1) filled with 0
    result ← 0

    FOR i ← 1 TO m DO
        FOR j ← 1 TO n DO
            // Update prefix sums
            prefX[i][j] ← prefX[i-1][j] + prefX[i][j-1] - prefX[i-1][j-1]
                           + (1 IF grid[i-1][j-1] = 'X' ELSE 0)
            prefY[i][j] ← prefY[i-1][j] + prefY[i][j-1] - prefY[i-1][j-1]
                           + (1 IF grid[i-1][j-1] = 'Y' ELSE 0)
            // Check equality and positivity
            IF prefX[i][j] = prefY[i][j] AND prefX[i][j] > 0 THEN
                result ← result + 1
    RETURN result
```

---

## Walkthrough

Consider `grid = [["X","Y"],["Y","X"]]` (2×2):

1. Initialize `prefX` and `prefY` with zeros.
2. Process cell (1,1) `'X'`:
   - `prefX[1][1] = 1`, `prefY[1][1] = 0` → not counted.
3. Process cell (1,2) `'Y'`:
   - `prefX[1][2] = 1`, `prefY[1][2] = 1` → equal and >0, count 1.
4. Process cell (2,1) `'Y'`:
   - `prefX[2][1] = 1`, `prefY[2][1] = 1` → count 2.
5. Process cell (2,2) `'X'`:
   - `prefX[2][2] = 2`, `prefY[2][2] = 2` → count 3.

All three qualifying submatrices are `(0,0)-(0,1)`, `(0,0)-(1,0)`, and `(0,0)-(1,1)`. The function returns `3`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) — single pass to build prefix sums |
| **Space** | O(m × n) — two prefix‑sum matrices |

---

## Follow-Up Questions

- How would you modify the solution to count submatrices anchored at any arbitrary top‑left corner, not just `(0,0)`?
- Can the space usage be reduced to O(n) by processing rows one at a time?
- What changes are needed if the condition becomes `countX = k * countY` for a given integer `k`?

---

## Key Takeaway

> **When submatrices share a fixed anchor, 2‑D prefix sums give constant‑time queries for each possible bottom‑right corner. Comparing separate prefix sums for each character type yields the desired count efficiently.**