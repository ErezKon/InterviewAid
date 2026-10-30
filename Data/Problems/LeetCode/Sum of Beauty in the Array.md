# 2012. Sum of Beauty in the Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-beauty-in-the-array](https://leetcode.com/problems/sum-of-beauty-in-the-array)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented subarray problem. Correct idea: precompute `prefixMax[i]` (max of `nums[0..i-1]`) and `suffixMin[i]` (min of `nums[i+1..]`); for each middle index add 2 if `prefixMax < nums[i] < suffixMin`, else 1 if `nums[i-1] < nums[i] < nums[i+1]`. O(n).*

You are given a **0-indexed** integer array `nums`. For each index `i` (`1 <= i <= nums.length - 2`) the **beauty** of `nums[i]` equals:

- `2`, if `nums[j] < nums[i] < nums[k]`, for **all** `0 <= j < i` and for **all** `i < k <= nums.length - 1`.
- `1`, if `nums[i - 1] < nums[i] < nums[i + 1]`, and the previous condition is not satisfied.
- `0`, if none of the previous conditions holds.

Return *the **sum of beauty** of all* `nums[i]` *where* `1 <= i <= nums.length - 2`.

**Constraints:**
- `3 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: 2
Explanation: For each index i in the range 1 <= i <= 1:
- The beauty of nums[1] equals 2.
```

**Example 2:**
```
Input: nums = [2,4,6,4]
Output: 1
Explanation: For each index i in the range 1 <= i <= 2:
- The beauty of nums[1] equals 1.
- The beauty of nums[2] equals 0.
```

**Example 3:**
```
Input: nums = [3,2,1]
Output: 0
Explanation: For each index i in the range 1 <= i <= 1:
- The beauty of nums[1] equals 0.
```

## Approach
The condition can be checked by scanning each subarray and maintaining the current minimum and maximum. For each left index `i`, expand the right pointer `j` while tracking `min`, `max`, and whether a middle element falls between them. When the condition holds, add `max‑min` to the answer.

## Walkthrough
| i (left) | j (right) | min | max | middle‑exists? | added beauty |
|----------|-----------|-----|-----|----------------|--------------|
| 0 | 2 | 1 | 3 | yes (2) | 2 |
| … | … | … | … | … | … |
The final sum accumulates all contributions.

## Complexity Analysis
Time: O(n²) – each left index expands to the right while updating min/max.
Space: O(1) extra.

## Follow-Up Questions
* Can the solution be improved using monotonic stacks to achieve O(n log n) or O(n)?
* How would the problem change if the beauty definition required the middle element to be the **median** of the subarray?
* What if we need to return the count of subarrays with non‑zero beauty instead of the sum?

## Key Takeaway
Tracking min, max, and a qualifying middle element while expanding a window lets you compute each subarray's beauty in quadratic time.
