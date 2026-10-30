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

The **product sum** of two equal-length arrays `a` and `b` is equal to the sum of `a[i] * b[i]` for all `0 ≤ i < a.length` (**0-indexed**).

- For example, if `a = [1,2,3,4]` and `b = [5,2,3,1]`, the **product sum** would be `1*5 + 2*2 + 3*3 + 4*1 = 22`.

Given two arrays `nums1` and `nums2` of length `n`, return *the **minimum product sum** if you are allowed to **rearrange** the **order** of the elements in* `nums1`.

**Constraints:**
- `n == nums1.length == nums2.length`
- `1 ≤ n ≤ 10⁵`
- `1 ≤ nums1[i], nums2[i] ≤ 100`

---

## Examples

```
Example 1:
  Input: nums1 = [5,3,4,2], nums2 = [4,2,2,5]
  Output: 40
  Explanation: We can rearrange nums1 to become [3,5,4,2]. The product sum of [3,5,4,2] and [4,2,2,5] is 3*4 + 5*2 + 4*2 + 2*5 = 40.
```

```
Example 2:
  Input: nums1 = [2,1,4,5,7], nums2 = [3,2,4,8,6]
  Output: 65
  Explanation: We can rearrange nums1 to become [5,7,4,1,2]. The product sum of [5,7,4,1,2] and [3,2,4,8,6] is 5*3 + 7*2 + 4*4 + 1*8 + 2*6 = 65.
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
