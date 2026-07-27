# 1674. Minimum Moves to Make Array Complementary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-make-array-complementary](https://leetcode.com/problems/minimum-moves-to-make-array-complementary)
**Companies:** Amazon, Curefit, Google, Meta, Microsoft

---

## Problem Description

Given `nums` of even length with values in `[1, limit]`, one move changes any element to any value in `[1, limit]`. Make `nums[i] + nums[n-1-i]` equal for all pairs. Return **minimum moves**.

## Key Insight

> For each pair, analyze how many moves are needed for each possible target sum `T`. Use a **difference array** to accumulate costs: 0 moves at `a+b`, 1 move in `[lo, hi]`, 2 moves outside.

## Approach: Line Sweep / Difference Array — O(n + limit) ✅

```
FUNCTION minMoves(nums, limit):
    n = len(nums)
    diff = [0] * (2 * limit + 2)

    FOR i ← 0 TO n/2 - 1:
        a, b = nums[i], nums[n-1-i]
        lo = MIN(a, b) + 1
        hi = MAX(a, b) + limit
        // 0 moves at a+b, 1 move in [lo, hi], 2 moves outside
        diff[2] += 2
        diff[lo] -= 1
        diff[a + b] -= 1
        diff[a + b + 1] += 1
        diff[hi + 1] += 1

    result = n; curr = 0
    FOR t ← 2 TO 2 * limit:
        curr += diff[t]
        result = MIN(result, curr)

    RETURN result
```

| Time | Space |
|------|-------|
| O(n + limit) | O(limit) |

## Key Takeaway

> When optimizing over all possible target values, use a **difference array** to encode each pair's cost contribution in O(1), then sweep once to find the global minimum.
