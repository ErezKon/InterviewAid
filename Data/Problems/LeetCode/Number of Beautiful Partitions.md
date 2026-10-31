# 2478. Number of Beautiful Partitions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-beautiful-partitions](https://leetcode.com/problems/number-of-beautiful-partitions)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n · k)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You are given a string `s` that consists of the digits `'1'` to `'9'` and two integers `k` and `minLength`.

A partition of `s` is called **beautiful** if:

- `s` is partitioned into `k` non-intersecting substrings.
- Each substring has a length of **at least** `minLength`.
- Each substring starts with a **prime** digit and ends with a **non-prime** digit. Prime digits are `'2'`, `'3'`, `'5'`, and `'7'`, and the rest of the digits are non-prime.

Return *the number of **beautiful** partitions of* `s`. Since the answer may be very large, return it **modulo** `10⁹ + 7`.

A **substring** is a contiguous sequence of characters within a string.

**Constraints:**

- `1 <= k, minLength <= s.length <= 1000`
- `s` consists of the digits `'1'` to `'9'`.

---

## 2. Key Insight

> A cut can only occur at position `i` where `s[i-1]` is non-prime and `s[i]` is prime. Use DP: `dp[j]` = number of ways to partition the first `i` characters into `j` parts. Optimize with prefix sums over valid cut positions.

---

## 3. Approach: DP — O(n · k) ✅

```text
FUNCTION beautifulPartitions(s, k, minLength):
    MOD ← 10^9 + 7
    primeDigits ← {2, 3, 5, 7}

    IF s[0] NOT IN primeDigits OR s[-1] IN primeDigits:
        RETURN 0

    // collect valid cut indices
    cuts ← []
    FOR i FROM 1 TO LENGTH(s)-1:
        IF s[i-1] NOT IN primeDigits AND s[i] IN primeDigits AND i >= minLength:
            APPEND i TO cuts

    // dp[j][i] = ways to cut up to position i using j parts
    dp ← 2D ARRAY (k+1) × (LENGTH(s)+1) FILLED WITH 0
    dp[0][0] ← 1
    FOR part FROM 1 TO k:
        prefix ← 0
        cutIdx ← 0
        FOR i FROM 0 TO LENGTH(s):
            WHILE cutIdx < LENGTH(cuts) AND cuts[cutIdx] ≤ i:
                prefix ← (prefix + dp[part-1][cuts[cutIdx]]) MOD MOD
                cutIdx ← cutIdx + 1
            dp[part][i] ← prefix
    RETURN dp[k][LENGTH(s)] MOD MOD
```

---

## 4. Examples

```
Example 1:
  Input: s = "23542185131", k = 3, minLength = 2
  Output: 3
  Explanation: There exists three ways to create a beautiful partition:
  "2354 | 218 | 5131"
  "2354 | 21851 | 31"
  "2354218 | 51 | 31"
```

```
Example 2:
  Input: s = "23542185131", k = 3, minLength = 3
  Output: 1
  Explanation: There exists one way to create a beautiful partition: "2354 | 218 | 5131".
```

```
Example 3:
  Input: s = "3312958", k = 3, minLength = 1
  Output: 1
  Explanation: There exists one way to create a beautiful partition: "331 | 29 | 58".
```

---

## 5. Walkthrough

Consider `s = "2357"`, `k = 2`, `minLength = 2`.
| Step | Action | dp state (part=1) | dp state (part=2) |
|------|--------|-------------------|-------------------|
| 0    | init   | dp[0][0]=1        | - |
| 1-2  | no cut (positions 1,2 not valid) | 0 | 0 |
| 3    | cut at index 2 ("23|57") | dp[1][2]=1 | dp[2][4]=1 |
Result: dp[2][4] = 1.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · k) |
| **Space** | O(n · k) |

---

## 7. Follow-Up Questions

- How would the solution change if the partition must start and end with the same type of digit (both prime or both non-prime)?
- Can the algorithm be adapted to return the actual partitions, not just the count?

---

## 5. Key Takeaway

> **DP on valid cut positions with prefix sum optimization.** Only positions where a non-prime meets a prime are valid split points. Prefix sums avoid O(n²) inner loops.
