# 2529. Maximum Count of Positive Integer and Negative Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer](https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer)
**Companies:** Google, Meta, Microsoft, Sharechat

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Binary Search — O(log n)](#approach-binary-search--olog-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a **sorted** array `nums`, return the maximum of (count of positive integers, count of negative integers).

---

## Key Insight

> The array is sorted, so use binary search: `bisect_left(0)` gives the count of negatives, `n - bisect_right(0)` gives the count of positives.

---

## Approach: Binary Search — O(log n) ✅

```
FUNCTION maximumCount(nums):
    neg = bisect_left(nums, 0)
    pos = len(nums) - bisect_right(nums, 0)
    RETURN MAX(neg, pos)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search | **O(log n)** | O(1) |

---

## Key Takeaway

> **Sorted array + count by sign = two binary searches.** `bisect_left(0)` counts negatives, `n - bisect_right(0)` counts positives.
