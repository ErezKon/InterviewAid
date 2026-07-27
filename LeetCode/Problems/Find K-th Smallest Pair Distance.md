# 719. Find K-th Smallest Pair Distance

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-k-th-smallest-pair-distance](https://leetcode.com/problems/find-k-th-smallest-pair-distance)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Uber

---

## Approach: Binary Search + Two Pointers — O(n log n + n log W) ✅

```
FUNCTION smallestDistancePair(nums, k):
    SORT nums
    lo, hi = 0, nums[-1] - nums[0]

    WHILE lo < hi:
        mid = (lo + hi) / 2
        count = countPairs(nums, mid)
        IF count >= k: hi = mid
        ELSE: lo = mid + 1

    RETURN lo

FUNCTION countPairs(nums, maxDist):
    count = 0; left = 0
    FOR right ← 0 TO n - 1:
        WHILE nums[right] - nums[left] > maxDist:
            left += 1
        count += right - left
    RETURN count
```

---

## Problem Description

Given an integer array, find the k-th smallest absolute difference among all pairs.

---

## Key Takeaway

> **Binary search on the answer (distance), count pairs ≤ mid using sorted array + two pointers. Classic "binary search on answer" pattern.**
