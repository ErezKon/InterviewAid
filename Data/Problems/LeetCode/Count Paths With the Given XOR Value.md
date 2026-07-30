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

Given an `m × n` grid of integers and an integer `k`, count the number of paths from top-left `(0,0)` to bottom-right `(m-1,n-1)` (moving only right or down) such that the XOR of all values along the path equals `k`. Return the answer modulo `10^9 + 7`.

**Constraints:**
- `1 <= m, n <= 300`
- `0 <= grid[i][j] <= 10^6`
- `0 <= k <= 15`

---

## Examples

**Example 1:**
- **Input:** `grid = [[2,1,5],[7,10,0],[12,6,4]], k = 11`
- **Output:** `3`

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
