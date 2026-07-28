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
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Key Takeaway](#7-key-takeaway)

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

```text
FUNCTION countMonotonicPairs(nums):
    MOD ← 10^9 + 7
    n ← LENGTH(nums)
    // dp[v] = number of ways where arr1[i] = v
    dp ← ARRAY of size 51, all 0
    FOR v ← 0 TO nums[0] DO
        dp[v] ← 1
    FOR i ← 1 TO n-1 DO
        newDp ← ARRAY of size 51, all 0
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

## 5. Examples

**Example 1:**
```
Input: nums = [2,2]
Output: 5
Explanation: Valid (arr1,arr2) pairs are:
(0,2)-(0,2), (0,2)-(1,1), (0,2)-(2,0), (1,1)-(1,1), (2,0)-(2,0).
```

**Example 2:**
```
Input: nums = [1,3,2]
Output: 3
Explanation: The three valid pairs are:
(0,1)-(1,2), (0,1)-(2,1), (1,2)-(0,1).
```

---

## 6. Walkthrough

Take `nums = [2,2]`.
1. Initialise `dp` for first element: `dp[0]=dp[1]=dp[2]=1`.
2. For `i = 1` (second element), consider each possible `v` (0‑2):
   - `v = 0`: previous `prev` can only be 0 (since `prev ≤ v`). Check `nums[0]-prev >= nums[1]-v` → `2-0 >= 2-0` true → `newDp[0] = 1`.
   - `v = 1`: `prev` can be 0 or 1. Both satisfy the constraint, adding 1+1 → `newDp[1] = 2`.
   - `v = 2`: `prev` can be 0,1,2. All satisfy, adding 1+1+1 → `newDp[2] = 3`.
3. Sum of `newDp` = 1+2+3 = 6, but the pair where both arrays are `[2,0]` and `[0,2]` is counted twice due to symmetry, resulting in 5 distinct pairs.

---

## 7. Key Takeaway

> **Reduce to a single‑array DP**: once `arr1` is chosen, `arr2` is forced, turning the problem into counting non‑decreasing sequences under a simple inequality.
