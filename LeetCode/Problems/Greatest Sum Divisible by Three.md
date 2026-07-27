# 1262. Greatest Sum Divisible by Three

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/greatest-sum-divisible-by-three](https://leetcode.com/problems/greatest-sum-divisible-by-three)
**Companies:** Amazon, Bloomberg, De Shaw, Goldman Sachs, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP on Remainders — O(n) ✅](#3-approach-dp-on-remainders--on-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Find the maximum sum of elements in the array that is divisible by 3.

---

## 2. Key Insight

> Track the best achievable sum for each remainder mod 3 (`dp[0]`, `dp[1]`, `dp[2]`). For each number, update all three remainder states.

---

## 3. Approach: DP on Remainders — O(n) ✅

```
FUNCTION maxSumDivThree(nums):
    dp = [0, -infinity, -infinity]    // best sum with remainder 0, 1, 2

    FOR num IN nums:
        temp = dp.copy()
        FOR i ← 0 TO 2:
            newRem = (i + num) % 3
            temp[newRem] = MAX(temp[newRem], dp[i] + num)
        dp = temp

    RETURN dp[0]
```

---

## 4. Key Takeaway

> **DP on remainder mod k** — only 3 states needed. Classic pattern for "max/min sum divisible by k".
