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

Given `nums1` and `nums2`, swap `nums1[i]` and `nums1[j]` at cost `i + j`. Make `nums1[i] != nums2[i]` for all `i`. Return **minimum** total cost, or `-1`.

**Constraints:**
- `1 <= n <= 10⁵`

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
    // Need additional non‑conflict positions with a different value
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

| nums1 | nums2 | Expected Cost |
|-------|-------|---------------|
| [1,2,3,4] | [1,2,3,5] | 3 |
| [5,5,5] | [5,5,5] | -1 |
| [1,2,3,4,5] | [5,4,3,2,1] | 0 |

**Explanation**:
- In the first case, conflicts at indices `0,1,2` (values `1,2,3`). No majority, so pairing them costs `0+1+2 = 3`.
- In the second case, all three positions have the same value `5`, which is a majority > half of conflicts, and there are no non‑conflict positions to break the majority, so impossible.
- In the third case, no conflicts, cost is `0`.

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

> **Majority element drives the difficulty.** If one conflicting value appears > half the time, we must involve additional non‑conflict positions. Otherwise, conflicts can be paired among themselves.
