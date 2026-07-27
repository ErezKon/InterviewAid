# 2972. Count the Number of Incremovable Subarrays II

**Difficulty:** 🔴 Hard

**Companies:** Apple, De Shaw, Ibm

---

## Problem Description

An **incremovable** subarray is one whose removal leaves the remaining elements strictly increasing. Count incremovable subarrays.

---

## Key Insight

Find the longest strictly increasing prefix and suffix. A valid removal `[i..j]` must connect the prefix ending before `i` to the suffix starting after `j`, such that the last prefix element < first suffix element. Use **two pointers** on prefix-end and suffix-start.

---

## Approach

```
// Find longest strictly increasing prefix ending at index `left`
// Find longest strictly increasing suffix starting at index `right`
// Two pointers: for each prefix end i, find smallest valid suffix start j
//   where nums[i] < nums[j]
// Count valid (i, j) pairs → each corresponds to removing [i+1..j-1]

FUNCTION incremovableSubarrayCount(nums):
    n = LENGTH(nums)
    // Find prefix: longest i where nums[0..i] is strictly increasing
    left = 0
    WHILE left < n-1 AND nums[left] < nums[left+1]: left += 1
    IF left == n-1: RETURN n*(n+1)/2  // entire array is increasing

    right = n-1
    WHILE right > 0 AND nums[right-1] < nums[right]: right -= 1

    // Count: remove everything from some point to some point
    result = (n - right + 1)  // remove prefix [0..j-1] for each valid j
    i = 0
    WHILE i <= left DO
        WHILE right < n AND nums[i] >= nums[right]: right += 1
        result += (n - right + 1)
        i += 1

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Incremovable subarrays: find the increasing prefix and suffix, then two-pointer to count valid connections. The key constraint is prefix_last < suffix_first after removal.**
