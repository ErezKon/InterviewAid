# 2762. Continuous Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/continuous-subarrays](https://leetcode.com/problems/continuous-subarrays)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description
You are given a **0-indexed** integer array `nums`. A subarray of `nums` is called **continuous** if:

- Let `i`, `i + 1`, ..., `j` be the indices in the subarray. Then, for each pair of indices `i <= i1, i2 <= j`, `0 <= |nums[i1] - nums[i2]| <= 2`.

Return *the total number of **continuous** subarrays.*

A subarray is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## Examples
```
Example 1:
  Input: nums = [5,4,2,4]
  Output: 8
  Explanation:
    Continuous subarray of size 1: [5], [4], [2], [4].
    Continuous subarray of size 2: [5,4], [4,2], [2,4].
    Continuous subarray of size 3: [4,2,4].
    There are no subarrys of size 4.
    Total continuous subarrays = 4 + 3 + 1 = 8.
    It can be shown that there are no more continuous subarrays.
```
```
Example 2:
  Input: nums = [1,2,3]
  Output: 6
  Explanation:
    Continuous subarray of size 1: [1], [2], [3].
    Continuous subarray of size 2: [1,2], [2,3].
    Continuous subarray of size 3: [1,2,3].
    Total continuous subarrays = 3 + 2 + 1 = 6.
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
