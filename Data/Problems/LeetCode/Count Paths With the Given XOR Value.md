# 3393. Count Paths With the Given XOR Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-paths-with-the-given-xor-value](https://leetcode.com/problems/count-paths-with-the-given-xor-value)
**Companies:** Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a 2D integer array `grid` with size `m x n`. You are also given an integer `k`.

Your task is to calculate the number of paths you can take from the top-left cell `(0, 0)` to the bottom-right cell `(m - 1, n - 1)` satisfying the following **constraints**:

- You can either move to the right or down. Formally, from the cell `(i, j)` you may move to the cell `(i, j + 1)` or to the cell `(i + 1, j)` if the target cell *exists*.
- The `XOR` of all the numbers on the path must be **equal** to `k`.

Return the total number of such paths.

Since the answer can be very large, return the result **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= m == grid.length <= 300`
- `1 <= n == grid[r].length <= 300`
- `0 <= grid[r][c] < 16`
- `0 <= k < 16`

---

## Examples

**Example 1:**
```
Input: grid = [[2, 1, 5], [7, 10, 0], [12, 6, 4]], k = 11
Output: 3
Explanation: The 3 paths are:
- (0, 0) → (1, 0) → (2, 0) → (2, 1) → (2, 2)
- (0, 0) → (1, 0) → (1, 1) → (1, 2) → (2, 2)
- (0, 0) → (0, 1) → (1, 1) → (2, 1) → (2, 2)
```

**Example 2:**
```
Input: grid = [[1, 3, 3, 3], [0, 3, 3, 2], [3, 0, 1, 1]], k = 2
Output: 5
Explanation: The 5 paths are:
- (0, 0) → (1, 0) → (2, 0) → (2, 1) → (2, 2) → (2, 3)
- (0, 0) → (1, 0) → (1, 1) → (2, 1) → (2, 2) → (2, 3)
- (0, 0) → (1, 0) → (1, 1) → (1, 2) → (1, 3) → (2, 3)
- (0, 0) → (0, 1) → (1, 1) → (1, 2) → (2, 2) → (2, 3)
- (0, 0) → (0, 1) → (0, 2) → (1, 2) → (2, 2) → (2, 3)
```

**Example 3:**
```
Input: grid = [[1, 1, 1, 2], [3, 0, 3, 2], [3, 0, 2, 2]], k = 10
Output: 0
```

---

## Key Insight

Use DP with state `(row, col, currentXOR)`. Since `k ≤ 15`, the XOR value fits in 4 bits (max value 15). Define `dp[i][j][x]` = number of paths from `(0,0)` to `(i,j)` with XOR value `x`.

---

## Approach

```
FUNCTION countPathsWithXOR(grid, k):
    MOD = 10^9 + 7
    m, n = DIMENSIONS(grid)
    maxXOR = 16   // since k ≤ 15

    dp = 3D array [m][n][maxXOR], initialized to 0
    dp[0][0][grid[0][0] % maxXOR] = 1

    FOR i ← 0 TO m - 1 DO
        FOR j ← 0 TO n - 1 DO
            FOR x ← 0 TO maxXOR - 1 DO
                IF dp[i][j][x] > 0 THEN
                    newX_down = x XOR grid[i+1][j] IF i+1 < m
                    newX_right = x XOR grid[i][j+1] IF j+1 < n
                    dp[i+1][j][newX_down] += dp[i][j][x]
                    dp[i][j+1][newX_right] += dp[i][j][x]

    RETURN dp[m-1][n-1][k]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n × 16) |
| **Space** | O(m × n × 16), reducible to O(n × 16) with row optimization |

---

## Key Takeaway

> **Grid path counting with XOR constraints uses 3D DP where the third dimension tracks the running XOR. The small range of k (≤ 15) keeps the state space manageable.**
