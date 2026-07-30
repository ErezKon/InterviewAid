# 2521. Distinct Prime Factors of Product of Array

**Difficulty:** 🟡 Medium
**Companies:** Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Factorize Each Number](#approach-factorize-each-number)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of positive integers `nums`, return the number of **distinct prime factors** in the product of all elements.

You don't need to compute the product — just collect all prime factors from each number.

**Constraints:**
- `1 <= nums.length <= 10^4`
- `2 <= nums[i] <= 1000`

---

## Examples

**Example 1:**
```
Input: nums = [2, 4, 3, 7, 10, 6]
Output: 4
Explanation: Product = 2×4×3×7×10×6 = 10080 = 2^5 × 3^2 × 5 × 7
  Distinct primes: {2, 3, 5, 7} → 4
```

**Example 2:**
```
Input: nums = [2, 4, 8, 16]
Output: 1
Explanation: All powers of 2 → only prime factor is 2.
```

---

## Key Insight

> The prime factors of a product equal the **union** of prime factors of each element. Factorize each number individually and collect primes in a set.

---

## Approach: Factorize Each Number ✅

```
FUNCTION distinctPrimeFactors(nums):
    primes = set()
    FOR num IN nums:
        FOR p ← 2 TO sqrt(num):
            WHILE num % p == 0: primes.ADD(p); num //= p
        IF num > 1: primes.ADD(num)
    RETURN len(primes)
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n × √M) | n numbers, M = max value (1000), √1000 ≈ 31 |
| **Space** | O(P) | P = number of distinct primes (at most ~168 primes ≤ 1000) |

---

## Key Takeaway

> **Distinct prime factors of a product = union of prime factors of each element. Factorize individually and collect in a set — no need to compute the actual product.**
