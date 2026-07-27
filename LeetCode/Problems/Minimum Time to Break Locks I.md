# 3376. Minimum Time to Break Locks I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-break-locks-i](https://leetcode.com/problems/minimum-time-to-break-locks-i)
**Companies:** Ivp

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask DP — O(n² · 2ⁿ)](#3-approach-bitmask-dp)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` locks with strengths, your sword power starts at `x` and multiplies by `K` after each lock. You must break locks in some order — time to break lock `i` = `⌈strength[i] / power⌉`. Return the **minimum** total time.

**Constraints:**
- `1 <= n <= 8`

---

## 2. Key Insight

> With `n ≤ 8`, enumerate all orderings via **bitmask DP**. `dp[mask]` = min time to break the locks in `mask`. Power depends on number of locks broken = `popcount(mask)`.

---

## 3. Approach: Bitmask DP — O(n² · 2ⁿ) ✅

```
FUNCTION findMinimumTime(strength, K):
    n = len(strength)
    dp = [infinity] * (1 << n)
    dp[0] = 0

    FOR mask ← 0 TO (1 << n) - 1:
        broken = popcount(mask)
        power = K ^ broken  // or x * K^broken depending on problem
        FOR i ← 0 TO n - 1:
            IF mask & (1 << i): CONTINUE  // already broken
            time = CEIL(strength[i] / power)
            newMask = mask | (1 << i)
            dp[newMask] = MIN(dp[newMask], dp[mask] + time)

    RETURN dp[(1 << n) - 1]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 2ⁿ) |
| **Space** | O(2ⁿ) |

---

## 5. Key Takeaway

> **Bitmask DP for small n** — when n ≤ ~20, enumerate subsets with bitmask. The power depends on how many locks are already broken, making it order-dependent and perfect for bitmask DP.
