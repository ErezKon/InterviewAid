# 1735. Count Ways to Make Array With Product

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-ways-to-make-array-with-product](https://leetcode.com/problems/count-ways-to-make-array-with-product)
**Companies:** Amazon

---

## Problem Description

You are given a 2D integer array, `queries`. For each `queries[i]`, where `queries[i] = [n_i, k_i]`, find the number of different ways you can place positive integers into an array of size `n_i` such that the product of the integers is `k_i`. As the number of ways may be too large, the answer to the `i^th` query is the number of ways **modulo** `10^9 + 7`.

Return *an integer array *`answer`* where *`answer.length == queries.length`*, and *`answer[i]`* is the answer to the *`i^th`* query.*

**Constraints:**
- `1 <= queries.length <= 10^4 `
- `1 <= n_i, k_i <= 10^4`

---

## Examples

**Example 1:**
```
Input: queries = [[2,6],[5,1],[73,660]]
Output: [4,1,50734910]
Explanation: Each query is independent.
[2,6]: There are 4 ways to fill an array of size 2 that multiply to 6: [1,6], [2,3], [3,2], [6,1].
[5,1]: There is 1 way to fill an array of size 5 that multiply to 1: [1,1,1,1,1].
[73,660]: There are 1050734917 ways to fill an array of size 73 that multiply to 660. 1050734917 modulo 10^9 + 7 = 50734910.
```

**Example 2:**
```
Input: queries = [[1,1],[2,2],[3,3],[4,4],[5,5]]
Output: [1,2,3,10,5]
```

---

## Approach

```
text
FUNCTION waysToFillArray(queries):
    MOD ← 1_000_000_007
    PRECOMPUTE factorials and inverse factorials up to needed range
    results ← []
    FOR each [n, k] IN queries:
        ways ← 1
        FOR each prime p dividing k:
            a ← exponent of p in k
            // Stars and bars: distribute a identical items into n bins
            ways ← ways * COMBINATION(a + n - 1, n - 1) MOD MOD
        APPEND ways TO results
    RETURN results
```

---

## Walkthrough

Consider the query `[2, 6]`.
1. Factorize `k = 6 = 2^1 × 3^1`.
2. For prime `2` with exponent `1`: ways = `C(1 + 2 - 1, 2 - 1) = C(2,1) = 2`.
3. For prime `3` with exponent `1`: ways = `C(1 + 2 - 1, 2 - 1) = C(2,1) = 2`.
4. Multiply contributions: `2 * 2 = 4`.
Thus there are 4 arrays of length 2 whose product is 6.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(Q × √k) for factorizing each `k` plus O(maxExponent) for combinations |
| **Space** | O(maxN) for factorial tables |

---

## Follow-Up Questions

1. How would you handle queries where `k` can be as large as `10^12`?
2. Can the solution be extended to count arrays with a bounded maximum element value?

---

## Key Takeaway

> **Factorize `k` into prime powers and use stars-and-bars (`C(a+n-1, n-1)`) to distribute each exponent among the `n` positions; multiply the results for all primes.**