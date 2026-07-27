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

```
FUNCTION beautifulPartitions(s, k, minLength):
    MOD = 10^9 + 7
    isPrime = {2, 3, 5, 7}

    IF s[0] not prime OR s[-1] is prime: RETURN 0

    // Find valid cut positions
    cuts = [i for i where s[i-1] non-prime AND s[i] prime AND i >= minLength]

    // dp[j] = ways to partition first portion into j parts
    // Use prefix sums to optimize transitions
    dp = 2D array, dp[0][0] = 1
    FOR j ← 1 TO k:
        prefix = 0
        FOR each valid cut position i:
            prefix = (prefix + dp[j-1][prev valid pos]) % MOD
            dp[j][i] = prefix

    RETURN dp[k][n]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · k) |
| **Space** | O(n · k) |

---

## 5. Key Takeaway

> **DP on valid cut positions with prefix sum optimization.** Only positions where a non-prime meets a prime are valid split points. Prefix sums avoid O(n²) inner loops.
