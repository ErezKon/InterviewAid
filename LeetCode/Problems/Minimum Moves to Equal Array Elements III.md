# 3736. Minimum Moves to Equal Array Elements III

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-equal-array-elements-iii](https://leetcode.com/problems/minimum-moves-to-equal-array-elements-iii)
**Companies:** Adobe

---

## Problem Description

Given an array, in one move you can increment or decrement any element by 1. Return the **minimum moves** to make all elements equal.

## Key Insight

> Same as "Min Moves II" (#462) — the optimal target is the **median**. Sum of absolute deviations from the median is minimized.

## Approach: Median — O(n log n) ✅

```
FUNCTION minMoves(nums):
    SORT nums
    median ← nums[n / 2]
    RETURN SUM(ABS(num - median) for num in nums)
```

| Time | Space |
|------|-------|
| O(n log n) | O(1) |

## Key Takeaway

> The median minimizes the sum of absolute deviations — a fundamental property used in many equalization problems.
