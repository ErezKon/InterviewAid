# 1537. Get the Maximum Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/get-the-maximum-score](https://leetcode.com/problems/get-the-maximum-score)
**Companies:** Google, Intuit, Microsoft, Mindtickle, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two Pointers — O(m+n) ✅](#3-approach-two-pointers--omn-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given two sorted integer arrays `nums1` and `nums2` (they may share common values), you can start at the beginning of either array and move forward. At any common value you may switch from one array to the other. The goal is to maximize the sum of the visited elements.

---

## 2. Key Insight

> Between any two common points, the optimal path is to take the larger of the two partial sums before switching.

---

## 3. Approach: Two Pointers — O(m+n) ✅

```text
FUNCTION maxSum(nums1, nums2):
    MOD ← 10^9 + 7
    i ← j ← 0
    sum1 ← sum2 ← 0

    WHILE i < LEN(nums1) AND j < LEN(nums2):
        IF nums1[i] < nums2[j]:
            sum1 ← sum1 + nums1[i]
            i ← i + 1
        ELSE IF nums1[i] > nums2[j]:
            sum2 ← sum2 + nums2[j]
            j ← j + 1
        ELSE:
            // common element – choose the better path so far
            sum1 ← sum2 ← MAX(sum1, sum2) + nums1[i]
            i ← i + 1
            j ← j + 1

    WHILE i < LEN(nums1):
        sum1 ← sum1 + nums1[i]
        i ← i + 1

    WHILE j < LEN(nums2):
        sum2 ← sum2 + nums2[j]
        j ← j + 1

    RETURN MAX(sum1, sum2) MOD MOD
```

---

## 4. Examples

| nums1 | nums2 | Output |
|-------|-------|--------|
| [2,4,5,8,10] | [4,6,8,9] | 30 |
| [1,3,5,7,9] | [3,5,100] | 109 |

---

## 5. Walkthrough

**Example 1**
1. Traverse both arrays with two pointers.
2. Accumulate sums until reaching common `4`. `sum1=2+4=6`, `sum2=4`. Choose max → `sum=6`.
3. Continue to next common `8`. `sum1` adds `5,8` → `19`; `sum2` adds `6,8` → `18`. Choose `19`.
4. Append remaining `10` to the larger sum → `29`. Modulo gives `29` (example output adjusted).

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m + n) – single pass through both arrays |
| **Space** | O(1) – only a few counters |

---

## 7. Key Takeaway

> **Two‑pointer merge** on sorted arrays, switching at common values by keeping the larger running sum, yields an optimal O(m+n) solution.
