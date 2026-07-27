# 81. Search in Rotated Sorted Array II

**Difficulty:** 🟡 Medium
**Acceptance:** 39.0%
**LeetCode:** [https://leetcode.com/problems/search-in-rotated-sorted-array-ii](https://leetcode.com/problems/search-in-rotated-sorted-array-ii)
**Companies:** Accenture, Amazon, Bloomberg, Cisco, Google, Linkedin, Meta, Microsoft, Tcs, Uber, Walmart Labs

---

## 1. Problem Description

Like Search in Rotated Sorted Array (#33), but the array may contain **duplicates**. Return `true` if `target` is found.

---

## 2. Approach: Modified Binary Search — O(n) worst, O(log n) avg ✅

When `nums[lo] == nums[mid] == nums[hi]`, we can't determine which half is sorted. Shrink both ends.

```
FUNCTION search(nums, target):
    lo, hi = 0, n - 1

    WHILE lo <= hi:
        mid = (lo + hi) / 2

        IF nums[mid] == target:
            RETURN true

        // Can't determine sorted half
        IF nums[lo] == nums[mid] AND nums[mid] == nums[hi]:
            lo += 1
            hi -= 1
        ELSE IF nums[lo] <= nums[mid]:
            // Left half is sorted
            IF nums[lo] <= target < nums[mid]:
                hi = mid - 1
            ELSE:
                lo = mid + 1
        ELSE:
            // Right half is sorted
            IF nums[mid] < target <= nums[hi]:
                lo = mid + 1
            ELSE:
                hi = mid - 1

    RETURN false
```

---

## 3. Complexity Analysis

| Case | Time |
|------|------|
| Average | O(log n) |
| Worst (all duplicates) | O(n) |

---

## Key Takeaway

> Duplicates break the binary search invariant. The fix: when `lo == mid == hi`, shrink both ends by one. This degrades to O(n) only when many duplicates exist.
