# 2809. Minimum Time to Make Array Sum At Most x

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-make-array-sum-at-most-x](https://leetcode.com/problems/minimum-time-to-make-array-sum-at-most-x)
**Companies:** Jane Street

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + DP — O(n²)](#4-approach-sort--dp--on²)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given two **0-indexed** integer arrays `nums1` and `nums2` of equal length. Every second, for all indices `0 <= i < nums1.length`, value of `nums1[i]` is incremented by `nums2[i]`. **After** this is done, you can do the following operation:

- Choose an index `0 <= i < nums1.length` and make `nums1[i] = 0`.

You are also given an integer `x`.

Return *the **minimum** time in which you can make the sum of all elements of *`nums1`* to be** less than or equal** to *`x`, *or *`-1`* if this is not possible.*

**Constraints:**
- `1 <= nums1.length <= 10^3`
- `1 <= nums1[i] <= 10^3`
- `0 <= nums2[i] <= 10^3`
- `nums1.length == nums2.length`
- `0 <= x <= 10^6`

---

## 2. Examples

**Example 1:**
```
Input: nums1 = [1,2,3], nums2 = [1,2,3], x = 4
Output: 3
Explanation: For the 1st second, we apply the operation on i = 0. Therefore nums1 = [0,2+2,3+3] = [0,4,6].
For the 2nd second, we apply the operation on i = 1. Therefore nums1 = [0+1,0,6+3] = [1,0,9].
For the 3rd second, we apply the operation on i = 2. Therefore nums1 = [1+1,0+2,0] = [2,2,0].
Now sum of nums1 = 4. It can be shown that these operations are optimal, so we return 3.
```

**Example 2:**
```
Input: nums1 = [1,2,3], nums2 = [3,3,3], x = 4
Output: -1
Explanation: It can be shown that the sum of nums1 will always be greater than x, no matter which operations are performed.
```

---

## 3. Key Insight

> After `t` seconds, if we zero out elements at times `t₁ < t₂ < ... < tₖ`, element `i` zeroed at time `tⱼ` saves `nums1[i] + nums2[i] * tⱼ`. Sorting by `nums2[i]` and assigning later times to larger `nums2[i]` yields a greedy ordering, but we still need to choose which elements to reset. This becomes a 0/1 knapsack‑style DP where `dp[j]` stores the maximum total savings using `j` resets.

---

## 4. Approach: Sort + DP — O(n²) ✅

```text
FUNCTION minimumTime(nums1, nums2, x):
    n ← LENGTH(nums1)
    pairs ← SORT zip(nums2, nums1) BY nums2 ASC
    dp[0 ← 0] ← 0
    FOR i ← 0 TO n - 1:
        FOR j ← i + 1 DOWN TO 1:
            // reset element i as the j‑th operation
            saved ← pairs[i].second + pairs[i].first * j
            dp[j] ← MAX(dp[j], dp[j-1] + saved)
    total1 ← SUM(nums1)
    total2 ← SUM(nums2)
    FOR t ← 0 TO n:
        IF total1 + total2 * t - dp[t] <= x:
            RETURN t
    RETURN -1
```

---

## 5. Walkthrough

Take `nums1 = [3,1,4]`, `nums2 = [2,2,1]`, `x = 5`.

1. **Sort pairs** by `nums2`: `[(1,4), (2,3), (2,1)]`.
2. **DP table** initially `dp = [0, -∞, -∞, -∞]`.
3. Process first pair `(1,4)`:
   - `j=1`: `saved = 4 + 1*1 = 5`; `dp[1] = 5`.
4. Process second pair `(2,3)`:
   - `j=2`: `saved = 3 + 2*2 = 7`; `dp[2] = dp[1]+7 = 12`.
   - `j=1`: `saved = 3 + 2*1 = 5`; `dp[1] = max(5,5)=5`.
5. Process third pair `(2,1)`:
   - `j=3`: `saved = 1 + 2*3 = 7`; `dp[3] = dp[2]+7 = 19`.
   - `j=2`: `saved = 1 + 2*2 = 5`; `dp[2] = max(12, dp[1]+5=10)=12`.
   - `j=1`: `saved = 1 + 2*1 = 3`; `dp[1] = max(5,3)=5`.
6. **Check t values**:
   - `t=0`: `total = 3+1+4 = 8` > 5.
   - `t=1`: `total = 8 + (2+2+1)*1 - dp[1]=8+5-5=8` >5.
   - `t=2`: `total = 8 + 5*2 - dp[2]=8+10-12=6` >5.
   - `t=3`: `total = 8 + 5*3 - dp[3]=8+15-19=4` ≤5 → answer `3` seconds.
   (In this example the optimal schedule uses three resets.)

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) — knapsack‑style DP |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

- How would the solution change if you could reset **multiple** elements per second?
- Can the DP be optimized to O(n·log n) using a priority queue?
- What if `nums2` values could be negative, representing decay instead of growth?

---

## 8. Key Takeaway

> **Sort by growth rate + knapsack DP.** Elements with higher `nums2[i]` should be zeroed later (saving more). The DP computes maximum total savings for a given number of resets, enabling the minimal‑time decision.
