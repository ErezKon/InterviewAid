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

Partition string `s` into `k` substrings, each of length ≥ `minLength`, where each substring starts with a prime digit and ends with a non-prime digit. Count the number of valid partitions mod 10⁹+7.

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

**Example 1:**
```
Input: s = "2357", k = 2, minLength = 2
Output: 1
Explanation: Only partition "23|57" satisfies all conditions.
```

**Example 2:**
```
Input: s = "12345", k = 3, minLength = 1
Output: 2
Explanation: Valid partitions are "1|2|345" and "12|3|45".
```

---

## 5. Walkthrough

Consider `s = "2357"`, `k = 2`, `minLength = 2`.
| Step | Action | dp state (part=1) | dp state (part=2) |
|------|--------|-------------------|-------------------|
| 0    | init   | dp[0][0]=1        | - |
| 1‑2  | no cut (positions 1,2 not valid) | 0 | 0 |
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

- How would the solution change if the partition must start and end with the same type of digit (both prime or both non‑prime)?
- Can the algorithm be adapted to return the actual partitions, not just the count?

---

## 5. Key Takeaway

> **DP on valid cut positions with prefix sum optimization.** Only positions where a non‑prime meets a prime are valid split points. Prefix sums avoid O(n²) inner loops.
