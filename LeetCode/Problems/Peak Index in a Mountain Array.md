# 852. Peak Index in a Mountain Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/peak-index-in-a-mountain-array](https://leetcode.com/problems/peak-index-in-a-mountain-array)
**Companies:** Accenture, Amazon, Bloomberg, De Shaw, Google, Meta, Microsoft, Qualcomm, Tcs

---

## Approach: Binary Search — O(log n) ✅

```
FUNCTION peakIndexInMountainArray(arr):
    lo, hi = 0, len(arr) - 1

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF arr[mid] < arr[mid + 1]:
            lo = mid + 1    // ascending → peak is right
        ELSE:
            hi = mid        // descending → peak is left or here

    RETURN lo
```
