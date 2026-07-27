# 3880. Minimum Absolute Difference Between Two Values

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-between-two-values](https://leetcode.com/problems/minimum-absolute-difference-between-two-values)
**Companies:** Snowflake

---

## Key Insight

> Sort the array. The minimum absolute difference is always between adjacent elements in sorted order.

---

## Approach

```
FUNCTION minAbsDiff(nums):
    SORT nums
    minDiff ← INFINITY
    FOR i ← 1 TO LEN(nums) - 1 DO
        minDiff ← MIN(minDiff, nums[i] - nums[i-1])
    RETURN minDiff
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + scan | **O(n log n)** | **O(1)** |

---

## Key Takeaway

> **Sort then check adjacent pairs** — the classic approach for finding the closest pair of values in an array.

---
