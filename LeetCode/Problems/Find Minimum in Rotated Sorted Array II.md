# 154. Find Minimum in Rotated Sorted Array II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION findMin(nums):
    lo, hi = 0, len(nums) - 1
    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF nums[mid] > nums[hi]: lo = mid + 1
        ELSE IF nums[mid] < nums[hi]: hi = mid
        ELSE: hi -= 1    // handle duplicates
    RETURN nums[lo]
```

Worst case O(n) due to duplicates, average O(log n).
