# 2919. Minimum Increment Operations to Make Array Beautiful

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-increment-operations-to-make-array-beautiful](https://leetcode.com/problems/minimum-increment-operations-to-make-array-beautiful)
**Companies:** Google

---

## Problem Description

An array is **beautiful** if for every consecutive 3 elements, at least one is ≥ `k`. You can increment any element by 1. Return the **minimum total increments**.

## Key Insight

> DP where `dp[i]` = minimum cost assuming `nums[i]` is the last element bumped to ≥ k. For each `i`, the previous bumped element must be within the last 3 positions.

## Approach: DP with Sliding Window of 3 — O(n) ✅

```
FUNCTION minIncrementOperations(nums, k):
    n ← len(nums)
    // dp[i] = min cost to make array beautiful up to index i, where i is bumped to ≥ k
    // For each i, previous bump must be at i-1, i-2, or i-3
    dp ← array of size n

    FOR i ← 0 TO n-1:
        cost_i ← MAX(0, k - nums[i])
        IF i < 3:
            dp[i] ← cost_i
        ELSE:
            dp[i] ← cost_i + MIN(dp[i-1], dp[i-2], dp[i-3])

    RETURN MIN(dp[n-1], dp[n-2], dp[n-3])
```

| Time | Space |
|------|-------|
| O(n) | O(n) — reducible to O(1) |

## Key Takeaway

> "At least one in every window of 3" translates to DP where the gap between bumped elements is at most 2 — track the minimum cost of the last 3 choices.
