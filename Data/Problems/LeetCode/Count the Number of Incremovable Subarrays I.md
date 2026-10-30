# 2970. Count the Number of Incremovable Subarrays I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-i](https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-i)
**Companies:** Apple, Microsoft

---

## Problem Description

You are given a **0-indexed** array of **positive** integers `nums`.

A subarray of `nums` is called **incremovable** if `nums` becomes **strictly increasing** on removing the subarray. For example, the subarray `[3, 4]` is an incremovable subarray of `[5, 3, 4, 6, 7]` because removing this subarray changes the array `[5, 3, 4, 6, 7]` to `[5, 6, 7]` which is strictly increasing.

Return *the total number of **incremovable** subarrays of* `nums`.

**Note** that an empty array is considered strictly increasing.

A **subarray** is a contiguous non-empty sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 50`
- `1 <= nums[i] <= 50`

---

## Examples

```
Example 1:
  Input: nums = [1,2,3,4]
  Output: 10
  Explanation: The 10 incremovable subarrays are: [1], [2], [3], [4], [1,2], [2,3], [3,4], [1,2,3], [2,3,4], and [1,2,3,4], because on removing any one of these subarrays nums becomes strictly increasing. Note that you cannot select an empty subarray.
```

```
Example 2:
  Input: nums = [6,5,7,8]
  Output: 7
  Explanation: The 7 incremovable subarrays are: [5], [6], [5,7], [6,5], [5,7,8], [6,5,7] and [6,5,7,8].
  It can be shown that there are only 7 incremovable subarrays in nums.
```

```
Example 3:
  Input: nums = [8,7,6,6]
  Output: 3
  Explanation: The 3 incremovable subarrays are: [8,7,6], [7,6,6], and [8,7,6,6]. Note that [8,7] is not an incremovable subarray because after removing [8,7] nums becomes [6,6], which is sorted in ascending order but not strictly increasing.
```

---

## Approach

```
FUNCTION incremovableSubarrayCount(nums):
    n = LENGTH(nums)
    count = 0
    FOR i ← 0 TO n - 1 DO
        FOR j ← i TO n - 1 DO
            // Check if removing [i..j] leaves a strictly increasing array
            remaining = nums[:i] + nums[j+1:]
            IF isStrictlyIncreasing(remaining): count ← count + 1
    RETURN count
```

---

## Walkthrough

Consider `nums = [1,2,3,4]` (n = 4).
| i | j | removed subarray | remaining array | strictly increasing? |
|---|---|------------------|----------------|----------------------|
|0|0|[1]|[2,3,4]|Yes|
|0|1|[1,2]|[3,4]|Yes|
|0|2|[1,2,3]|[4]|Yes|
|0|3|[1,2,3,4]|[]|Yes (empty considered increasing)|
|1|1|[2]|[1,3,4]|Yes|
|...|...|...|...|...|
All 10 possible (i,j) pairs satisfy the condition, giving count = 10.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n³) – two nested loops over subarrays and O(n) check per removal |
| **Space** | O(n) – for the temporary `remaining` array |

---

## Follow-Up Questions

1. How can we reduce the time complexity to O(n) for larger `n`?
2. Can we handle the case where the array may contain duplicate values?
3. How would the solution change if we needed to count subarrays whose removal makes the array non‑decreasing instead of strictly increasing?

---

## Key Takeaway

> **For n ≤ 50, brute‑force all O(n²) subarray removals and check each in O(n). The Hard version optimizes to O(n) using prefix/suffix and two‑pointer techniques.**