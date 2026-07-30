# 1574. Shortest Subarray to be Removed to Make Array Sorted

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted](https://leetcode.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted)
**Companies:** Amazon, Bloomberg, De Shaw, Goldman Sachs, Google, Meta, Razorpay, Tekion, Tiktok
---

## Problem Description

Given an integer array, remove a contiguous subarray (possibly empty) such that the remaining elements are in non‑decreasing order. Return the length of the shortest subarray that can be removed.

---

## Approach: Two Pointers — O(n) ✅

```
FUNCTION findLengthOfShortestSubarray(arr):
    n = len(arr)

    // Find longest non‑decreasing prefix
    left = 0
    WHILE left < n - 1 AND arr[left] <= arr[left + 1]:
        left += 1
    IF left == n - 1: RETURN 0    // already sorted

    // Find longest non‑decreasing suffix
    right = n - 1
    WHILE right > 0 AND arr[right - 1] <= arr[right]:
        right -= 1

    // Option 1: remove suffix after prefix
    result = right

    // Option 2: remove prefix before suffix
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

---

## Examples

**Example 1:**
```
Input: arr = [1,2,3,10,4,2,3,5]
Output: 3
Explanation: Remove the subarray [10,4,2] to obtain [1,2,3,3,5] which is non‑decreasing.
```

**Example 2:**
```
Input: arr = [5,4,3,2,1]
Output: 4
Explanation: Remove the first four elements, leaving [1].
```

---

## Walkthrough

| Step | Prefix Index | Suffix Index | Action |
|------|--------------|--------------|--------|
| 1 | left = 2 (value 3) | right = 7 (value 5) | Longest prefix `[1,2,3]` and suffix `[5]` identified. |
| 2 | i = 0, j = 7 | arr[i] ≤ arr[j] (1 ≤ 5) | Remove subarray between i and j → length 6, update result to 6. |
| 3 | i = 1, j = 7 | 2 ≤ 5 | Remove length 5, result = 5. |
| 4 | i = 2, j = 7 | 3 ≤ 5 | Remove length 4, result = 4. |
| 5 | i = 3, j = 7 | 10 > 5 → j++ (j out of bounds) |
| 6 | Switch to option removing suffix: result = right = 6. |
| 7 | Switch to option removing prefix: result = n‑left‑1 = 5. |
| 8 | Minimum result found is 3 (removing `[10,4,2]`). |

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) — single pass to find prefix, suffix, and merge step | O(1) |

---

## Follow-Up Questions

1. How would you adapt the algorithm if the array could contain negative numbers and you needed to make it strictly increasing?
2. Can the approach be extended to handle removal of at most two subarrays?

---

## Key Takeaway

> Use two pointers to locate the longest sorted prefix and suffix, then try to connect them with minimal removal. This yields an O(n) solution.
