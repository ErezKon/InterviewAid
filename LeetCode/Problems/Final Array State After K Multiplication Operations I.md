# 3264. Final Array State After K Multiplication Operations I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-i](https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-i)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Given array `nums`, integer `k`, and `multiplier`, repeat `k` times: find the minimum element (first occurrence if ties), multiply it by `multiplier`. Return the final array.

---

## Approach: Simulation — O(n·k) ✅

```
FUNCTION getFinalState(nums, k, multiplier):
    FOR _ ← 0 TO k - 1:
        idx = nums.index(MIN(nums))
        nums[idx] *= multiplier
    RETURN nums
```

Can be optimized to O(k log n) with a min-heap.

---

## Key Takeaway

> **Greedy simulation: always multiply the smallest element. For large k, use a min-heap to find the minimum in O(log n) per operation.**
