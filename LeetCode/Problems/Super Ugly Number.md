# 313. Super Ugly Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/super-ugly-number](https://leetcode.com/problems/super-ugly-number)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given an integer `n` and an array of distinct prime numbers `primes`, find the `n`‑th **super ugly number**. A super ugly number is a positive integer whose prime factors are only from the `primes` list. The sequence starts with 1.

## Examples
**Example 1:**
```
Input: n = 12, primes = [2,7,13,19]
Output: 32
Explanation: The first 12 super ugly numbers are
[1,2,4,7,8,13,14,16,19,26,28,32].
```

**Example 2:**
```
Input: n = 1, primes = [2,3,5]
Output: 1
```

## Approach
Maintain an array `dp` where `dp[i]` is the i‑th super ugly number. For each prime, keep a pointer to the smallest `dp` value that when multiplied by the prime yields a candidate larger than the last generated number. At each step, select the minimum candidate, advance all pointers that produced this minimum, and store it.

```text
FUNCTION nthSuperUglyNumber(n, primes):
    SET dp ← ARRAY[0..n-1] WITH 1
    SET pointers ← ARRAY[0..LENGTH(primes)-1] WITH 0
    FOR i ← 1 TO n-1:
        SET candidates ← empty list
        FOR j ← 0 TO LENGTH(primes)-1:
            SET cand ← primes[j] * dp[pointers[j]]
            APPEND cand TO candidates
        SET nextVal ← MIN(candidates)
        SET dp[i] ← nextVal
        FOR j ← 0 TO LENGTH(primes)-1:
            IF candidates[j] = nextVal:
                SET pointers[j] ← pointers[j] + 1
    RETURN dp[n-1]
```

## Walkthrough
For `n = 12, primes = [2,7,13,19]`:
1. Start `dp = [1]`, `pointers = [0,0,0,0]`.
2. Candidates = [2,7,13,19] → min 2 → `dp[1]=2`, advance pointer for prime 2.
3. Next candidates = [4,7,13,19] → min 4 → `dp[2]=4`, advance pointer for prime 2.
4. Continue this process; after 11 iterations `dp[11]=32`.

## Complexity Analysis
- **Time:** O(n · p) where `p` is the number of primes (each iteration scans all primes).
- **Space:** O(n + p) for the `dp` array and the pointers.

## Follow-Up Questions
1. How would you modify the algorithm to generate the sequence lazily without storing the entire `dp` array?
2. Can you improve the time complexity using a min‑heap?
3. What changes are needed if `primes` may contain non‑prime numbers?

## Key Takeaway
Using multiple pointers to track the next multiple of each prime yields an O(n · p) solution that builds the super ugly sequence incrementally.
