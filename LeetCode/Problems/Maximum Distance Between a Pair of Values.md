# 1855. Maximum Distance Between a Pair of Values

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-distance-between-a-pair-of-values](https://leetcode.com/problems/maximum-distance-between-a-pair-of-values)
**Companies:** Google, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Two Pointers — O(n + m)](#approach-two-pointers--on--m-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two **non-increasing** arrays `nums1` and `nums2`, find the maximum `j - i` such that `nums1[i] ≤ nums2[j]` and `i ≤ j`.

---

## Key Insight

> Both arrays are sorted in non-increasing order. Use two pointers: advance j as far as possible while `nums1[i] ≤ nums2[j]`, then advance i. Track max `j - i`.

---

## Approach: Two Pointers — O(n + m) ✅

```
FUNCTION maxDistance(nums1, nums2):
    i = j = 0; result = 0
    WHILE i < len(nums1) AND j < len(nums2):
        IF nums1[i] > nums2[j]:
            i += 1
        ELSE:
            result = MAX(result, j - i)
            j += 1
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two Pointers | **O(n + m)** | O(1) |

---

## Key Takeaway

> **Non-increasing arrays + pair distance = two pointers.** Advance j to maximize distance while maintaining the constraint.
