# 3610. Minimum Number of Primes to Sum to Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-primes-to-sum-to-target](https://leetcode.com/problems/minimum-number-of-primes-to-sum-to-target)
**Companies:** Amazon

---

## Problem Description
Given an integer `target`, return the minimum number of prime numbers whose sum equals `target`. If it is impossible, return `-1`. Each prime can be used multiple times.

## Examples
**Example 1**
```
Input: target = 10
Output: 2
Explanation: 10 = 5 + 5 (both primes).
```
**Example 2**
```
Input: target = 7
Output: 1
Explanation: 7 itself is a prime.
```

## Approach
The problem is a variation of the classic coin change where the coin denominations are all prime numbers ≤ `target`. The optimal solution can be derived from number‑theoretic observations:
1. Any even `target ≥ 4` can be expressed as the sum of two primes (Goldbach's conjecture, verified for the range used in LeetCode).
2. Any odd `target` can be expressed as `3 + (target‑3)`, and `target‑3` is even, so it reduces to case 1.
Thus the answer is:
- `1` if `target` is prime.
- `2` if `target` is even.
- `3` otherwise (odd non‑prime).
If `target < 2`, return `-1`.

```text
FUNCTION minPrimeSum(target):
    IF target < 2:
        RETURN -1
    IF isPrime(target):
        RETURN 1
    IF target MOD 2 = 0:
        RETURN 2
    // target is odd and not prime
    RETURN 3

FUNCTION isPrime(x):
    IF x ≤ 1:
        RETURN FALSE
    FOR i ← 2 TO sqrt(x):
        IF x MOD i = 0:
            RETURN FALSE
    RETURN TRUE
```

## Walkthrough
For `target = 27` (odd, not prime): `isPrime(27)` → FALSE, `27 MOD 2 = 1`, so return `3`. One possible decomposition is `3 + 11 + 13`.

## Complexity Analysis
- **Time:** O(√target) for the primality test.
- **Space:** O(1).

## Follow-Up Questions
1. How would you handle a version where each prime can be used at most once?
2. What if you need to return the actual list of primes used?
3. Extend to a weighted version where each prime has a cost.

## Key Takeaway
Leverage number‑theoretic properties: any even number ≥ 4 is the sum of two primes, and any odd number can be reduced to an even case by subtracting a prime (3).
