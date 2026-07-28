# 3122. Minimum Number of Operations to Satisfy Conditions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-satisfy-conditions](https://leetcode.com/problems/minimum-number-of-operations-to-satisfy-conditions)
**Companies:** Turing

---

## Problem Description
You are given an integer array `nums` and an integer `k`. In one operation you may choose any element `nums[i]` and replace it with `nums[i] + k` or `nums[i] - k`. Determine the minimum number of operations required to make all elements of the array equal. If it is impossible, return `-1`.

## Examples
**Example 1:**
```
Input: nums = [1,5,9], k = 4
Output: 2
Explanation: Replace 1 with 5 (1+4) and 9 with 5 (9-4). All become 5.
```
**Example 2:**
```
Input: nums = [2,3,5], k = 2
Output: -1
Explanation: All numbers have different parity modulo 2, so they can never become equal.
```

## Approach
An element can only change its value by multiples of `k`. Therefore all numbers must share the same remainder when divided by `k`. If the remainders differ, the task is impossible.

If feasible, the optimal target value is the median of the transformed values `v_i = (nums[i] - r) / k` (where `r` is the common remainder). The number of operations equals the sum of absolute differences from this median.

1. Compute `r = nums[0] mod k` and verify every `nums[i] mod k == r`.
2. Transform each `nums[i]` to `v_i = (nums[i] - r) / k`.
3. Find the median `m` of `v_i` (O(n) with selection algorithm or O(n log n) sorting).
4. Answer = Σ |v_i - m|.

## Walkthrough
| i | nums[i] | v_i |
|---|---------|-----|
| 0 | 1 | (1‑1)/4 = 0 |
| 1 | 5 | (5‑1)/4 = 1 |
| 2 | 9 | (9‑1)/4 = 2 |
Median of {0,1,2} is 1 → operations = |0‑1|+|1‑1|+|2‑1| = 2.

## Complexity Analysis
- **Time:** O(n log n) for sorting (or O(n) with quick‑select).
- **Space:** O(n) for the transformed list.

## Follow‑Up Questions
1. How would you handle the case where `k` can be zero?
2. Can the solution be extended to minimize the maximum number of operations on any single element?
3. What changes if you are allowed to add or subtract any multiple of `k` in a single operation?

## Key Takeaway
All numbers must share the same modulo‑k remainder; once normalized, aligning them to the median of the scaled values yields the minimal operation count.
