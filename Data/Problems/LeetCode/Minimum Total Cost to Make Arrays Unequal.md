# 2499. Minimum Total Cost to Make Arrays Unequal

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-total-cost-to-make-arrays-unequal](https://leetcode.com/problems/minimum-total-cost-to-make-arrays-unequal)
**Companies:** Razorpay

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy + Majority Element — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given two **0-indexed** integer arrays `nums1` and `nums2`, of equal length `n`.

In one operation, you can swap the values of any two indices of `nums1`. The **cost** of this operation is the **sum** of the indices.

Find the **minimum** total cost of performing the given operation **any** number of times such that `nums1[i] != nums2[i]` for all `0 <= i <= n - 1` after performing all the operations.

Return *the **minimum total cost** such that *`nums1` and `nums2`* satisfy the above condition*. In case it is not possible, return `-1`.

**Constraints:**
- `n == nums1.length == nums2.length`
- `1 <= n <= 10^5`
- `1 <= nums1[i], nums2[i] <= n`

---

## 2. Key Insight

> Positions where `nums1[i] == nums2[i]` are "conflicts." Swapping two conflict positions costs `i + j` and fixes both. The tricky case: if one value dominates among conflicts (majority element), we may need to involve non-conflict positions. Count the majority and handle it greedily.

---

## 3. Approach: Greedy + Majority — O(n) ✅

```text
FUNCTION minimumTotalCost(nums1, nums2):
    // Identify conflict indices where values are equal
    SET conflicts ← []
    FOR i ← 0 TO LENGTH(nums1)-1:
        IF nums1[i] == nums2[i]:
            APPEND i TO conflicts
    // Base cost is sum of conflict indices (pairing each with itself)
    SET cost ← SUM(conflicts)
    // Frequency of values at conflict positions
    SET freq ← MAP()
    FOR idx IN conflicts:
        SET val ← nums1[idx]
        INCREMENT freq[val]
    // Find majority value among conflicts
    SET majorityVal, majorityCount ← VALUE WITH MAX(freq)
    // Excess conflicts that cannot be paired among themselves
    SET excess ← 2 * majorityCount - LENGTH(conflicts)
    IF excess <= 0:
        RETURN cost
    // Need additional non-conflict positions with a different value
    FOR i ← 0 TO LENGTH(nums1)-1:
        IF i NOT IN conflicts AND nums1[i] != majorityVal AND nums2[i] != majorityVal:
            SET cost ← cost + i
            SET excess ← excess - 1
            IF excess == 0:
                RETURN cost
    RETURN -1
```

---

## 4. Examples

**Example 1:**
```
Input: nums1 = [1,2,3,4,5], nums2 = [1,2,3,4,5]
Output: 10
Explanation: One of the ways we can perform the operations is:
- Swap values at indices 0 and 3, incurring cost = 0 + 3 = 3. Now, nums1 = [4,2,3,1,5]
- Swap values at indices 1 and 2, incurring cost = 1 + 2 = 3. Now, nums1 = [4,3,2,1,5].
- Swap values at indices 0 and 4, incurring cost = 0 + 4 = 4. Now, nums1 =[5,3,2,1,4].
We can see that for each index i, nums1[i] != nums2[i]. The cost required here is 10.
Note that there are other ways to swap values, but it can be proven that it is not possible to obtain a cost less than 10.
```

**Example 2:**
```
Input: nums1 = [2,2,2,1,3], nums2 = [1,2,2,3,3]
Output: 10
Explanation: One of the ways we can perform the operations is:
- Swap values at indices 2 and 3, incurring cost = 2 + 3 = 5. Now, nums1 = [2,2,1,2,3].
- Swap values at indices 1 and 4, incurring cost = 1 + 4 = 5. Now, nums1 = [2,3,1,2,2].
The total cost needed here is 10, which is the minimum possible.
```

**Example 3:**
```
Input: nums1 = [1,2,2], nums2 = [1,2,2]
Output: -1
Explanation: It can be shown that it is not possible to satisfy the given conditions irrespective of the number of operations we perform.
Hence, we return -1.
```

---

## 5. Walkthrough

Consider the first example `nums1 = [1,2,3,4]`, `nums2 = [1,2,3,5]`.

| Step | Conflict Indices | Majority Value | Excess | Action | Cumulative Cost |
|------|------------------|----------------|--------|--------|-----------------|
| 1 | [0,1,2] | none (max count =1) | 0 | Pair each conflict with itself (cost = index) | 0+1+2 = 3 |
| 2 | No remaining excess | — | — | Return cost |

The algorithm identifies conflicts, sees no majority, and simply sums the indices.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) — frequency map and conflict list |

---

## 7. Key Takeaway

> **Majority element drives the difficulty.** If one conflicting value appears > half the time, we must involve additional non-conflict positions. Otherwise, conflicts can be paired among themselves.
