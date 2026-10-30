# 1808. Maximize Number of Nice Divisors

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-number-of-nice-divisors](https://leetcode.com/problems/maximize-number-of-nice-divisors)
**Companies:** Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Math (Split into 3s) — O(log n)](#approach-math-split-into-3s--olog-n-)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a positive integer `primeFactors`. You are asked to construct a positive integer `n` that satisfies the following conditions:

  - The number of prime factors of `n` (not necessarily distinct) is **at most** `primeFactors`.
  - The number of nice divisors of `n` is maximized. Note that a divisor of `n` is **nice** if it is divisible by every prime factor of `n`. For example, if `n = 12`, then its prime factors are `[2,2,3]`, then `6` and `12` are nice divisors, while `3` and `4` are not.

Return *the number of nice divisors of* `n`. Since that number can be too large, return it **modulo** `10^9 + 7`.

Note that a prime number is a natural number greater than `1` that is not a product of two smaller natural numbers. The prime factors of a number `n` is a list of prime numbers such that their product equals `n`.

**Constraints:**
- `1 <= primeFactors <= 10^9`

---

## Examples

**Example 1:**
```
Input: primeFactors = 5
Output: 6
Explanation: 200 is a valid value of n.
It has 5 prime factors: [2,2,2,5,5], and it has 6 nice divisors: [10,20,40,50,100,200].
There is not other value of n that has at most 5 prime factors and more nice divisors.
```

**Example 2:**
```
Input: primeFactors = 8
Output: 18
```

---

## Key Insight

> The problem reduces to: **partition `primeFactors` into parts that maximize the product of those parts.** This is the classic "Integer Break" problem (LC 343). The optimal strategy is to split into as many **3s** as possible, with special handling for remainder 1 (use a 4 = 2+2 instead) and remainder 2 (use one 2).

---

## Approach: Math (Split into 3s) — O(log n) ✅

```
FUNCTION maxNiceDivisors(primeFactors):
    MOD = 10^9 + 7
    IF primeFactors <= 3: RETURN primeFactors
    
    IF primeFactors % 3 == 0:
        RETURN POW(3, primeFactors / 3, MOD)
    ELSE IF primeFactors % 3 == 1:
        RETURN (POW(3, (primeFactors - 4) / 3, MOD) * 4) % MOD
    ELSE:  // remainder 2
        RETURN (POW(3, (primeFactors - 2) / 3, MOD) * 2) % MOD
```

Uses modular exponentiation for O(log n).

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Math + modular exp | **O(log n)** | O(1) |

---

## Follow-Up Questions

**Q1: Why 3s instead of 2s?**
For equal sum, 3s give a higher product: 3³ = 27 > 2⁴ = 16 (for sum 9 vs 8). Mathematically, e^(n/e) is maximized near e ≈ 2.718, and 3 is the closest integer.

**Q2: Why not use 4s?**
4 = 2+2, and 2² = 4 = 4¹. Same product, no benefit. But when remainder is 1, replace one 3+1=4 with 2+2=4 (since 3×1 < 2×2).

**Q3: How does this relate to "Integer Break" (LC 343)?**
Identical mathematical problem. LC 343 asks for the max product directly; this problem wraps it in a number theory context.

---

## Key Takeaway

> **"Maximize product of parts summing to n" always splits into 3s.** Handle remainder 1 by using 2+2 instead of 3+1. This appears in Integer Break, rope cutting, and prime factorization problems.
