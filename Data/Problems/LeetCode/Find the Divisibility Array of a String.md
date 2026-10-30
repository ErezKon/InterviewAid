# 2575. Find the Divisibility Array of a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-divisibility-array-of-a-string](https://leetcode.com/problems/find-the-divisibility-array-of-a-string)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Running Modulo — O(n) ✅](#4-approach-running-modulo--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** string `word` of length `n` consisting of digits, and a positive integer `m`.

The **divisibility array** `div` of `word` is an integer array of length `n` such that:

- `div[i] = 1` if the **numeric value** of `word[0,...,i]` is divisible by `m`, or
- `div[i] = 0` otherwise.

Return *the divisibility array of* `word`.

**Constraints:**
- `1 <= n <= 10⁵`
- `word.length == n`
- `word` consists of digits from `0` to `9`
- `1 <= m <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: word = "998244353", m = 3
  Output: [1,1,0,0,0,1,1,0,0]
  Explanation: There are only 4 prefixes that are divisible by 3: "9", "99", "998244", and "9982443".

Example 2:
  Input: word = "1010", m = 10
  Output: [0,1,0,1]
  Explanation: There are only 2 prefixes that are divisible by 10: "10", and "1010".
```

---

## 3. Key Insight

> Maintain a running remainder: `rem = (rem * 10 + digit) % m`. This avoids working with huge numbers. If `rem == 0`, the prefix is divisible by `m`.

---

## 4. Approach: Running Modulo — O(n) ✅

```
FUNCTION divisibilityArray(word, m):
    result ← []
    rem ← 0
    FOR ch IN word DO
        rem ← (rem * 10 + INT(ch)) MOD m
        result.ADD(1 IF rem == 0 ELSE 0)
    RETURN result
```

---

## 5. Walkthrough

```
word = "998244353", m = 3

rem=0: (0*10+9)%3 = 0 → 1
rem=0: (0*10+9)%3 = 0 → 1
rem=0: (0*10+8)%3 = 2 → 0
rem=2: (2*10+2)%3 = 1 → 0
rem=1: (1*10+4)%3 = 2 → 0
rem=2: (2*10+4)%3 = 0 → 1
rem=0: (0*10+3)%3 = 0 → 1
rem=0: (0*10+5)%3 = 2 → 0
rem=2: (2*10+3)%3 = 2 → 0

Result: [1,1,0,0,0,1,1,0,0] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(1) — excluding output |

---

## 7. Key Takeaway

> **Running modulo** (`rem = (rem * 10 + digit) % m`) lets you check divisibility of arbitrarily large prefix numbers without ever storing the full number. This is a fundamental modular arithmetic technique.
