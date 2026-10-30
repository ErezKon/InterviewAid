# 1987. Number of Unique Good Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-unique-good-subsequences](https://leetcode.com/problems/number-of-unique-good-subsequences)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You are given a binary string `binary`. A **subsequence** of `binary` is considered **good** if it is **not empty** and has **no leading zeros** (with the exception of `"0"`).

Find the number of **unique good subsequences** of `binary`.

- For example, if `binary = "001"`, then all the **good** subsequences are `["0", "0", "1"]`, so the **unique** good subsequences are `"0"` and `"1"`. Note that subsequences `"00"`, `"01"`, and `"001"` are not good because they have leading zeros.

Return *the number of **unique good subsequences** of *`binary`. Since the answer may be very large, return it **modulo** `10^9 + 7`.

A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

**Constraints:**
- `1 <= binary.length <= 10^5`
- `binary` consists of only `'0'`s and `'1'`s.

---

## Examples

**Example 1:**
```
Input: binary = "001"
Output: 2
Explanation: The good subsequences of binary are ["0", "0", "1"].
The unique good subsequences are "0" and "1".
```

**Example 2:**
```
Input: binary = "11"
Output: 2
Explanation: The good subsequences of binary are ["1", "1", "11"].
The unique good subsequences are "1" and "11".
```

**Example 3:**
```
Input: binary = "101"
Output: 5
Explanation: The good subsequences of binary are ["1", "0", "1", "10", "11", "101"].
The unique good subsequences are "0", "1", "10", "11", and "101".
```

---

## 2. Key Insight

> Track `ends0` = unique subsequences ending in '0', `ends1` = ending in '1'. When seeing '0', new `ends0` = `ends0 + ends1` (extend all existing). When seeing '1', new `ends1` = `ends0 + ends1 + 1` (extend all + start new). Handle "0" separately.

---

## 3. Approach: DP — O(n) ✅

```
FUNCTION numberOfUniqueGoodSubsequences(binary):
    MOD = 10^9 + 7
    ends0 = ends1 = 0
    hasZero = false

    FOR c IN binary:
        IF c == '0':
            ends0 = (ends0 + ends1) % MOD
            hasZero = true
        ELSE:
            ends1 = (ends0 + ends1 + 1) % MOD

    RETURN (ends0 + ends1 + (1 if hasZero else 0)) % MOD
```

---

## Walkthrough

Consider `binary = "101"`.

| Index | Char | ends0 | ends1 | hasZero |
|-------|------|------|------|----------|
| 0 | '1' | 0 | (0+0+1)=1 | false |
| 1 | '0' | (0+1)=1 | 1 | true |
| 2 | '1' | 1 | (1+1+1)=3 | true |

Final result = ends0 + ends1 + 1 (for "0") = 1 + 3 + 1 = 5.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Follow-Up Questions

- How would the solution change if leading zeros were allowed?
- Can the approach be extended to count subsequences with a limited number of distinct characters?

---

## 5. Key Takeaway

> **DP on last digit to count unique subsequences.** No leading zeros means subsequences starting with '1'. Track "0" existence separately. Extension logic avoids duplicates.
