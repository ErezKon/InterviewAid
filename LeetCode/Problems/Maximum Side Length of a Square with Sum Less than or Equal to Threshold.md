# 1292. Maximum Side Length of a Square with Sum Less than or Equal to Threshold

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold](https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold)
**Companies:** Amazon, De Shaw, Fractal Analytics, Google, Imc

---

## Approach: 2D Prefix Sum + Binary Search — O(mn log(min(m,n))) ✅

```
FUNCTION maxSideLength(mat, threshold):
    // Build 2D prefix sum
    // Binary search on side length
    // For each candidate, check if any square of that size has sum ≤ threshold

    lo, hi = 0, MIN(m, n)
    WHILE lo < hi:
        mid = (lo + hi + 1) / 2
        IF existsSquare(prefix, mid, threshold): lo = mid
        ELSE: hi = mid - 1
    RETURN lo
```
