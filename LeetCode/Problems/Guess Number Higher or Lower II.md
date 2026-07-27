# 375. Guess Number Higher or Lower II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/guess-number-higher-or-lower-ii](https://leetcode.com/problems/guess-number-higher-or-lower-ii)
**Companies:** Bloomberg, Google, Zeta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Interval DP — O(n³) ✅](#3-approach-interval-dp--on-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Guessing game: pick a number 1..n, wrong guesses cost the guessed amount. Find the minimum guaranteed cost to identify the number (minimax).

---

## 2. Key Insight

> Interval DP: `dp[lo][hi]` = min cost to guarantee finding the answer in `[lo, hi]`. For each guess `k`, pay `k` + worst case of left/right subproblem.

---

## 3. Approach: Interval DP — O(n³) ✅

```
FUNCTION getMoneyAmount(n):
    dp = (n+2) × (n+2) zeros
    FOR length ← 2 TO n:
        FOR lo ← 1 TO n - length + 1:
            hi = lo + length - 1
            dp[lo][hi] = infinity
            FOR k ← lo TO hi:
                cost = k + MAX(dp[lo][k-1], dp[k+1][hi])
                dp[lo][hi] = MIN(dp[lo][hi], cost)
    RETURN dp[1][n]
```

---

## 4. Key Takeaway

> **Minimax interval DP**: minimize over guesses `k`, maximize over outcomes (left/right). Classic game theory DP pattern.
