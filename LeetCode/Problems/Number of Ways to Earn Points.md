# 2585. Number of Ways to Earn Points

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-earn-points](https://leetcode.com/problems/number-of-ways-to-earn-points)
**Companies:** Tusimple

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bounded Knapsack DP — O(n · target · maxCount)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given question types with counts and marks, count ways to earn exactly `target` points. Return mod 10⁹+7.

---

## 2. Key Insight

> Bounded knapsack: for each type, choose 0 to `count[i]` questions worth `marks[i]` each. DP on total points.

---

## 3. Approach: Bounded Knapsack DP — O(n · target · maxCount) ✅

```
FUNCTION waysToReachTarget(target, types):
    MOD = 10^9 + 7
    dp = [0] * (target + 1); dp[0] = 1
    FOR [count, marks] IN types:
        FOR j ← target DOWNTO 0:
            FOR k ← 1 TO count:
                IF j + k * marks <= target:
                    dp[j + k * marks] = (dp[j + k * marks] + dp[j]) % MOD
    RETURN dp[target]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · target · maxCount) |
| **Space** | O(target) |

---

## 5. Key Takeaway

> **Bounded knapsack variant.** For each type, iterate possible counts (0 to count). Process in reverse to avoid reuse within same type.
