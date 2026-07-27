# 2499. Minimum Total Cost to Make Arrays Unequal

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-total-cost-to-make-arrays-unequal](https://leetcode.com/problems/minimum-total-cost-to-make-arrays-unequal)
**Companies:** Razorpay

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy + Majority Element — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `nums1` and `nums2`, swap `nums1[i]` and `nums1[j]` at cost `i + j`. Make `nums1[i] != nums2[i]` for all `i`. Return **minimum** total cost, or `-1`.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Positions where `nums1[i] == nums2[i]` are "conflicts." Swapping two conflict positions costs `i + j` and fixes both. The tricky case: if one value dominates among conflicts (majority element), we may need to involve non-conflict positions. Count the majority and handle it greedily.

---

## 3. Approach: Greedy + Majority — O(n) ✅

```
FUNCTION minimumTotalCost(nums1, nums2):
    conflicts = indices where nums1[i] == nums2[i]
    cost = SUM(conflicts)
    count = frequency map of nums1[i] for conflict positions
    majority = max frequency value
    majorityVal = the value with max frequency
    excess = 2 * majority - len(conflicts)

    IF excess <= 0: RETURN cost  // can pair conflicts among themselves

    // Need 'excess' more non-conflict positions with val != majorityVal
    FOR i ← 0 TO n-1 (non-conflict, nums1[i] != majorityVal, nums2[i] != majorityVal):
        cost += i
        excess -= 1
        IF excess == 0: RETURN cost

    RETURN -1
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) — frequency map |

---

## 5. Key Takeaway

> **Majority element drives the difficulty.** If one conflicting value appears > half the time, we must involve additional non-conflict positions. Otherwise, conflicts can be paired among themselves.
