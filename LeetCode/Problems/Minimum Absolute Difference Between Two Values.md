# 3880. Minimum Absolute Difference Between Two Values

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-between-two-values](https://leetcode.com/problems/minimum-absolute-difference-between-two-values)
**Companies:** Snowflake

---

## Problem Description

Given an integer array `nums`, find the minimum absolute difference between any two distinct elements in the array.

Constraints:
- `2 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [3, -7, 0]
Output: 3
Explanation: The pairs are (3,0) diff 3, (3,-7) diff 10, (0,-7) diff 7. Minimum is 3.
```

**Example 2:**
```
Input: nums = [5, 5, 5]
Output: 0
Explanation: Identical values give a difference of 0.
```

---

## Approach

**Algorithm:** Sort the array and scan adjacent pairs.

Key insight: After sorting, the smallest absolute difference must occur between two consecutive elements.

Pseudocode:
```text
FUNCTION minAbsDiff(nums):
    SORT nums
    minDiff ← INFINITY
    FOR i ← 1 TO LEN(nums)-1 DO
        diff ← ABS(nums[i] - nums[i-1])
        minDiff ← MIN(minDiff, diff)
    RETURN minDiff
```
---

## Walkthrough

For `nums = [3, -7, 0]`:
1. Sort → `[-7, 0, 3]`
2. Differences: `|0-(-7)| = 7`, `|3-0| = 3`
3. Minimum = 3.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + scan | O(n log n) | O(1) |
---

## Follow-Up Questions

1. How would you handle a stream of numbers where you cannot store all elements?
2. Can you achieve O(n) time using a bucket sort when the value range is limited?
---

## Key Takeaway

> Sorting reduces the problem to checking adjacent pairs, giving a simple O(n log n) solution.
