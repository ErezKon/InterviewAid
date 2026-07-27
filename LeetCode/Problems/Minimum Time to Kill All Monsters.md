# 2403. Minimum Time to Kill All Monsters

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-kill-all-monsters](https://leetcode.com/problems/minimum-time-to-kill-all-monsters)
**Companies:** Trilogy

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask DP — O(n · 2ⁿ)](#3-approach-bitmask-dp--on--2ⁿ)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` monsters with power levels, your damage increases after each kill (damage = number killed + 1). Time to kill monster `i` = `⌈power[i] / damage⌉`. Return the **minimum** total time.

**Constraints:**
- `1 <= n <= 17`

---

## 2. Key Insight

> Kill order matters because damage grows. With `n ≤ 17`, use **bitmask DP**: `dp[mask]` = min time to kill the monsters in `mask`. When `popcount(mask) = k`, damage = `k + 1` for the next kill.

---

## 3. Approach: Bitmask DP — O(n · 2ⁿ) ✅

```
FUNCTION minimumTime(power):
    n = len(power)
    dp = [infinity] * (1 << n)
    dp[0] = 0

    FOR mask ← 0 TO (1 << n) - 1:
        killed = popcount(mask)
        damage = killed + 1
        FOR i ← 0 TO n - 1:
            IF mask & (1 << i): CONTINUE
            time = CEIL(power[i] / damage)
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

> **Bitmask DP for order-dependent optimization.** When the cost of each action depends on how many prior actions have been taken, and n is small, bitmask DP enumerates all orderings efficiently.
