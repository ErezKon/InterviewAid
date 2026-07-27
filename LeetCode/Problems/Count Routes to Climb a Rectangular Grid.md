# 3797. Count Routes to Climb a Rectangular Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-routes-to-climb-a-rectangular-grid](https://leetcode.com/problems/count-routes-to-climb-a-rectangular-grid)
**Companies:** Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Count the number of distinct routes to traverse a rectangular grid from the bottom-left corner to the top-right corner following specific movement rules. Return the answer modulo `10^9 + 7`.

**Constraints:**
- Grid dimensions can be large, requiring efficient DP or combinatorial approaches.

---

## Key Insight

This is a grid path-counting problem. Depending on the allowed moves, it may reduce to combinatorics (choosing right vs. up moves) or require DP if moves are non-standard. For a standard right/up grid, the answer is `C(m+n-2, m-1)`.

---

## Approach

```
FUNCTION countRoutes(m, n):
    MOD = 10^9 + 7
    // If only right and up moves allowed:
    // Choose (m-1) down moves from (m+n-2) total moves
    RETURN C(m + n - 2, m - 1) % MOD

    // If more complex moves, use DP:
    // dp[r][c] = number of ways to reach (r, c)
    // dp[0][0] = 1
    // dp[r][c] = sum of dp[prev] for all valid previous positions
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) for DP, or O(m + n) for combinatorial |
| **Space** | O(n) with row optimization |

---

## Key Takeaway

> **Grid path counting with restricted moves is either a combinatorial formula (for right/up only) or standard DP (for complex move sets). Always check if the problem reduces to a binomial coefficient first.**
