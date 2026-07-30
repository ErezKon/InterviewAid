# 3797. Count Routes to Climb a Rectangular Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-routes-to-climb-a-rectangular-grid](https://leetcode.com/problems/count-routes-to-climb-a-rectangular-grid)
**Companies:** Microsoft

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

Count the number of distinct routes to traverse a rectangular grid from the bottom-left corner to the top-right corner following specific movement rules. Return the answer modulo `10^9 + 7`.

**Constraints:**
- Grid dimensions can be large, requiring efficient DP or combinatorial approaches.

---

## Examples

**Example 1:**
```
Input: m = 2, n = 3
Output: 3
Explanation: The three possible routes are:
1. Right → Right → Up
2. Right → Up → Right
3. Up → Right → Right
```

**Example 2:**
```
Input: m = 3, n = 3
Output: 6
Explanation: All permutations of two rights and two ups (C(4,2) = 6).
```

---

## Key Insight

This is a grid path‑counting problem. Depending on the allowed moves, it may reduce to combinatorics (choosing right vs. up moves) or require DP if moves are non‑standard. For a standard right/up grid, the answer is `C(m+n-2, m-1)`.

---

## Approach

```text
FUNCTION countRoutes(m, n):
    MOD ← 10^9 + 7
    // If only right and up moves are allowed, use combinatorial formula
    RETURN binomialCoefficient(m + n - 2, m - 1) MOD MOD

    // For more complex move sets, use DP:
    // dp[r][c] = number of ways to reach cell (r, c)
    // dp[0][0] ← 1
    // FOR r ← 0 TO m-1:
    //     FOR c ← 0 TO n-1:
    //         IF (r, c) is not start:
    //             dp[r][c] ← sum of dp[prev] for all valid previous cells
    // RETURN dp[m-1][n-1] MOD MOD
```

---

## Walkthrough

Consider **Example 1** with `m = 2` and `n = 3`.

| Step | Position (row, col) | Moves taken | Ways to reach |
|------|---------------------|-------------|---------------|
| 1    | (0,0)               | –           | 1             |
| 2    | (0,1)               | Right       | 1             |
| 3    | (0,2)               | Right       | 1             |
| 4    | (1,2)               | Up          | 1             |
| 5    | (1,1)               | Up then Right| 1            |
| 6    | (1,0)               | Right then Up| 1            |

All three distinct sequences (RRU, RUR, URR) are captured, giving the output `3`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) for combinatorial formula, O(m × n) for DP |
| **Space** | O(1) for formula, O(n) with row‑wise DP |

---

## Follow-Up Questions

1. How would the solution change if diagonal moves are also allowed?
2. What if certain cells are blocked and cannot be visited?
3. Can the problem be extended to 3‑dimensional grids?

---

## Key Takeaway

> **Grid path counting with restricted moves is either a combinatorial formula (for right/up only) or standard DP (for complex move sets). Always check if the problem reduces to a binomial coefficient first.**