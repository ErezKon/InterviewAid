# 453. Minimum Moves to Equal Array Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-equal-array-elements](https://leetcode.com/problems/minimum-moves-to-equal-array-elements)
**Companies:** Amazon, Bloomberg, Coursera, Google, Ibm, Indeed, Meta, Microsoft

---

## Problem Description

One move = increment `n-1` elements by 1. Return **minimum moves** to make all elements equal.

## Key Insight

> Incrementing n-1 by 1 ≡ decrementing 1 by 1. Target = minimum element. Answer = sum of all differences from minimum.

## Approach: Math — O(n) ✅

```
FUNCTION minMoves(nums):
    RETURN SUM(nums) - MIN(nums) * len(nums)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Key Takeaway

> Reframe "increment n-1" as "decrement 1" — this classic inversion simplifies the problem to a one-line formula.
