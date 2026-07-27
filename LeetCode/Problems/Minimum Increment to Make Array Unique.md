# 945. Minimum Increment to Make Array Unique

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-increment-to-make-array-unique](https://leetcode.com/problems/minimum-increment-to-make-array-unique)
**Companies:** Amazon, Coursera, Goldman Sachs, Google, Infosys, Microsoft, Paypal, Tiktok, Zscaler

---

## Problem Description

Given an integer array `nums`, in one move you can increment any element by 1. Return the **minimum number of moves** to make every value unique.

## Key Insight

> Sort the array. Process left to right: if `nums[i] <= nums[i-1]`, bump it to `nums[i-1] + 1`. Each bump costs exactly the difference.

## Approach: Sort + Greedy — O(n log n) ✅

```
FUNCTION minIncrementForUnique(nums):
    SORT nums
    moves = 0

    FOR i ← 1 TO n - 1:
        IF nums[i] <= nums[i - 1]:
            need = nums[i - 1] + 1
            moves += need - nums[i]
            nums[i] = need

    RETURN moves
```

| Time | Space |
|------|-------|
| O(n log n) | O(1) — in-place |

## Key Takeaway

> After sorting, greedily ensure each element exceeds its predecessor — this minimizes total increments since we never overshoot.
