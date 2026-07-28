# 2903. Find Indices With Index and Value Difference I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-indices-with-index-and-value-difference-i](https://leetcode.com/problems/find-indices-with-index-and-value-difference-i)
**Companies:** Paytm

---

## Problem Description
Given an integer array `nums`, return **any** index `i` such that `i - nums[i] == target`. If multiple indices satisfy the condition, return any of them; if none exist, return `-1`. The array length is up to 10⁵ and values are within typical 32‑bit integer range.

## Examples
**Example 1**
```
Input: nums = [3,2,1,0], target = 2
Output: 2
Explanation: At index 2, 2 - nums[2] = 2 - 1 = 1 ≠ 2, but index 3 gives 3 - 0 = 3 ≠ 2. No index matches, so return -1.
```
**Example 2**
```
Input: nums = [0,1,2,3], target = 0
Output: 0
Explanation: 0 - nums[0] = 0 satisfies the condition.
```

## Approach
Iterate through the array while checking the condition `i - nums[i] == target`. Because each index is examined once, the algorithm runs in linear time.

## Walkthrough
| i | nums[i] | i - nums[i] | Condition met? |
|---|---------|-------------|----------------|
| 0 | 0       | 0           | Yes (target=0) |
| 1 | 1       | 0           | No |
| 2 | 2       | 0           | No |
| 3 | 3       | 0           | No |
The first matching index `0` is returned.

## Complexity Analysis
- **Time:** O(n) where *n* is the length of `nums`.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would you modify the solution to return **all** matching indices?
2. Can the problem be solved using a hash map for faster look‑ups when the condition is `i + nums[i] == target`?
3. What if the array is sorted—does it enable a binary‑search approach?

## Key Takeaway
A simple linear scan suffices: checking `i - nums[i]` against the target for each index yields an O(n) time, O(1) space solution.