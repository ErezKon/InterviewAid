# 3770. Largest Prime from Consecutive Prime Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-prime-from-consecutive-prime-sum](https://leetcode.com/problems/largest-prime-from-consecutive-prime-sum)
**Companies:** Google, Meta

---

## 1. Problem Description

Given a limit, find the largest prime ≤ limit that can be expressed as the sum of consecutive primes.

---

## 2. Approach: Sieve + Sliding Window — O(n log log n) ✅

```
FUNCTION largestPrimeConsecutiveSum(limit):
    primes = sieve(limit)
    primeSet = SET(primes)

    // Try longest consecutive sums first
    prefixSum = prefix sums of primes
    FOR length ← len(primes) DOWN TO 1:
        FOR start ← 0 TO len(primes) - length:
            s = prefixSum[start + length] - prefixSum[start]
            IF s > limit: BREAK
            IF s IN primeSet: RETURN s
    RETURN 2
```

| Time | Space |
|------|-------|
| O(n log log n) for sieve + O(n²) search | O(n) |

---

## 3. Key Takeaway

> Generate primes via sieve, then search for the longest consecutive prime subsequence whose sum is itself prime and ≤ limit.
