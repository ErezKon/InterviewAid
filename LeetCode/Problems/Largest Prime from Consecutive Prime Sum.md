# 3770. Largest Prime from Consecutive Prime Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-prime-from-consecutive-prime-sum](https://leetcode.com/problems/largest-prime-from-consecutive-prime-sum)
**Companies:** Google, Meta

---

## 1. Problem Description

Given an integer `limit`, find the largest prime number less than or equal to `limit` that can be expressed as the sum of one or more consecutive prime numbers.

---

## 2. Approach: Sieve + Sliding Window — O(n log log n) ✅

```text
FUNCTION largestPrimeConsecutiveSum(limit):
    // Generate all primes up to limit using Sieve of Eratosthenes
    SET primes ← SIEVE(limit)
    SET primeSet ← SET(primes)

    // Compute prefix sums of the prime list
    SET prefix ← [0]
    FOR p IN primes:
        APPEND(prefix, LAST(prefix) + p)

    // Try longer windows first to get the largest sum early
    FOR length FROM SIZE(primes) DOWNTO 1:
        FOR start FROM 0 TO SIZE(primes) - length:
            SET sum ← prefix[start + length] - prefix[start]
            IF sum > limit:
                BREAK // further starts will only increase sum
            IF sum IN primeSet:
                RETURN sum
    RETURN 2 // fallback (2 is prime and ≤ limit)
```

---

## 3. Examples

| limit | Output |
|-------|--------|
| 41    | 41 |
| 100   | 97 |
| 20    | 17 |

---

## 4. Walkthrough

1. **Sieve** generates primes up to `limit` → e.g., for `limit = 41` we get `[2,3,5,7,11,13,17,19,23,29,31,37,41]`.
2. **Prefix sums** become `[0,2,5,10,17,28,41,58,77,100,129,160,197,238]`.
3. Start with the longest possible window (`length = 13`). Compute sums:
   - `sum = prefix[13] - prefix[0] = 238` > 41 → break.
4. Decrease `length` to 6, examine windows:
   - `start=0`: sum = 2+3+5+7+11+13 = 41 → 41 is in `primeSet`, return 41.
5. For `limit = 100`, the algorithm eventually finds `97` as the largest prime sum of consecutive primes.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n log log n) for sieve + O(n²) worst‑case sliding window | O(n) |

---

## 6. Follow-Up Questions

- How would you adapt the solution to return **all** prime sums ≤ `limit` instead of only the largest?
- Can the sliding‑window search be optimized to O(n) using two‑pointer technique?
- What changes are needed if the input `limit` can be as large as 10⁹?

---

## Key Takeaway

> Generate primes with a sieve, then use prefix sums and a sliding‑window search to find the largest prime that is a sum of consecutive primes.
