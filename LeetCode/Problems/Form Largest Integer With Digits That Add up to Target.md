# 1449. Form Largest Integer With Digits That Add up to Target

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target](https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: DP — O(target · 9) ✅](#3-approach-dp--otarget--9-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given costs for digits 1-9 (`cost[i]` = cost to use digit `i+1`) and a target, form the largest integer whose digit costs sum to exactly `target`. Return as a string, or "0" if impossible.

**Constraints:**
- `1 <= target <= 5000`

---

## 2. Examples

| cost | target | Output |
|------|--------|--------|
| [4,3,2,5,6,7,2,5,5] | 9 | "7772" |
| [2,4,6,2,4,6,4,4,4] | 5 | "0" |
| [6,10,15,40,40,40,40,40,40] | 47 | "32211" |

---

## 3. Approach: DP — O(target · 9) ✅

```text
FUNCTION largestNumber(cost, target):
    dp ← [-∞] * (target + 1); dp[0] ← 0
    FOR t ← 1 TO target DO
        FOR d ← 0 TO 8 DO
            IF t >= cost[d] THEN
                dp[t] ← MAX(dp[t], dp[t - cost[d]] + 1)
    IF dp[target] < 0 THEN RETURN "0"
    // Reconstruct: pick largest digit that preserves max length
    result ← ""
    t ← target
    WHILE t > 0 DO
        FOR d ← 8 DOWNTO 0 DO
            IF t >= cost[d] AND dp[t] == dp[t - cost[d]] + 1 THEN
                result += STRING(d + 1)
                t -= cost[d]
                BREAK
    RETURN result
```

---

## 4. Walkthrough

Consider `cost = [4,3,2,5,6,7,2,5,5]` and `target = 9`.

1. DP fills `dp[9] = 4` (maximum 4 digits achievable).
2. Reconstruction starts with `t = 9`.
   - Check digits from 9 down to 1. Digit 7 (index 6) has cost 2 and `dp[9] == dp[7] + 1`, so append "7", `t = 7`.
   - Repeat: another "7" (t=5), another "7" (t=3).
   - Finally digit 2 (index 1) cost 3 fits, append "2", `t = 0`.
Resulting string: "7772" – the largest possible number.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(target · 9) |
| **Space** | O(target) |

---

## 6. Follow-Up Questions

1. How would you adapt the solution if digit costs could be negative?
2. Can you extend the approach to return the smallest number instead of the largest?
3. What if you need to limit the total number of digits used?

---

## 7. Key Takeaway

> **Maximize digit count first** (longest number wins), then greedily pick the largest digit during reconstruction. Classic unbounded knapsack variant.
