# 3423. Maximum Difference Between Adjacent Elements in a Circular Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-difference-between-adjacent-elements-in-a-circular-array](https://leetcode.com/problems/maximum-difference-between-adjacent-elements-in-a-circular-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Linear Scan — O(n)](#approach-linear-scan--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a circular array `nums`, find the maximum absolute difference between any two adjacent elements (including the wrap-around pair).

---

## Key Insight

> Check all n adjacent pairs including `(nums[n-1], nums[0])`. Use modular indexing.

---

## Approach: Linear Scan — O(n) ✅

```
FUNCTION maxAdjacentDistance(nums):
    n = len(nums)
    RETURN MAX(ABS(nums[i] - nums[(i+1) % n]) for i in range(n))
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Linear scan | **O(n)** | O(1) |

---

## Key Takeaway

> **Circular adjacency: use `(i+1) % n` to handle wrap-around.** One-pass max of absolute differences.
