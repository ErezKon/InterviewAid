# 3776. Minimum Moves to Balance Circular Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-balance-circular-array](https://leetcode.com/problems/minimum-moves-to-balance-circular-array)
**Companies:** Bloomberg

---

## Problem Description

Given a circular array, balance it (make all elements equal) using minimum moves, where a move transfers 1 unit between adjacent positions.

## Key Insight

> Similar to "Minimum Cost to Make All Characters Equal" on a circle. Compute prefix sums of the difference from the mean, then find the median of the prefix sums — the answer is the sum of absolute deviations from the median.

## Approach: Prefix Sum + Median — O(n log n) ✅

```
FUNCTION minMoves(nums):
    mean ← SUM(nums) / n
    diff[i] ← nums[i] - mean
    prefix[i] ← prefix[i-1] + diff[i]  // circular prefix sums
    SORT prefix
    median ← prefix[n/2]
    RETURN SUM(ABS(p - median) for p in prefix)
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

## Key Takeaway

> Circular balancing problems reduce to finding the **median of prefix sums** — this minimizes the total flow across all cuts.
