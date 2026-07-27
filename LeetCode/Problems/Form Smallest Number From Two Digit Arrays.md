# 2605. Form Smallest Number From Two Digit Arrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/form-smallest-number-from-two-digit-arrays](https://leetcode.com/problems/form-smallest-number-from-two-digit-arrays)
**Companies:** Tinkoff

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Set Intersection — O(1) ✅](#2-approach-set-intersection--o1-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given two arrays of digits, form the smallest number that contains at least one digit from each array.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 9`

---

## 2. Approach: Set Intersection — O(1) ✅

```
FUNCTION minNumber(nums1, nums2):
    common ← SET(nums1) ∩ SET(nums2)
    IF common IS NOT EMPTY THEN
        RETURN MIN(common)

    // No common digit: combine smallest from each
    a ← MIN(nums1); b ← MIN(nums2)
    RETURN MIN(a * 10 + b, b * 10 + a)
```

---

## 3. Key Takeaway

> If arrays share a common digit, return the smallest one. Otherwise, combine the minimums of each array into the smallest 2-digit number.
