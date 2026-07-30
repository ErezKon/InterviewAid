# 2012. Sum of Beauty in the Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-beauty-in-the-array](https://leetcode.com/problems/sum-of-beauty-in-the-array)
**Companies:** Amazon

---

## Problem Description
Given an integer array `nums`, the *beauty* of a subarray `nums[i..j]` (with `j‑i+1 ≥ 3`) is defined as the difference between its maximum and minimum values **if** there exists an index `k` with `i < k < j` such that `nums[i] < nums[k] < nums[j]`. Otherwise the beauty is `0`. Return the sum of beauties of all possible subarrays.

## Examples
**Example 1:**
Input: `nums = [1,2,3]`
Output: `2`
Explanation: The only subarray of length 3 satisfies `1 < 2 < 3`; beauty = 3‑1 = 2.

**Example 2:**
Input: `nums = [3,1,2]`
Output: `0`
Explanation: No subarray meets the required ordering, so total beauty is 0.

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
* Can the solution be improved using monotonic stacks to achieve O(n log n) or O(n)?
* How would the problem change if the beauty definition required the middle element to be the **median** of the subarray?
* What if we need to return the count of subarrays with non‑zero beauty instead of the sum?

## Key Takeaway
Tracking min, max, and a qualifying middle element while expanding a window lets you compute each subarray's beauty in quadratic time.
