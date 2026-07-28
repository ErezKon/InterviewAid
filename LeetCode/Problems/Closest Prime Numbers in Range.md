# 2523. Closest Prime Numbers in Range

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-prime-numbers-in-range](https://leetcode.com/problems/closest-prime-numbers-in-range)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok
---

## Problem Description
Given two integers `left` and `right` (inclusive), find the pair of prime numbers within the range `[left, right]` that have the smallest difference. Return the pair as `[prime1, prime2]`. If fewer than two primes exist in the range, return `[-1, -1]`.

## Examples
- **Example 1:** `left = 10, right = 19` → primes `[11,13,17,19]`, smallest gap `2` → output `[11,13]`.
- **Example 2:** `left = 8, right = 10` → only prime `?` none → output `[-1,-1]`.

## Approach
1. Use the Sieve of Eratosthenes to generate all primes up to `right`.
2. Filter the sieve to keep only primes ≥ `left`.
3. Scan the filtered list, tracking the minimum gap between consecutive primes.

### Pseudocode
```text
FUNCTION closestPrimes(left, right):
    sieve ← ARRAY OF (right + 1) TRUE
    sieve[0] ← FALSE; sieve[1] ← FALSE
    FOR i ← 2 TO FLOOR(SQRT(right)):
        IF sieve[i]:
            FOR j ← i*i TO right STEP i:
                sieve[j] ← FALSE
    primes ← []
    FOR num ← left TO right:
        IF sieve[num]: APPEND num TO primes
    IF LENGTH(primes) < 2:
        RETURN [-1, -1]
    minGap ← INFINITY; result ← []
    FOR i ← 1 TO LENGTH(primes) - 1:
        gap ← primes[i] - primes[i-1]
        IF gap < minGap:
            minGap ← gap
            result ← [primes[i-1], primes[i]]
    RETURN result
```

## Walkthrough
For `left = 10, right = 19`:
1. Sieve marks primes: 11,13,17,19.
2. List `primes = [11,13,17,19]`.
3. Gaps: 2,4,2 → smallest gap 2, first pair `[11,13]` returned.

## Complexity Analysis
Time: O(right log log right) for sieve + O(right‑left) for scanning.
Space: O(right) for the boolean sieve array.

## Follow-Up Questions
- How to handle multiple queries with different ranges efficiently?
- Can you find the pair with the largest gap instead?
- What if the range is extremely large (e.g., up to 10^12) but the interval width is small?

---

## Key Takeaway

> A single sieve up to the upper bound lets you enumerate all primes in a range, after which a linear scan finds the closest pair.
