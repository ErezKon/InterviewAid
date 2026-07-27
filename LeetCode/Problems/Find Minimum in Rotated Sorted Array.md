# 153. Find Minimum in Rotated Sorted Array

**Difficulty:** 🟡 Medium
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/find-minimum-in-rotated-sorted-array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array)
**Companies:** Amazon, Apple, Bloomberg, Flipkart, Goldman Sachs, Google, Ibm, Infosys, Linkedin, Meta, Microsoft, Oracle, Tcs, Tiktok, Uber, Walmart Labs, Yandex

---

## 1. Problem Description

Given a sorted rotated array with unique elements, find the minimum element in O(log n).

---

## 2. Approach: Binary Search — O(log n) ✅

```
FUNCTION findMin(nums):
    lo, hi = 0, len(nums) - 1

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF nums[mid] > nums[hi]:
            lo = mid + 1       // min is in the right half
        ELSE:
            hi = mid           // min is at mid or left of mid

    RETURN nums[lo]
```

### Why compare with `hi`?

If `nums[mid] > nums[hi]`, the rotation point (minimum) is between `mid+1` and `hi`. Otherwise, the minimum is at `mid` or to its left.

| Time | Space |
|------|-------|
| O(log n) | O(1) |

---

## Follow-Up: With duplicates (#154)?

When `nums[mid] == nums[hi]`, can't determine which half → `hi -= 1`. Worst case O(n).

---

## Key Takeaway

> Binary search comparing `mid` with `hi` (not `lo`). The unsorted half always contains the minimum.
