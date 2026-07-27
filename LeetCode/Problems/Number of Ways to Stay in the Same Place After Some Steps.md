# 1269. Number of Ways to Stay in the Same Place After Some Steps

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps](https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(steps · min(steps, arrLen))](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Starting at index 0, take exactly `steps` moves (left, right, or stay). Count ways to be back at index 0. Array length `arrLen` bounds movement. Return mod 10⁹+7.

---

## 2. Key Insight

> You can never go further than `steps/2` positions right (must return). Cap the position range at `min(arrLen, steps/2 + 1)`. DP on (remaining steps, current position).

---

## 3. Approach: DP — O(steps · min(steps, arrLen)) ✅

```
FUNCTION numWays(steps, arrLen):
    MOD = 10^9 + 7
    maxPos = MIN(arrLen, steps / 2 + 1)
    dp = [0] * maxPos; dp[0] = 1
    FOR s ← 1 TO steps:
        newDp = [0] * maxPos
        FOR i ← 0 TO maxPos - 1:
            newDp[i] = dp[i]    // stay
            IF i > 0: newDp[i] += dp[i-1]    // from left
            IF i < maxPos - 1: newDp[i] += dp[i+1]    // from right
            newDp[i] %= MOD
        dp = newDp
    RETURN dp[0]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(steps · min(steps, arrLen)) |
| **Space** | O(min(steps, arrLen)) |

---

## 5. Key Takeaway

> **Bound reachable positions by steps/2.** Standard position DP with 3 transitions (left, right, stay). Space optimization via rolling array.
