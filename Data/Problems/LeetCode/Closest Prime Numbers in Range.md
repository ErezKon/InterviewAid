# 2523. Closest Prime Numbers in Range

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-prime-numbers-in-range](https://leetcode.com/problems/closest-prime-numbers-in-range)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok
---

## Problem Description
Given two positive integers `left` and `right`, find the two integers `num1` and `num2` such that:

- `left <= num1 < num2 <= right`.
- Both `num1` and `num2` are prime numbers.
- `num2 - num1` is the **minimum** amongst all other pairs satisfying the above conditions.

Return the positive integer array `ans = [num1, num2]`. If there are multiple pairs satisfying these conditions, return the one with the **smallest** `num1` value. If no such numbers exist, return `[-1, -1]`.

**Constraints:**
- `1 <= left <= right <= 10^6`

## Examples
```
Example 1:
  Input: left = 10, right = 19
  Output: [11,13]
  Explanation: The prime numbers between 10 and 19 are 11, 13, 17, and 19.
  The closest gap between any pair is 2, which can be achieved by [11,13] or [17,19].
  Since 11 is smaller than 17, we return the first pair.
```

```
Example 2:
  Input: left = 4, right = 6
  Output: [-1,-1]
  Explanation: There exists only one prime number in the given range, so the conditions cannot be satisfied.
```

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
Time: O(right log log right) for sieve + O(right-left) for scanning.
Space: O(right) for the boolean sieve array.

## Follow-Up Questions
- How to handle multiple queries with different ranges efficiently?
- Can you find the pair with the largest gap instead?
- What if the range is extremely large (e.g., up to 10^12) but the interval width is small?

---

## Key Takeaway

> A single sieve up to the upper bound lets you enumerate all primes in a range, after which a linear scan finds the closest pair.
