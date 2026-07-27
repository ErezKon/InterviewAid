# 1155. Number of Dice Rolls With Target Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-dice-rolls-with-target-sum](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum)
**Companies:** Amazon, Citadel, Coindcx, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n · target · k)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` dice each with `k` faces (1..k), count the number of ways to roll a sum equal to `target`. Return modulo 10⁹+7.

---

## 2. Key Insight

> Classic bounded knapsack / coin change variant. `dp[t]` = ways to reach sum `t` using dice rolled so far. For each new die, try all faces 1..k.

---

## 3. Approach: DP — O(n · target · k) ✅

```
FUNCTION numRollsToTarget(n, k, target):
    MOD = 10^9 + 7
    dp = [0] * (target + 1)
    dp[0] = 1

    FOR die ← 1 TO n:
        newDp = [0] * (target + 1)
        FOR t ← 1 TO target:
            FOR face ← 1 TO MIN(k, t):
                newDp[t] = (newDp[t] + dp[t - face]) % MOD
        dp = newDp

    RETURN dp[target]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · target · k) |
| **Space** | O(target) — rolling array |

---

## 5. Key Takeaway

> **Bounded knapsack DP.** Each die adds one item with value 1..k. Rolling array optimization: only keep previous die's DP row. Can further optimize inner loop with prefix sums.
