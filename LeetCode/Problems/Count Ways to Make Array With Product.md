# 1735. Count Ways to Make Array With Product

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-ways-to-make-array-with-product](https://leetcode.com/problems/count-ways-to-make-array-with-product)
**Companies:** Amazon

---

## Problem Description

For each query `[n, k]`, count arrays of length `n` consisting of positive integers whose product equals `k`. Return each answer modulo `10^9 + 7`.

---

## Examples

| Query `[n, k]` | Output |
|---|---|
| `[2, 6]` | `4` |
| `[3, 8]` | `6` |

*Explanation*: For `[2,6]`, the valid arrays are `[1,6]`, `[2,3]`, `[3,2]`, `[6,1]`.

---

## Approach

```
text
FUNCTION waysToFillArray(queries):
    MOD ← 1_000_000_007
    PRECOMPUTE factorials and inverse factorials up to needed range
    results ← []
    FOR each [n, k] IN queries:
        ways ← 1
        FOR each prime p dividing k:
            a ← exponent of p in k
            // Stars and bars: distribute a identical items into n bins
            ways ← ways * COMBINATION(a + n - 1, n - 1) MOD MOD
        APPEND ways TO results
    RETURN results
```

---

## Walkthrough

Consider the query `[2, 6]`.
1. Factorize `k = 6 = 2^1 × 3^1`.
2. For prime `2` with exponent `1`: ways = `C(1 + 2 - 1, 2 - 1) = C(2,1) = 2`.
3. For prime `3` with exponent `1`: ways = `C(1 + 2 - 1, 2 - 1) = C(2,1) = 2`.
4. Multiply contributions: `2 * 2 = 4`.
Thus there are 4 arrays of length 2 whose product is 6.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(Q × √k) for factorizing each `k` plus O(maxExponent) for combinations |
| **Space** | O(maxN) for factorial tables |

---

## Follow-Up Questions

1. How would you handle queries where `k` can be as large as `10^12`?
2. Can the solution be extended to count arrays with a bounded maximum element value?

---

## Key Takeaway

> **Factorize `k` into prime powers and use stars‑and‑bars (`C(a+n‑1, n‑1)`) to distribute each exponent among the `n` positions; multiply the results for all primes.**