# 2801. Count Stepping Numbers in Range

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-stepping-numbers-in-range](https://leetcode.com/problems/count-stepping-numbers-in-range)
**Companies:** Amazon, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A stepping number has the property that each pair of adjacent digits differs by exactly 1. Given two integers `low` and `high` as strings, return the count of stepping numbers in `[low, high]` inclusive, modulo `10^9 + 7`.

**Constraints:**
- `1 <= low.length, high.length <= 100`

---

## Key Insight

Use **Digit DP** with `count(high) - count(low - 1)`. State: `(position, last_digit, is_tight, is_started)`. At each position, try digits where `|digit - last_digit| == 1` (or any digit if not started yet).

---

## Approach

```
FUNCTION countSteppingNumbers(low, high):
    MOD = 10^9 + 7
    RETURN (digitDP(high) - digitDP(decrementString(low)) + MOD) % MOD

FUNCTION digitDP(num_str):
    MEMO = {}
    FUNCTION dp(pos, lastDigit, tight, started):
        IF pos == LENGTH(num_str): RETURN 1 IF started ELSE 0
        IF (pos, lastDigit, tight, started) IN MEMO: RETURN MEMO[...]

        limit = INT(num_str[pos]) IF tight ELSE 9
        result = 0
        FOR d ← 0 TO limit DO
            newTight = tight AND (d == limit)
            IF NOT started:
                IF d == 0: result += dp(pos+1, -1, newTight, false)
                ELSE: result += dp(pos+1, d, newTight, true)
            ELSE:
                IF ABS(d - lastDigit) == 1:
                    result += dp(pos+1, d, newTight, true)
        MEMO[...] = result % MOD
        RETURN result % MOD

    RETURN dp(0, -1, true, false)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(L × 10 × 2 × 2 × 10) where L = number of digits |
| **Space** | O(L × 10 × 2 × 2) for memoization |

---

## Key Takeaway

> **Digit DP is the standard approach for counting numbers with digit-level constraints in a range. Track `(position, last_digit, tight_bound, has_started)` and enumerate valid next digits.**
