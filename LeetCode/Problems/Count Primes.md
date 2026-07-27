# 204. Count Primes

**Difficulty:** 🟡 Medium
**Acceptance:** 33.0%
**LeetCode:** [https://leetcode.com/problems/count-primes](https://leetcode.com/problems/count-primes)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Citadel, Epic Systems, Fast, Goldman Sachs, Google, Intel, Meta, Microsoft, Nokia, Nvidia, Sap, Tcs, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer `n`, return the number of prime numbers **strictly less than** `n`.

**Constraints:**
- `0 <= n <= 5 × 10^6`

---

## Examples

**Example 1:**
- **Input:** `n = 10`
- **Output:** `4`
- **Explanation:** Primes less than 10: 2, 3, 5, 7.

**Example 2:**
- **Input:** `n = 0` or `n = 1`
- **Output:** `0`

---

## Key Insight

The **Sieve of Eratosthenes** is the classic algorithm: start with all numbers marked as prime, then for each prime `p`, mark all its multiples as composite. Start marking from `p²` (smaller multiples were already handled by smaller primes). Only iterate `p` up to `√n`.

---

## Approach: Sieve of Eratosthenes — O(n log log n) ✅

```
FUNCTION countPrimes(n):
    IF n < 2: RETURN 0
    isPrime = [true] * n
    isPrime[0] = isPrime[1] = false

    FOR i ← 2 TO sqrt(n):
        IF isPrime[i]:
            FOR j ← i*i TO n-1 STEP i:
                isPrime[j] = false

    RETURN COUNT(isPrime)
```

**Why start from `i*i`:** All multiples `i×2, i×3, ..., i×(i-1)` have a factor smaller than `i` and were already marked by an earlier iteration.

---

## Walkthrough

**Input:** `n = 10`

```
Initial: [F, F, T, T, T, T, T, T, T, T]  (indices 0-9)

i=2: mark 4, 6, 8
      [F, F, T, T, F, T, F, T, F, T]

i=3: mark 9 (start from 3²=9)
      [F, F, T, T, F, T, F, T, F, F]

i≥4: 4 > √10 ≈ 3.16, stop

Primes: {2, 3, 5, 7} → count = 4 ✅
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log log n) — the harmonic sum of primes |
| **Space** | O(n) — boolean array |

---

## Follow-Up Questions

**Q1: Why O(n log log n) and not O(n)?**
The inner loop for prime `p` runs `n/p` times. Summing `n/p` over all primes p ≤ n gives `n × ∑(1/p)` ≈ `n × log(log n)` by Mertens' theorem.

**Q2: Can you reduce space to O(√n)?**
Yes — use a **segmented sieve**: sieve primes up to √n, then process the range [0, n) in blocks of size √n. Each block is sieved using the small primes.

**Q3: What about checking individual primes?**
Trial division for a single number takes O(√n). The sieve is better when you need all primes up to n.

**Q4: How does this compare to the Miller-Rabin test?**
Miller-Rabin is a probabilistic primality test for individual large numbers — O(k log² n) per test. The sieve is deterministic and optimal for bulk prime generation.

---

## Key Takeaway

> **The Sieve of Eratosthenes is the fundamental algorithm for counting/generating all primes up to n. Start marking multiples from p², iterate only to √n, and you get near-linear performance.**
