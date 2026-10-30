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

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given four integers `minLength`, `maxLength`, `oneGroup` and `zeroGroup`.

A binary string is **good** if it satisfies the following conditions:

- The length of the string is in the range `[minLength, maxLength]`.
- The size of each block of consecutive `1`'s is a multiple of `oneGroup`.

- For example in a binary string `00110111100` sizes of each block of consecutive ones are `[2,4]`.

- The size of each block of consecutive `0`'s is a multiple of `zeroGroup`.

- For example, in a binary string `00110111100` sizes of each block of consecutive zeros are `[2,1,2]`.

Return *the number of **good** binary strings*. Since the answer may be too large, return it **modulo** `10^9 + 7`.

**Note** that `0` is considered a multiple of all the numbers.

**Constraints:**
- `1 <= minLength <= maxLength <= 10^5`
- `1 <= oneGroup, zeroGroup <= maxLength`

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

**Example 1:**
```
Input: minLength = 2, maxLength = 3, oneGroup = 1, zeroGroup = 2
Output: 5
Explanation: There are 5 good binary strings in this example: "00", "11", "001", "100", and "111".
It can be proven that there are only 5 good strings satisfying all conditions.
```

**Example 2:**
```
Input: minLength = 4, maxLength = 4, oneGroup = 4, zeroGroup = 3
Output: 1
Explanation: There is only 1 good binary string in this example: "1111".
It can be proven that there is only 1 good string satisfying all conditions.
```

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
