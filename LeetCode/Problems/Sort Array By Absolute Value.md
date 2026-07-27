# 3667. Sort Array By Absolute Value

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sort-array-by-absolute-value](https://leetcode.com/problems/sort-array-by-absolute-value)
**Companies:** Cognizant

---

## Problem Description

Given an array of integers, sort it by absolute value in ascending order. If two elements have the same absolute value, the negative one comes first.

### Examples

- **Input:** `nums = [-3,2,1,-1]` → **Output:** `[-1,1,2,-3]`
- **Input:** `nums = [5,-5,3,-3]` → **Output:** `[-3,3,-5,5]`

## Approach: Custom Sort — O(n log n) ✅

```
FUNCTION sortByAbsValue(nums):
    RETURN SORT(nums, key=lambda x: (abs(x), -1 if x < 0 else 1))
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(n) |
