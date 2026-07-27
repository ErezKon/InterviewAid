# 1846. Maximum Element After Decreasing and Rearranging

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-element-after-decreasing-and-rearranging](https://leetcode.com/problems/maximum-element-after-decreasing-and-rearranging)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + Greedy — O(n log n)](#approach-sort--greedy--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array, you can rearrange and decrease elements. The first element must be 1. Adjacent elements differ by at most 1. Maximize the last (largest) element.

---

## Key Insight

> Sort the array. Walk through: each element can be at most `prev + 1`. Greedily set each to `min(arr[i], prev + 1)`. The final value is the answer.

---

## Approach: Sort + Greedy — O(n log n) ✅

```
FUNCTION maximumElementAfterDecrementingAndRearranging(arr):
    SORT arr
    arr[0] = 1
    FOR i ← 1 TO n - 1:
        arr[i] = MIN(arr[i], arr[i-1] + 1)
    RETURN arr[n - 1]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + greedy | **O(n log n)** | O(1) |

---

## Key Takeaway

> **Sort and greedily cap each element to prev + 1.** This maximizes the achievable final value under the adjacency constraint.
