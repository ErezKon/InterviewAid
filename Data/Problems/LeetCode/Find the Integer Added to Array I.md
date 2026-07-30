# 3131. Find the Integer Added to Array I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-integer-added-to-array-i](https://leetcode.com/problems/find-the-integer-added-to-array-i)
**Companies:** Bloomberg, Mitsogo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Min Difference — O(n) ✅](#4-approach-min-difference--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given two arrays `nums1` and `nums2` of equal length, where `nums2` is formed by adding a constant integer `x` to each element of some permutation of `nums1`, find `x`.

**Constraints:**
- `1 <= nums1.length == nums2.length <= 100`
- `0 <= nums1[i], nums2[i] <= 1000`

---

## 2. Examples

```
Example 1:
  Input:  nums1 = [2, 6, 4], nums2 = [9, 7, 5]
  Output: 3
  Reason: 2+3=5, 4+3=7, 6+3=9. x = 3.
```

---

## 3. Key Insight

> Since `nums2[i] = nums1[perm(i)] + x` for some permutation, `x = min(nums2) - min(nums1)`. The minimum of each array must correspond to each other.

---

## 4. Approach: Min Difference — O(n) ✅

```
FUNCTION addedInteger(nums1, nums2):
    RETURN MIN(nums2) - MIN(nums1)
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — find two minimums |
| **Space** | O(1) |

---

## 6. Key Takeaway

> When one array is a shifted permutation of another, **the shift equals the difference of minimums** (or maximums, or sums divided by length).
