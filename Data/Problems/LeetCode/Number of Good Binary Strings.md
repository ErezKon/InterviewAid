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

Count binary strings of length in `[minLength, maxLength]` where every block of consecutive `0`s has length divisible by `zeroGroup` and every block of `1`s has length divisible by `oneGroup`.

---

## 2. Key Insight

> DP on string length. `dp[i]` = number of valid strings of length `i`. At each position, either append `zeroGroup` zeros or `oneGroup` ones.

---

## 3. Approach: DP — O(maxLength) ✅

```text
FUNCTION goodBinaryStrings(minLength, maxLength, zeroGroup, oneGroup):
    MOD ← 10^9 + 7
    dp ← ARRAY of size (maxLength + 1) initialized to 0
    dp[0] ← 1
    FOR i ← 1 TO maxLength:
        IF i ≥ zeroGroup:
            dp[i] ← (dp[i] + dp[i - zeroGroup]) % MOD
        IF i ≥ oneGroup:
            dp[i] ← (dp[i] + dp[i - oneGroup]) % MOD
    total ← 0
    FOR i ← minLength TO maxLength:
        total ← (total + dp[i]) % MOD
    RETURN total
```

---

## Examples

**Example 1:** `minLength = 3, maxLength = 3, zeroGroup = 1, oneGroup = 1`

All 8 binary strings of length 3 are valid, so the answer is `8`.

**Example 2:** `minLength = 2, maxLength = 3, zeroGroup = 1, oneGroup = 2`

Valid strings are `00, 11, 001, 110`. The answer is `4`.

---

## Walkthrough

For `minLength = 3, maxLength = 3, zeroGroup = 1, oneGroup = 1`:

| i | dp[i] (ways) |
|---|--------------|
| 0 | 1 (empty) |
| 1 | dp[0] (add 0) + dp[0] (add 1) = 2 |
| 2 | dp[1] + dp[1] = 4 |
| 3 | dp[2] + dp[2] = 8 |

Summing `dp[3]` gives `8`.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(maxLength) |
| **Space** | O(maxLength) |

---

## 5. Key Takeaway

> **Coin change DP variant.** Treat `zeroGroup` and `oneGroup` as "coins" — each step appends a block. Sum dp values in the valid length range.
