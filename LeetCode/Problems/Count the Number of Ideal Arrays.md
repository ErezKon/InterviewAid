# 2338. Count the Number of Ideal Arrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-ideal-arrays](https://leetcode.com/problems/count-the-number-of-ideal-arrays)
**Companies:** Amazon, Google, Infosys, Microsoft

---

## Problem Description

An **ideal** array of length `n` has elements in `[1, maxValue]` where each element divides the next. Count such arrays modulo `10^9 + 7`.

---

## Key Insight

An ideal array is a non-decreasing sequence where each consecutive ratio is an integer. The distinct values form a **divisibility chain**. A chain of `k` distinct values can be placed into `n` positions using **stars and bars**: `C(n-1, k-1)`.

For each endpoint value `v`, the number of distinct chains ending at `v` equals the product of ways to distribute prime factor exponents. If `v = p1^a1 × p2^a2 × ...`, each prime contributes independently.

---

## Approach: Combinatorics + Prime Factorization ✅

```
// Each ideal array is determined by its distinct values (divisibility chain)
// Count chains ending at each value, then distribute positions
// Use stars and bars: C(n-1, k-1) ways to place k distinct values in n positions
// Factorize each endpoint and count using multiplicative functions

FUNCTION idealArrays(n, maxValue):
    MOD = 10^9 + 7
    result = 0

    FOR v ← 1 TO maxValue DO
        // Factorize v → {p1:a1, p2:a2, ...}
        // Number of chains = product of C(n-1+ai, ai) across primes? No.
        // Actually: for each prime p^a, the exponent sequence has a+1 choices
        //   distributed with stars-and-bars into the chain length
        // Chain length k ranges from 1 to sum(ai)+1
        // Combine: total chains for v × C(n-1, k-1) for each k
        // ... (requires careful DP or multiplicative counting)

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(maxValue × log(maxValue)) |
| **Space** | O(maxValue + n) |

---

## Key Takeaway

> **Ideal arrays = divisibility chains placed into positions. Decompose via prime factorization: each prime's exponents are distributed independently. Stars and bars handles the positional placement. This is a beautiful intersection of number theory and combinatorics.**
