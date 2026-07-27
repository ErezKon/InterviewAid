# 2523. Closest Prime Numbers in Range

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-prime-numbers-in-range](https://leetcode.com/problems/closest-prime-numbers-in-range)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok

---

```
FUNCTION closestPrimes(left, right):
    // Sieve of Eratosthenes up to right
    sieve = [true] * (right + 1)
    sieve[0] = sieve[1] = false
    FOR i ← 2 TO sqrt(right):
        IF sieve[i]:
            FOR j ← i*i TO right STEP i: sieve[j] = false

    primes = [i for i in range(left, right + 1) if sieve[i]]
    IF len(primes) < 2: RETURN [-1, -1]

    minGap = infinity; result = [-1, -1]
    FOR i ← 1 TO len(primes) - 1:
        gap = primes[i] - primes[i-1]
        IF gap < minGap:
            minGap = gap
            result = [primes[i-1], primes[i]]

    RETURN result
```
