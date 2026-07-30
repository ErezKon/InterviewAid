# 1874. Minimize Product Sum of Two Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-product-sum-of-two-arrays](https://leetcode.com/problems/minimize-product-sum-of-two-arrays)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two arrays `nums1` and `nums2` of equal length, rearrange them to **minimize** `Σ(nums1[i] * nums2[i])`.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ nums1[i], nums2[i] ≤ 100`

---

## Examples

**Example 1:**
```
Input:  nums1 = [5, 3, 4, 2], nums2 = [4, 2, 2, 5]
Output: 40
Explanation: Rearrange: nums1=[2,3,4,5], nums2=[5,4,2,2]. Sum = 10+12+8+10 = 40.
```

---

## Key Insight

> To minimize the product sum, pair the **largest** values from one array with the **smallest** from the other. Sort one ascending and the other descending.

---

## Approach: Sort Opposite Directions — O(n log n) ✅

```
FUNCTION minProductSum(nums1, nums2):
    SORT nums1 ASCENDING
    SORT nums2 DESCENDING
    RETURN SUM(nums1[i] * nums2[i] FOR i IN 0..n-1)
```

---

## Walkthrough

```
nums1 = [5,3,4,2], nums2 = [4,2,2,5]

Sorted: nums1 = [2,3,4,5], nums2 = [5,4,2,2]

Products: 2*5 + 3*4 + 4*2 + 5*2 = 10+12+8+10 = 40 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + pair | **O(n log n)** | **O(1)** |

---

## Key Takeaway

> **Rearrangement inequality** — to minimize the sum of products, pair largest with smallest. The opposite of maximizing (where you'd pair largest with largest).

---
