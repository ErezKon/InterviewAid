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

```text
FUNCTION maximumCount(nums):
    // count negatives using leftmost zero
    neg ← bisect_left(nums, 0)
    // count positives using rightmost zero
    pos ← len(nums) - bisect_right(nums, 0)
    RETURN MAX(neg, pos)
```

---

## Examples

**Example 1:**
```
Input: nums = [-2,-1,0,1,2]
Output: 2
Explanation: Negatives = 2 (-2,-1), Positives = 2 (1,2). Max = 2.
```

**Example 2:**
```
Input: nums = [-3,-2,-1]
Output: 3
Explanation: No positives, so count of negatives (3) is the answer.
```

---

## Walkthrough

| Step | nums | bisect_left(0) | bisect_right(0) | neg | pos | result |
|------|------|----------------|-----------------|-----|-----|--------|
| 1 | [-2,-1,0,1,2] | index 2 | index 3 | 2 | 5-3=2 | MAX(2,2)=2 |
| 2 | [-3,-2,-1] | index 3 | index 3 | 3 | 3-3=0 | MAX(3,0)=3 |

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search | **O(log n)** | O(1) |

---

## Follow-Up Questions

1. How would you solve the problem if the array were not sorted?
2. Can you achieve O(1) time using a single pass without binary search?

---

## Key Takeaway

> **Sorted array + count by sign = two binary searches.** `bisect_left(0)` counts negatives, `n - bisect_right(0)` counts positives.
