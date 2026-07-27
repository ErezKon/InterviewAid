# 3250. Find the Count of Monotonic Pairs I

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-count-of-monotonic-pairs-i](https://leetcode.com/problems/find-the-count-of-monotonic-pairs-i)
**Companies:** Arcesium, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP on arr1 Values — O(n · M²) ✅](#3-approach-dp-on-arr1-values--on--m²-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array `nums` of length `n`, count the number of pairs of arrays `(arr1, arr2)` such that `arr1` is non-decreasing, `arr2` is non-increasing, and `arr1[i] + arr2[i] == nums[i]` for all `i`. Return the count modulo `10⁹ + 7`.

**Constraints:**
- `1 <= n <= 2000`
- `1 <= nums[i] <= 50`

---

## 2. Key Insight

> Fix `arr1[i]` at each position (0 ≤ arr1[i] ≤ nums[i]). Then `arr2[i] = nums[i] - arr1[i]`. The monotonicity constraints on both arrays translate to: `arr1[i-1] ≤ arr1[i]` and `arr1[i] - arr1[i-1] ≥ nums[i] - nums[i-1]`.

---

## 3. Approach: DP on arr1 Values — O(n · M²) ✅

```
FUNCTION countMonotonicPairs(nums):
    MOD ← 10^9 + 7
    n ← LENGTH(nums)
    // dp[v] = number of ways where arr1[i] = v
    dp ← [1 if v <= nums[0] else 0 for v in 0..50]

    FOR i ← 1 TO n-1 DO
        newDp ← [0] * 51
        FOR v ← 0 TO nums[i] DO
            FOR prev ← 0 TO v DO
                // Check arr2 constraint: nums[i-1]-prev >= nums[i]-v
                IF nums[i-1] - prev >= nums[i] - v THEN
                    newDp[v] = (newDp[v] + dp[prev]) MOD MOD
        dp ← newDp

    RETURN SUM(dp) MOD MOD
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · M²) where M = max(nums) ≤ 50 |
| **Space** | O(M) — DP array |

---

## 5. Key Takeaway

> **Reduce to single-array DP**: since `arr2` is determined by `arr1`, the problem becomes a standard "count non-decreasing sequences with constraints" DP. For larger M, optimize with prefix sums (see Part II).
