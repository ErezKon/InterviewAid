# 1095. Find in Mountain Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-in-mountain-array](https://leetcode.com/problems/find-in-mountain-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

## Approach: Three Binary Searches — O(log n) ✅

```
FUNCTION findInMountainArray(target, mountainArr):
    n = mountainArr.length()

    // 1. Find peak
    lo, hi = 0, n - 1
    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF mountainArr.get(mid) < mountainArr.get(mid + 1): lo = mid + 1
        ELSE: hi = mid
    peak = lo

    // 2. Binary search ascending side
    lo, hi = 0, peak
    WHILE lo <= hi:
        mid = (lo + hi) / 2
        val = mountainArr.get(mid)
        IF val == target: RETURN mid
        IF val < target: lo = mid + 1
        ELSE: hi = mid - 1

    // 3. Binary search descending side
    lo, hi = peak, n - 1
    WHILE lo <= hi:
        mid = (lo + hi) / 2
        val = mountainArr.get(mid)
        IF val == target: RETURN mid
        IF val > target: lo = mid + 1
        ELSE: hi = mid - 1

    RETURN -1
```
