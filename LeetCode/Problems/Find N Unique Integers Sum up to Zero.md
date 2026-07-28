# 1304. Find N Unique Integers Sum up to Zero

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-n-unique-integers-sum-up-to-zero](https://leetcode.com/problems/find-n-unique-integers-sum-up-to-zero)
**Companies:** Amazon, American Express, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an integer `n`, return an array of `n` **unique** integers that sum to `0`. The order of the integers does not matter.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `3` | `[-1,0,1]` | Three numbers that sum to zero and are distinct.
| `4` | `[-2,-1,1,2]` | Pairing positive and negative numbers.
| `1` | `[0]` | Single zero satisfies the requirement.

## Approach
Construct pairs of opposite numbers `i` and `-i` for `i` from `1` to `n/2`. If `n` is odd, include `0` as the middle element. This guarantees uniqueness and a total sum of zero.

## Walkthrough
For `n = 5`:
| i | Added values |
|---|--------------|
| 1 | `1`, `-1` |
| 2 | `2`, `-2` |
| (odd) | `0` |
Result: `[1,-1,2,-2,0]` (any order acceptable).

## Complexity Analysis
- **Time:** O(n) – one pass to generate the numbers.
- **Space:** O(n) for the output array.

## Follow-Up Questions
- How would you modify the algorithm to return the numbers in sorted order?
- Can you generate such a list when the numbers must lie within a specific range?
- What if the numbers must be positive and negative only (no zero) for odd `n`?

## Key Takeaway
Pairing each positive integer with its negative (and optionally adding zero) provides a simple linear‑time construction of `n` unique integers that sum to zero.
