# 462. Minimum Moves to Equal Array Elements II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii)
**Companies:** Amazon, Google, Microsoft, Myntra, Tcs

---

## Problem Description

Given an integer array, return the **minimum number of moves** to make all elements equal. One move = increment or decrement one element by 1.

## Key Insight

> The optimal target is the **median** — it minimizes sum of absolute deviations. Can use quickselect for O(n) average.

## Approach: Median — O(n log n) ✅

```
FUNCTION minMoves2(nums):
    SORT nums
    median = nums[n / 2]
    RETURN SUM(ABS(num - median) for num in nums)
```

| Time | Space |
|------|-------|
| O(n log n) | O(1) |

## Key Takeaway

> The median minimizes `Σ|x - target|` — fundamental property for equalization with increment/decrement operations.
