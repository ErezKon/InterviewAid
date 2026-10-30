# 3418. Maximum Amount of Money Robot Can Earn

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-amount-of-money-robot-can-earn](https://leetcode.com/problems/maximum-amount-of-money-robot-can-earn)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Phonepe

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: 3D Grid DP — O(m·n·k)](#approach-3d-grid-dp--omn-k-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an `m x n` grid. A robot starts at the top-left corner of the grid `(0, 0)` and wants to reach the bottom-right corner `(m - 1, n - 1)`. The robot can move either right or down at any point in time.

The grid contains a value `coins[i][j]` in each cell:

- If `coins[i][j] >= 0`, the robot gains that many coins.
- If `coins[i][j] < 0`, the robot encounters a robber, and the robber steals the **absolute** value of `coins[i][j]` coins.

The robot has a special ability to **neutralize robbers** in at most **2 cells** on its path, preventing them from stealing coins in those cells.

**Note:** The robot's total coins can be negative.

Return the **maximum** profit the robot can gain on the route.

**Constraints:**
- `m == coins.length`
- `n == coins[i].length`
- `1 <= m, n <= 500`
- `-1000 <= coins[i][j] <= 1000`

---

## Examples

**Example 1:**
```
Input: coins = [[0,1,-1],[1,-2,3],[2,-3,4]]
Output: 8
Explanation: An optimal path for maximum coins is:
- Start at (0, 0) with 0 coins (total coins = 0).
- Move to (0, 1), gaining 1 coin (total coins = 0 + 1 = 1).
- Move to (1, 1), where there's a robber stealing 2 coins. The robot uses one neutralization here, avoiding the robbery (total coins = 1).
- Move to (1, 2), gaining 3 coins (total coins = 1 + 3 = 4).
- Move to (2, 2), gaining 4 coins (total coins = 4 + 4 = 8).
```

**Example 2:**
```
Input: coins = [[10,10,10],[10,10,10]]
Output: 40
Explanation: An optimal path for maximum coins is:
- Start at (0, 0) with 10 coins (total coins = 10).
- Move to (0, 1), gaining 10 coins (total coins = 10 + 10 = 20).
- Move to (0, 2), gaining another 10 coins (total coins = 20 + 10 = 30).
- Move to (1, 2), gaining the final 10 coins (total coins = 30 + 10 = 40).
```

---

## Key Insight

> Standard grid DP with an extra dimension for neutralization count. `dp[r][c][k]` = max money reaching (r,c) having used `k` neutralizations so far. At each cell, choose to take the value or neutralize it (only if negative and k < 2).

---

## Approach: 3D Grid DP — O(m·n·k) ✅

```text
FUNCTION maximumAmount(coins):
    m, n ← dimensions of coins
    dp ← 3‑D array of size m × n × 3 initialized to -infinity
    dp[0][0][0] ← coins[0][0]
    IF coins[0][0] < 0:
        dp[0][0][1] ← 0   // neutralize first cell

    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            FOR k ← 0 TO 2:
                IF dp[r][c][k] == -infinity: CONTINUE
                current ← dp[r][c][k]
                FOR (nr, nc) IN [(r+1, c), (r, c+1)]:
                    IF nr < m AND nc < n:
                        // Take the coin value
                        dp[nr][nc][k] ← MAX(dp[nr][nc][k], current + coins[nr][nc])
                        // Neutralize if negative and have uses left
                        IF coins[nr][nc] < 0 AND k < 2:
                            dp[nr][nc][k+1] ← MAX(dp[nr][nc][k+1], current)

    RETURN MAX(dp[m-1][n-1][0], dp[m-1][n-1][1], dp[m-1][n-1][2])
```

---

## Walkthrough

Consider the grid `[[5, -3], [2, 4]]` with 2 neutralizations:

| Cell | k=0 (no neutral) | k=1 (one used) | k=2 (two used) |
|------|------------------|----------------|----------------|
| (0,0)=5 | 5 | 0 (neutralize) | - |
| (0,1)=-3 | from (0,0) k=0: 5-3=2 ; from k=1: 0 (neutralize) → 0 | 5 (neutralize) | - |
| (1,0)=2 | from (0,0) k=0: 5+2=7 ; from k=1: 0+2=2 | 5 (neutralize) | - |
| (1,1)=4 | best from above states yields 11 using two neutralizations. |

The DP yields the optimal value `11`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| 3D Grid DP | **O(m·n·3)** = O(m·n) | O(m·n·3) |

---

## Follow-Up Questions

- How would the solution change if the robot could move left or up as well?
- What if the number of neutralizations is not fixed but part of the input?
- Can this be extended to 3‑dimensional grids?

---

## Key Takeaway

> **Grid DP with limited special moves (neutralizations) adds an extra dimension for the count of moves used.** This pattern applies to any path problem with a bounded number of exceptions.
