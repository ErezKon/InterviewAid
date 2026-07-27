# 1574. Shortest Subarray to be Removed to Make Array Sorted

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted](https://leetcode.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted)
**Companies:** Amazon, Bloomberg, De Shaw, Goldman Sachs, Google, Meta, Razorpay, Tekion, Tiktok

---

## Problem Description

Given an array, find the length of the shortest subarray to remove so the remaining elements are non-decreasing.

---

## Approach: Two Pointers — O(n) ✅

```
FUNCTION findLengthOfShortestSubarray(arr):
    n = len(arr)

    // Find longest sorted prefix
    left = 0
    WHILE left < n - 1 AND arr[left] <= arr[left + 1]:
        left += 1
    IF left == n - 1: RETURN 0    // already sorted

    // Find longest sorted suffix
    right = n - 1
    WHILE right > 0 AND arr[right - 1] <= arr[right]:
        right -= 1

    // Option 1: remove everything after prefix
    result = right

    // Option 2: remove everything before suffix
    result = MIN(result, n - left - 1)

    // Option 3: keep some prefix + some suffix
    i, j = 0, right
    WHILE i <= left AND j < n:
        IF arr[i] <= arr[j]:
            result = MIN(result, j - i - 1)
            i += 1
        ELSE:
            j += 1

    RETURN result
```
