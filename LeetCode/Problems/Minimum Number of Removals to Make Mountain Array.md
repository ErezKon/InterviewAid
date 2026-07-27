# 1671. Minimum Number of Removals to Make Mountain Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array](https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Paypal

---

## Approach: LIS from Both Sides — O(n log n) ✅

```
FUNCTION minimumMountainRemovals(nums):
    n = len(nums)
    // LIS ending at each index (from left)
    left = compute LIS lengths ending at each i
    // LIS ending at each index (from right = LDS from left)
    right = compute LIS lengths ending at each i from right

    maxMountain = 0
    FOR i ← 1 TO n - 2:
        IF left[i] >= 2 AND right[i] >= 2:
            maxMountain = MAX(maxMountain, left[i] + right[i] - 1)

    RETURN n - maxMountain
```

Mountain = LIS to peak + LDS from peak. Peak must have both sides ≥ 2.
