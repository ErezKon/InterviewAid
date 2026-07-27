# 3418. Maximum Amount of Money Robot Can Earn

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-amount-of-money-robot-can-earn](https://leetcode.com/problems/maximum-amount-of-money-robot-can-earn)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Phonepe

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: 3D Grid DP — O(m·n·k)](#approach-3d-grid-dp--omnk-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A robot moves from `(0,0)` to `(m-1,n-1)` on a grid, only moving right or down. Each cell has a coin value (can be negative — a robber). The robot has **at most 2 neutralizations** to skip negative cells (treat them as 0). Maximize the total coins collected.

**Constraints:**
- `1 ≤ m, n ≤ 500`

---

## Key Insight

> Standard grid DP with an extra dimension for neutralization count. `dp[r][c][k]` = max money reaching (r,c) having used `k` neutralizations so far. At each cell, choose to take the value or neutralize it (only if negative and k < 2).

---

## Approach: 3D Grid DP — O(m·n·k) ✅

```
FUNCTION maximumAmount(coins):
    m, n = dimensions
    dp = m × n × 3 of -infinity
    dp[0][0][0] = coins[0][0]
    IF coins[0][0] < 0: dp[0][0][1] = 0

    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            FOR k ← 0 TO 2:
                IF dp[r][c][k] == -infinity: CONTINUE
                val = dp[r][c][k]
                FOR (nr, nc) IN [(r+1,c), (r,c+1)]:
                    IF nr < m AND nc < n:
                        // Take the coin value
                        dp[nr][nc][k] = MAX(dp[nr][nc][k], val + coins[nr][nc])
                        // Neutralize if negative and have uses left
                        IF coins[nr][nc] < 0 AND k < 2:
                            dp[nr][nc][k+1] = MAX(dp[nr][nc][k+1], val)

    RETURN MAX(dp[m-1][n-1][0], dp[m-1][n-1][1], dp[m-1][n-1][2])
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| 3D Grid DP | **O(m·n·3)** = O(m·n) | O(m·n·3) |

---

## Key Takeaway

> **Grid DP with limited special moves (neutralizations) adds an extra dimension for the count of moves used.** This pattern applies to any path problem with a bounded number of exceptions.
