# 1994. The Number of Good Subsets

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/the-number-of-good-subsets](https://leetcode.com/problems/the-number-of-good-subsets)
**Companies:** Lowe, Medianet

---

## Problem Description
You are given an integer array `nums`. We call a subset of `nums` **good** if its product can be represented as a product of one or more **distinct prime** numbers.

- For example, if `nums = [1, 2, 3, 4]`:
  - `[2, 3]`, `[1, 2, 3]`, and `[1, 3]` are **good** subsets with products `6 = 2*3`, `6 = 2*3`, and `3 = 3` respectively.
  - `[1, 4]` and `[4]` are not **good** subsets with products `4 = 2*2` and `4 = 2*2` respectively.

Return *the number of different **good** subsets in* `nums` ***modulo*** `10^9 + 7`.

A **subset** of `nums` is any array that can be obtained by deleting some (possibly none or all) elements from `nums`. Two subsets are different if and only if the chosen indices to delete are different.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 30`

## Examples
```
Example 1:
  Input: nums = [1,2,3,4]
  Output: 6
  Explanation: The good subsets are:
  - [1,2]: product is 2, which is the product of distinct prime 2.
  - [1,2,3]: product is 6, which is the product of distinct primes 2 and 3.
  - [1,3]: product is 3, which is the product of distinct prime 3.
  - [2]: product is 2, which is the product of distinct prime 2.
  - [2,3]: product is 6, which is the product of distinct primes 2 and 3.
  - [3]: product is 3, which is the product of distinct prime 3.
```
```
Example 2:
  Input: nums = [4,2,3,15]
  Output: 5
  Explanation: The good subsets are:
  - [2]: product is 2, which is the product of distinct prime 2.
  - [2,3]: product is 6, which is the product of distinct primes 2 and 3.
  - [2,15]: product is 30, which is the product of distinct primes 2, 3, and 5.
  - [3]: product is 3, which is the product of distinct prime 3.
  - [15]: product is 15, which is the product of distinct primes 3 and 5.
```

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