# 2970. Count the Number of Incremovable Subarrays I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-i](https://leetcode.com/problems/count-the-number-of-incremovable-subarrays-i)
**Companies:** Apple, Microsoft

---

## Problem Description

Same as the Hard version (II) but with small constraints (n ≤ 50), allowing O(n³) brute force.

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
            IF isStrictlyIncreasing(remaining): count += 1
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n³) |
| **Space** | O(n) |

---

## Key Takeaway

> **For n ≤ 50, brute-force all O(n²) subarray removals and check each in O(n). The Hard version optimizes to O(n) using prefix/suffix + two pointers.**
