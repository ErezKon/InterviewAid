# 2762. Continuous Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/continuous-subarrays](https://leetcode.com/problems/continuous-subarrays)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description
Given an integer array `nums`, a subarray is **continuous** if the difference between its maximum and minimum elements is at most `2`. Return the total number of continuous subarrays. A subarray is a contiguous part of the array.

## Examples
**Example 1:**
```
Input: nums = [1,2,3]
Output: 6
Explanation: All subarrays are continuous: [1], [2], [3], [1,2], [2,3], [1,2,3].
```
**Example 2:**
```
Input: nums = [1,5,2]
Output: 4
Explanation: Continuous subarrays are [1], [5], [2], [2,5] (max‑min = 3 > 2, so not counted).
```

## Approach
Use a sliding window with a balanced sorted container to maintain the current window's minimum and maximum.

```text
FUNCTION continuousSubarrays(nums):
    SET sl ← empty SortedList   // supports O(log n) insert, delete, min, max
    SET left ← 0
    SET count ← 0

    FOR right ← 0 TO LENGTH(nums) - 1:
        sl.ADD(nums[right])
        WHILE sl.MAX() - sl.MIN() > 2:
            sl.REMOVE(nums[left])
            left ← left + 1
        // all subarrays ending at right and starting between left and right are valid
        count ← count + (right - left + 1)

    RETURN count
```

## Walkthrough
| Step | right | added value | window values | left | valid subarrays added |
|------|-------|------------|---------------|------|----------------------|
| 1 | 0 | 1 | [1] | 0 | 1 |
| 2 | 1 | 2 | [1,2] | 0 | 2 |
| 3 | 2 | 3 | [1,2,3] | 0 | 3 |
Total = 6.

## Complexity Analysis
- **Time:** O(n log n) due to sorted‑list operations for each element.
- **Space:** O(n) for the container holding at most the current window.

## Follow-Up Questions
1. How would you solve the problem in O(n) time without a balanced tree?
2. What changes are needed if the allowed difference is a variable `k`?
3. Can the approach be adapted for streaming data where the array is not fully known?

## Key Takeaway
Maintaining min and max with a sorted container lets a sliding window efficiently enforce the `max‑min ≤ 2` constraint, turning a naïve O(n²) enumeration into O(n log n).
