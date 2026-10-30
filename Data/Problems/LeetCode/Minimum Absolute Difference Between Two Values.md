# 3880. Minimum Absolute Difference Between Two Values

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-between-two-values](https://leetcode.com/problems/minimum-absolute-difference-between-two-values)
**Companies:** Snowflake

---

## Problem Description

You are given an integer array `nums` consisting only of 0, 1, and 2.

A pair of indices `(i, j)` is called **valid** if `nums[i] == 1` and `nums[j] == 2`.

Return the **minimum** absolute difference between `i` and `j` among all valid pairs. If no valid pair exists, return -1.

The absolute difference between indices `i` and `j` is defined as `abs(i - j)`.

**Constraints:**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 2`

---

## Examples

```
Example 1:
  Input: nums = [1,0,0,2,0,1]
  Output: 2
  Explanation: The valid pairs are:
  - (0, 3) which has absolute difference of abs(0 - 3) = 3.
  - (5, 3) which has absolute difference of abs(5 - 3) = 2.
  Thus, the answer is 2.
```

```
Example 2:
  Input: nums = [1,0,1,0]
  Output: -1
  Explanation: There are no valid pairs in the array, thus the answer is -1.
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
