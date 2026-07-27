# 3357. Minimize the Maximum Adjacent Element Difference

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimize-the-maximum-adjacent-element-difference](https://leetcode.com/problems/minimize-the-maximum-adjacent-element-difference)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array with some elements replaced by `-1`, choose values for the `-1` positions to minimize the **maximum absolute difference** between adjacent elements.

---

## Key Insight

> **Binary search on the answer.** For a candidate max difference `d`, check if valid values exist for all `-1` positions. Each `-1` is constrained by its non-`-1` neighbors — the valid range is the intersection of `[neighbor - d, neighbor + d]` for all adjacent known values.

---

## Approach: Binary Search + Greedy Validation ✅

```
FUNCTION minimizeMaxDiff(nums):
    lo ← 0
    hi ← MAX(nums)
    
    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        IF canAchieve(nums, mid) THEN
            hi ← mid
        ELSE
            lo ← mid + 1
    
    RETURN lo

FUNCTION canAchieve(nums, maxDiff):
    // For each group of consecutive -1s, check if valid assignments exist
    // constrained by the known values on either end
    ...
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search + validation | **O(n log M)** | **O(1)** |

---

## Key Takeaway

> **Binary search on max difference** — for each candidate, greedily verify that all `-1` gaps can be filled within the allowed difference. Constraint propagation from known neighbors bounds the valid range.

---
