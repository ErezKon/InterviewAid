# 3251. Find the Count of Monotonic Pairs II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-count-of-monotonic-pairs-ii](https://leetcode.com/problems/find-the-count-of-monotonic-pairs-ii)
**Companies:** Bny Mellon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP with Prefix Sum Optimization — O(n · M) ✅](#3-approach-dp-with-prefix-sum-optimization--on--m-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array `nums` of length `n`, count the number of pairs of arrays `(arr1, arr2)` such that `arr1` is non-decreasing, `arr2` is non-increasing, and `arr1[i] + arr2[i] == nums[i]` for all `i`. Return the count modulo `10⁹ + 7`.

This is the harder version with larger constraints.

**Constraints:**
- `1 <= n <= 2000`
- `1 <= nums[i] <= 1000`

---

## 2. Key Insight

> Once `arr1[i]` is chosen (0 ≤ arr1[i] ≤ nums[i]), `arr2[i] = nums[i] - arr1[i]`. The constraints become: `arr1[i] ≤ arr1[i+1]` and `nums[i] - arr1[i] ≥ nums[i+1] - arr1[i+1]`. Use DP on `arr1[i]` values with **prefix sum optimization** to avoid the inner loop.

---

## 3. Approach: DP with Prefix Sum Optimization — O(n · M) ✅

```
FUNCTION countMonotonicPairs(nums):
    MOD ← 10^9 + 7
    M ← MAX(nums)
    dp ← array of size M+1, dp[v] = 1 for v in 0..nums[0]

    FOR i ← 1 TO n-1 DO
        // Build prefix sum of dp
        prefix ← prefix_sum(dp)
        newDp ← array of size M+1, all 0
        FOR v ← 0 TO nums[i] DO
            // arr1[i]=v, arr1[i-1] ≤ v, and arr2 constraint
            upperBound ← MIN(v, v + nums[i-1] - nums[i])
            IF upperBound >= 0 THEN
                newDp[v] = prefix[upperBound]
        dp ← newDp

    RETURN SUM(dp) MOD MOD
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · M) where M = max(nums) |
| **Space** | O(M) — DP array |

---

## 5. Key Takeaway

> **Prefix sum optimization** on the DP transition reduces the inner loop from O(M) to O(1) per state, making the overall complexity O(n · M) instead of O(n · M²).
