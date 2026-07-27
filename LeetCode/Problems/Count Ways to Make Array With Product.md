# 1735. Count Ways to Make Array With Product

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-ways-to-make-array-with-product](https://leetcode.com/problems/count-ways-to-make-array-with-product)
**Companies:** Amazon

---

## Problem Description

For each query `[n, k]`, count arrays of length `n` with positive integers whose product is `k`. Return answers modulo `10^9 + 7`.

---

## Key Insight

Factorize `k = p1^a1 × p2^a2 × ...`. For each prime `pi^ai`, distribute `ai` copies among `n` positions using **stars and bars**: `C(ai + n - 1, n - 1)`. The total is the product across all primes, since prime factors are independent.

---

## Approach

```
FUNCTION waysToFillArray(queries):
    MOD = 10^9 + 7
    // Precompute factorials and inverse factorials for combinations

    results = []
    FOR [n, k] IN queries:
        ways = 1
        // Factorize k
        FOR each prime p dividing k:
            a = exponent of p in k
            // Stars and bars: C(a + n - 1, n - 1)
            ways = ways * C(a + n - 1, n - 1) % MOD
        results.ADD(ways)

    RETURN results
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(Q × √k) for factorization per query |
| **Space** | O(max(n + k)) for factorial precomputation |

---

## Key Takeaway

> **Distributing prime factors among array positions: factorize k, then for each prime exponent a, use stars and bars `C(a+n-1, n-1)` to distribute among n slots. Multiply across primes.**
