# 1994. The Number of Good Subsets

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/the-number-of-good-subsets](https://leetcode.com/problems/the-number-of-good-subsets)
**Companies:** Lowe, Medianet

---

## Problem Description
Given an integer array `nums` where each element is in the range `[1, 30]`, a *good subset* is a non‑empty subset whose product can be expressed as a product of **distinct** prime numbers (i.e., no prime factor appears more than once). Return the number of good subsets modulo `10^9 + 7`.

## Examples
| nums | goodSubsets |
|------|------------|
| [1,2,3,4] | 6 |
| [4,2,3,15] | 4 |
*Explanation:* For the first example, the good subsets are `[2]`, `[3]`, `[2,3]`, `[2,4]`, `[3,4]`, `[2,3,4]` (the `1` can be included or excluded without affecting the product).

## Approach
Use bitmask DP over the set of prime factors (there are 10 primes ≤ 30). For each number, compute its prime mask; if the number contains a repeated prime factor (e.g., 4 = 2²) it cannot be used. Iterate through `nums`, updating DP states by adding the current number’s mask to existing masks that do not overlap.

## Walkthrough
1. Pre‑compute prime list `[2,3,5,7,11,13,17,19,23,29]` and a map from number to its prime mask.
2. Initialise `dp[0] ← 1` (empty subset).
3. For each `num` in `nums`:
   - If `num` has a repeated prime factor, skip.
   - Let `mask` be its prime mask.
   - For each existing `state` from high to low:
       IF `state & mask == 0` THEN `dp[state | mask] ← dp[state | mask] + dp[state]`.
4. After processing all numbers, sum `dp[state]` for all `state != 0`.
5. Multiply the result by `2^{count(1)}` because each `1` can be either included or excluded.

## Complexity Analysis
There are at most `2^{10}` DP states and each number updates all states, so time complexity is `O(N * 2^{P})` where `P = 10`. Space complexity is `O(2^{P})` for the DP array.

## Follow‑Up Questions
* How would the solution change if numbers could be up to `100` (more primes)?
* Can you adapt the DP to count subsets whose product is a perfect square?
* How to handle the case where the modulo is a non‑prime number?

## Key Takeaway
Representing each number by a bitmask of its distinct prime factors enables efficient DP over subsets, ensuring no prime factor repeats in the product.