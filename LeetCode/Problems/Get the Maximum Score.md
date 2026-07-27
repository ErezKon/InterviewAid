# 1537. Get the Maximum Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/get-the-maximum-score](https://leetcode.com/problems/get-the-maximum-score)
**Companies:** Google, Intuit, Microsoft, Mindtickle, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two Pointers — O(m+n) ✅](#3-approach-two-pointers--omn-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given two sorted arrays (may share common values), find a path that can switch between arrays at common values. Maximize the sum of the path.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 10⁵`

---

## 2. Key Insight

> Between any two common points, independently accumulate sums on both paths. At each common point, switch to whichever path had the higher sum.

---

## 3. Approach: Two Pointers — O(m+n) ✅

```
FUNCTION maxSum(nums1, nums2):
    MOD = 10^9 + 7
    i = j = 0; sum1 = sum2 = 0

    WHILE i < len(nums1) AND j < len(nums2):
        IF nums1[i] < nums2[j]:
            sum1 += nums1[i]; i += 1
        ELSE IF nums1[i] > nums2[j]:
            sum2 += nums2[j]; j += 1
        ELSE:
            // Common point: take max path so far + common value
            sum1 = sum2 = MAX(sum1, sum2) + nums1[i]
            i += 1; j += 1

    WHILE i < len(nums1): sum1 += nums1[i]; i += 1
    WHILE j < len(nums2): sum2 += nums2[j]; j += 1

    RETURN MAX(sum1, sum2) % MOD
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m + n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Two pointers** merge-style on sorted arrays. At each common value, take the max of both running sums and reset. O(m+n) single pass.
