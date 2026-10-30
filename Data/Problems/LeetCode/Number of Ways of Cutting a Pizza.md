# 1444. Number of Ways of Cutting a Pizza

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-of-cutting-a-pizza](https://leetcode.com/problems/number-of-ways-of-cutting-a-pizza)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP + 2D Prefix Sum — O(k·m·n·(m+n))](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a rectangular pizza represented as a `rows x cols` matrix containing the following characters: `'A'` (an apple) and `'.'` (empty cell) and given the integer `k`. You have to cut the pizza into `k` pieces using `k-1` cuts.

For each cut you choose the direction: vertical or horizontal, then you choose a cut position at the cell boundary and cut the pizza into two pieces. If you cut the pizza vertically, give the left part of the pizza to a person. If you cut the pizza horizontally, give the upper part of the pizza to a person. Give the last piece of pizza to the last person.

*Return the number of ways of cutting the pizza such that each piece contains **at least** one apple. *Since the answer can be a huge number, return this modulo 10^9 + 7.

**Constraints:**
- `1 <= rows, cols <= 50`
- `rows == pizza.length`
- `cols == pizza[i].length`
- `1 <= k <= 10`
- `pizza` consists of characters `'A'` and `'.'` only.

---

## 2. Key Insight

> `dp[cuts][r][c]` = ways to cut the subgrid starting at (r,c) into `cuts` remaining pieces. Use suffix sum to quickly check if a piece has apples.

---

## 3. Approach: DP + 2D Prefix Sum — O(k·m·n·(m+n)) ✅

```text
FUNCTION ways(pizza, k):
    MOD ← 1_000_000_007
    // Pre‑compute suffix apple counts for O(1) region queries
    suffix[r][c] ← number of apples in subgrid (r,c) → (m‑1,n‑1)

    dp[cuts][r][c] ← number of ways to cut subgrid (r,c) into `cuts` pieces
    FOR r FROM 0 TO m‑1:
        FOR c FROM 0 TO n‑1:
            dp[1][r][c] ← 1 IF suffix[r][c] > 0 ELSE 0

    FOR cuts FROM 2 TO k:
        FOR r FROM 0 TO m‑1:
            FOR c FROM 0 TO n‑1:
                // Horizontal cuts
                FOR nr FROM r+1 TO m‑1:
                    IF suffix[r][c] - suffix[nr][c] > 0:   // top piece has apple
                        dp[cuts][r][c] ← (dp[cuts][r][c] + dp[cuts‑1][nr][c]) MOD MOD
                // Vertical cuts
                FOR nc FROM c+1 TO n‑1:
                    IF suffix[r][c] - suffix[r][nc] > 0:   // left piece has apple
                        dp[cuts][r][c] ← (dp[cuts][r][c] + dp[cuts‑1][r][nc]) MOD MOD
    RETURN dp[k][0][0]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(k · m · n · (m + n)) |
| **Space** | O(k · m · n) |

---

## Examples

**Example 1:**
```
![img](https://assets.leetcode.com/uploads/2020/04/23/ways_to_cut_apple_1.png)
Input: pizza = ["A..","AAA","..."], k = 3
Output: 3
Explanation: The figure above shows the three ways to cut the pizza. Note that pieces must contain at least one apple.
```

**Example 2:**
```
Input: pizza = ["A..","AA.","..."], k = 3
Output: 1
```

**Example 3:**
```
Input: pizza = ["A..","A..","..."], k = 1
Output: 1
```

---

## Walkthrough

Consider the first example (`pizza = ["A..","AAA","..."]`, `k = 3`).

1. Compute suffix apple counts for every cell.
2. Base case `dp[1][r][c]` is 1 for cells where the sub‑grid has at least one apple.
3. For `cuts = 2`, evaluate all possible horizontal and vertical cuts from each starting cell, adding ways from the remaining sub‑grid.
4. For `cuts = 3`, repeat using results from `cuts = 2`.
5. The final answer is `dp[3][0][0] = 3`.

---

## Follow-Up Questions

1. How would the algorithm change if cuts could be diagonal?
2. Can the solution be optimized to O(k·m·n) using prefix sums more aggressively?
3. What if the pizza grid is extremely large and does not fit in memory?

---

## Key Takeaway

> **DP on sub‑grids + suffix apple sums** lets us enumerate all valid horizontal and vertical cuts efficiently, turning a combinatorial cutting problem into a manageable dynamic programming solution.
