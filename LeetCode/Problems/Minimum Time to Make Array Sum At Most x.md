# 2809. Minimum Time to Make Array Sum At Most x

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-make-array-sum-at-most-x](https://leetcode.com/problems/minimum-time-to-make-array-sum-at-most-x)
**Companies:** Jane Street

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + DP — O(n²)](#3-approach-sort--dp--on²)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Two arrays `nums1` and `nums2`. Each second, `nums1[i] += nums2[i]`. You can zero out one element of `nums1` per second. Return the **minimum** seconds so `sum(nums1) <= x`, or `-1`.

**Constraints:**
- `1 <= nums1.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 1000`
- `0 <= x <= 10⁶`

---

## 2. Key Insight

> After `t` seconds, if we zero out elements at times `t₁ < t₂ < ... < tₖ`, element `i` zeroed at time `tⱼ` saves `nums1[i] + nums2[i] * tⱼ`. Sort by `nums2[i]` and assign later times to larger `nums2[i]` (greedy). DP: `dp[j]` = max savings using `j` operations.

---

## 3. Approach: Sort + DP — O(n²) ✅

```
FUNCTION minimumTime(nums1, nums2, x):
    n = len(nums1)
    pairs = SORT zip(nums2, nums1) BY nums2 ASC
    
    dp = [0] * (n + 1)  // dp[j] = max savings with j resets
    FOR i ← 0 TO n - 1:
        FOR j ← i + 1 DOWN TO 1:
            dp[j] = MAX(dp[j], dp[j-1] + pairs[i][1] + pairs[i][0] * j)
    
    s1 = SUM(nums1), s2 = SUM(nums2)
    FOR t ← 0 TO n:
        IF s1 + s2 * t - dp[t] <= x:
            RETURN t
    RETURN -1
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) — knapsack-style DP |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Sort by growth rate + knapsack DP.** Elements with higher `nums2[i]` should be zeroed later (saving more). The DP computes maximum total savings for `j` resets, which is a 0/1 knapsack variant.
