# 2970. Count the Number of Incremovable Subarrays I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-i](https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-i)
**Companies:** Apple, Microsoft

---

## Problem Description

Same as the Hard version (II) but with small constraints (n ≤ 50), allowing O(n³) brute force.

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: 10
Explanation: All possible subarrays can be removed and the remaining array stays strictly increasing.
```

**Example 2:**
```
Input: nums = [4,3,2,1]
Output: 4
Explanation: Only removing the entire array or a single element results in a strictly increasing remaining array.
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