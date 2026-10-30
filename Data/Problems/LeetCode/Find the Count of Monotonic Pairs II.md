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
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given an array of **positive** integers `nums` of length `n`.

We call a pair of **non-negative** integer arrays `(arr1, arr2)` **monotonic** if:

- The lengths of both arrays are `n`.
- `arr1` is monotonically **non-decreasing**, in other words, `arr1[0] <= arr1[1] <= ... <= arr1[n - 1]`.
- `arr2` is monotonically **non-increasing**, in other words, `arr2[0] >= arr2[1] >= ... >= arr2[n - 1]`.
- `arr1[i] + arr2[i] == nums[i]` for all `0 <= i <= n - 1`.

Return the count of **monotonic** pairs.

Since the answer may be very large, return it **modulo** `10⁹ + 7`.

**Constraints:**
- `1 <= n == nums.length <= 2000`
- `1 <= nums[i] <= 1000`

---

## 2. Key Insight

> Once `arr1[i]` is chosen (0 ≤ arr1[i] ≤ nums[i]), `arr2[i] = nums[i] - arr1[i]`. The constraints become: `arr1[i] ≤ arr1[i+1]` and `nums[i] - arr1[i] ≥ nums[i+1] - arr1[i+1]`. Use DP on `arr1[i]` values with **prefix sum optimization** to avoid the inner loop.

---

## 3. Approach: DP with Prefix Sum Optimization — O(n · M) ✅

```text
FUNCTION countMonotonicPairs(nums):
    MOD ← 10^9 + 7
    M ← MAX(nums)
    dp ← ARRAY of size M+1, all 0
    FOR v ← 0 TO nums[0] DO
        dp[v] ← 1
    FOR i ← 1 TO n-1 DO
        // Build prefix sum of dp for O(1) range queries
        prefix ← ARRAY of size M+1, all 0
        SET running ← 0
        FOR idx ← 0 TO M DO
            running = (running + dp[idx]) MOD MOD
            prefix[idx] = running
        newDp ← ARRAY of size M+1, all 0
        FOR v ← 0 TO nums[i] DO
            // Upper bound for previous arr1 value respecting both monotonicities
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
| **Space** | O(M) — DP and prefix arrays |

---

## 5. Examples

```
Example 1:
  Input: nums = [2,3,2]
  Output: 4
  Explanation: The good pairs are:
    1. ([0, 1, 1], [2, 2, 1])
    2. ([0, 1, 2], [2, 2, 0])
    3. ([0, 2, 2], [2, 1, 0])
    4. ([1, 2, 2], [1, 1, 0])

Example 2:
  Input: nums = [5,5,5,5]
  Output: 126
```

---

## 6. Walkthrough

Take `nums = [2,2]`.
1. Initialise `dp` for the first element: `dp[0]=dp[1]=dp[2]=1` (each possible `arr1[0]`).
2. For `i = 1` (second element), compute `prefix` of `dp` → `[1,2,3]`.
3. For each possible `v` (0‑2) at position 1:
   - `v = 0`: `upperBound = MIN(0, 0 + 2 - 2) = 0` → `newDp[0] = prefix[0] = 1`.
   - `v = 1`: `upperBound = MIN(1, 1 + 2 - 2) = 1` → `newDp[1] = prefix[1] = 2`.
   - `v = 2`: `upperBound = MIN(2, 2 + 2 - 2) = 2` → `newDp[2] = prefix[2] = 3`.
4. Sum of `newDp` = 1+2+3 = 6, but the pair where both arrays are `[2,0]` and `[0,2]` is counted twice due to symmetry, giving the final answer 5.

---

## 7. Key Takeaway

> **Prefix‑sum optimisation** on the DP transition reduces the inner loop from O(M) to O(1) per state, achieving O(n·M) overall.
