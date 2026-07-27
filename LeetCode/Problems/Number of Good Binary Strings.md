# 2533. Number of Good Binary Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-good-binary-strings](https://leetcode.com/problems/number-of-good-binary-strings)
**Companies:** Expedia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(maxLength)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count binary strings of length in `[minLength, maxLength]` where every block of consecutive `0`s has length divisible by `oneGroup` and every block of `1`s has length divisible by `zeroGroup`.

---

## 2. Key Insight

> DP on string length. `dp[i]` = number of valid strings of length `i`. At each position, either append `zeroGroup` zeros or `oneGroup` ones.

---

## 3. Approach: DP — O(maxLength) ✅

```
FUNCTION goodBinaryStrings(minLength, maxLength, oneGroup, zeroGroup):
    MOD = 10^9 + 7
    dp = [0] * (maxLength + 1)
    dp[0] = 1
    FOR i ← 1 TO maxLength:
        IF i >= zeroGroup: dp[i] = (dp[i] + dp[i - zeroGroup]) % MOD
        IF i >= oneGroup: dp[i] = (dp[i] + dp[i - oneGroup]) % MOD
    RETURN SUM(dp[minLength:maxLength+1]) % MOD
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(maxLength) |
| **Space** | O(maxLength) |

---

## 5. Key Takeaway

> **Coin change DP variant.** Treat `zeroGroup` and `oneGroup` as "coins" — each step appends a block. Sum dp values in the valid length range.
