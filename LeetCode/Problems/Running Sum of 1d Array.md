# 1480. Running Sum of 1d Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/running-sum-of-1d-array](https://leetcode.com/problems/running-sum-of-1d-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description

Given array `nums`, return the running sum where `result[i] = sum(nums[0]..nums[i])`.

---

## Approach

```
FUNCTION runningSum(nums):
    FOR i ← 1 TO n - 1:
        nums[i] += nums[i - 1]
    RETURN nums
```

| Time | Space |
|------|-------|
| O(n) | O(1) — in-place prefix sum |

---

## Key Takeaway

> Running sum = prefix sum — accumulate each element on top of the previous. The building block for range sum queries.
