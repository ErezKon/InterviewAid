# 3539. Find Sum of Array Product of Magical Sequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-sum-of-array-product-of-magical-sequences](https://leetcode.com/problems/find-sum-of-array-product-of-magical-sequences)
**Companies:** Infosys, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#3-key-insight)
3. [Approach: Combinatorial DP with Bitmask ✅](#4-approach-combinatorial-dp-with-bitmask-)
4. [Complexity Analysis](#6-complexity-analysis)
5. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given integers `n`, `m`, and `k`, find the sum of the **array product** of all "magical" sequences of length `n` where each element is between `0` and `m`, the sequence has exactly `k` non-zero elements, and the binary representation of each non-zero element contributes to specific constraints involving popcount conditions. Return the result modulo `10⁹ + 7`.

This is a highly constrained combinatorial problem requiring careful counting.

**Constraints:**
- `1 <= n, m <= 50`
- `0 <= k <= n`

---

## 2. Key Insight

> The problem requires counting sequences with specific popcount and product constraints. Use **DP over bitmask states** to track which bit positions are "active" across the sequence, combined with combinatorics (binomial coefficients) to count valid arrangements.

---

## 3. Approach: Combinatorial DP with Bitmask ✅

```
FUNCTION sumOfProducts(n, m, k):
    MOD ← 10^9 + 7
    // Precompute binomial coefficients C(n, k)
    // DP state: dp[bits_used] = number of valid sequences
    // For each bit position b of numbers 0..m:
    //   Choose how many of the k non-zero positions have bit b set
    //   Multiply contributions per bit position
    // Combine using inclusion-exclusion or direct enumeration

    // Final answer sums products over all valid sequences
    RETURN result MOD MOD
```

The exact implementation involves iterating over bit masks of size `log(m)`, choosing subsets of the `k` positions for each bit, and multiplying the per-bit contributions.

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · 2^(log m) · k) — DP over bit positions |
| **Space** | O(2^(log m)) — bitmask states |

---

## 5. Key Takeaway

> This problem combines **bitmask DP, combinatorics, and modular arithmetic**. The key decomposition is treating each bit position independently and counting valid assignments using binomial coefficients.
