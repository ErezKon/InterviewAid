# 1449. Form Largest Integer With Digits That Add up to Target

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target](https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(target · 9) ✅](#3-approach-dp--otarget--9-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given costs for digits 1-9 (`cost[i]` = cost to use digit `i+1`) and a target, form the largest integer whose digit costs sum to exactly `target`. Return as a string, or "0" if impossible.

**Constraints:**
- `1 <= target <= 5000`

---

## 2. Key Insight

> Maximize the number of digits first (longest number is always larger), then among same-length numbers, prefer larger digits. Use DP where `dp[t]` = max number of digits achievable with budget `t`.

---

## 3. Approach: DP — O(target · 9) ✅

```
FUNCTION largestNumber(cost, target):
    dp ← [-∞] * (target + 1); dp[0] ← 0

    FOR t ← 1 TO target DO
        FOR d ← 0 TO 8 DO
            IF t >= cost[d] THEN
                dp[t] ← MAX(dp[t], dp[t - cost[d]] + 1)

    IF dp[target] < 0 THEN RETURN "0"

    // Reconstruct: greedily pick largest digit at each step
    result ← ""
    t ← target
    WHILE t > 0 DO
        FOR d ← 8 DOWNTO 0 DO
            IF t >= cost[d] AND dp[t] == dp[t - cost[d]] + 1 THEN
                result += str(d + 1)
                t -= cost[d]
                BREAK

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(target · 9) |
| **Space** | O(target) |

---

## 5. Key Takeaway

> **Maximize digit count first** (longest number wins), then greedily pick the largest digit during reconstruction. Classic unbounded knapsack variant.
