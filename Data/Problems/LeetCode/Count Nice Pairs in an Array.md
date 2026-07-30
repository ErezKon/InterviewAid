# 1814. Count Nice Pairs in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-nice-pairs-in-an-array](https://leetcode.com/problems/count-nice-pairs-in-an-array)
**Companies:** Capital One, Google, Meta, Roblox, Square, Uber

---

## Problem Description
Given an integer array `nums`, a pair of indices `(i, j)` (with `i < j`) is called *nice* if `nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])`, where `rev(x)` denotes the integer formed by reversing the decimal digits of `x`. Return the number of nice pairs modulo `10^9 + 7`.

## Examples
**Example 1:**
```
Input: nums = [42,11,1,97]
Output: 2
Explanation: The nice pairs are (0,2) and (2,3).
```
**Example 2:**
```
Input: nums = [13,10,35,24,76]
Output: 4
Explanation: Nice pairs are (0,1), (0,2), (1,2), (1,3).
```

## Approach
Rewrite the condition:
`nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])`
⇔ `nums[i] - rev(nums[i]) == nums[j] - rev(nums[j])`.
Thus each element can be represented by `key = nums[i] - rev(nums[i])`. Count how many indices share the same key; for a group of size `c` there are `c·(c‑1)/2` nice pairs.

## Walkthrough
| i | nums[i] | rev(nums[i]) | key = nums[i]‑rev(nums[i]) |
|---|---------|--------------|----------------------------|
| 0 | 42 | 24 | 18 |
| 1 | 11 | 11 | 0 |
| 2 | 1  | 1  | 0 |
| 3 | 97 | 79 | 18 |
Keys 18 and 0 each appear twice → each contributes 1 pair → total 2.

## Complexity Analysis
- **Time:** O(n · k) where `k` is the number of digits (to compute `rev`). Effectively O(n).
- **Space:** O(n) for the hash map of keys.

## Follow‑Up Questions
1. How would you handle very large numbers where reversing digits may overflow?
2. Can the solution be adapted to count pairs where the condition uses a different arithmetic relation?
3. What if the array is streamed and you must compute the count in an online fashion?

## Key Takeaway
Transforming the equation reduces the problem to counting equal values of `nums[i]‑rev(nums[i])`, enabling a simple hash‑map solution.
