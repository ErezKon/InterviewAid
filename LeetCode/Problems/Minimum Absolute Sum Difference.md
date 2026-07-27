# 1818. Minimum Absolute Sum Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-sum-difference](https://leetcode.com/problems/minimum-absolute-sum-difference)
**Companies:** Uber

---

## Key Insight

> Compute the base sum of `|nums1[i] - nums2[i]|`. For each index, we can swap `nums1[i]` with any element from `nums1`. Use a **sorted copy** of `nums1` and binary search to find the best replacement for each `nums2[i]`, maximizing the **reduction** in difference.

---

## Approach: Sort + Binary Search — O(n log n) ✅

```
FUNCTION minAbsoluteSumDiff(nums1, nums2):
    MOD ← 10⁹ + 7
    sorted1 ← SORTED(nums1)
    totalDiff ← SUM(ABS(nums1[i] - nums2[i]) FOR i)
    maxSaving ← 0
    
    FOR i ← 0 TO n-1 DO
        origDiff ← ABS(nums1[i] - nums2[i])
        // Binary search for closest to nums2[i] in sorted1
        idx ← bisect_left(sorted1, nums2[i])
        IF idx < n THEN
            maxSaving ← MAX(maxSaving, origDiff - ABS(sorted1[idx] - nums2[i]))
        IF idx > 0 THEN
            maxSaving ← MAX(maxSaving, origDiff - ABS(sorted1[idx-1] - nums2[i]))
    
    RETURN (totalDiff - maxSaving) % MOD
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + binary search | **O(n log n)** | **O(n)** |

---

## Key Takeaway

> **One swap optimization** — compute the base cost, then find the single replacement that gives the maximum saving using binary search on a sorted copy.

---
