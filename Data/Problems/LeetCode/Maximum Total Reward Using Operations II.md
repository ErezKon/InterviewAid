# 3181. Maximum Total Reward Using Operations II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-total-reward-using-operations-ii](https://leetcode.com/problems/maximum-total-reward-using-operations-ii)
**Companies:** Mitsogo

---

## Problem Description

> *Note: the Approach below solves an invented interval-scheduling problem. Officially you may add `rewardValues[i]` only if it is **greater** than the current total `x`. Correct idea: sort the distinct values and keep a big-integer bitset of reachable totals. For each value `v`, `reach |= (reach & ((1 << v) − 1)) << v`. The answer is the highest set bit (O(n·maxV / 64)).*

You are given an integer array `rewardValues` of length `n`, representing the values of rewards.

Initially, your total reward `x` is 0, and all indices are **unmarked**. You are allowed to perform the following operation **any** number of times:

- Choose an **unmarked** index `i` from the range `[0, n - 1]`.
- If `rewardValues[i]` is **greater** than your current total reward `x`, then add `rewardValues[i]` to `x` (i.e., `x = x + rewardValues[i]`), and **mark** the index `i`.

Return an integer denoting the **maximum ***total reward* you can collect by performing the operations optimally.

**Constraints:**
- `1 <= rewardValues.length <= 5 * 10^4`
- `1 <= rewardValues[i] <= 5 * 10^4`

## Examples

**Example 1:**
```
Input: rewardValues = [1,1,3,3]
Output: 4
Explanation: During the operations, we can choose to mark the indices 0 and 2 in order, and the total reward will be 4, which is the maximum.
```

**Example 2:**
```
Input: rewardValues = [1,6,4,3,2]
Output: 11
Explanation: Mark the indices 0, 2, and 1 in order. The total reward will then be 11, which is the maximum.
```

## Approach
**Weighted Interval Scheduling – DP with Binary Search** – Sort operations by end time. For each operation, find the last non-conflicting operation using binary search, then decide to take or skip.

```text
FUNCTION MaxReward(operations):
    // Sort by end time
    SET ops ← operations SORTED BY end ASCENDING
    SET n ← LENGTH(ops)
    // Extract end times for binary search
    SET ends ← LIST of ops[i].end for i ← 0 TO n-1
    // DP where dp[i] is max reward using first i operations
    SET dp ← ARRAY of size n+1 INITIALIZED TO 0
    FOR i ← 1 TO n:
        SET cur ← ops[i-1]
        // Find index j of last operation with end < cur.start
        SET j ← BINARY_SEARCH_RIGHTMOST(ends, cur.start - 1)
        SET include ← cur.reward + dp[j+1]   // dp is 1-based
        SET exclude ← dp[i-1]
        SET dp[i] ← MAX(include, exclude)
    RETURN dp[n]
```

## Walkthrough
Consider `operations = [[1,3,4],[2,5,6],[4,6,5]]`.
1. Sorted by end: same order.
2. `ends = [3,5,6]`.
3. DP steps:
   - i=1: j=-1 → include=4, exclude=0 → dp[1]=4.
   - i=2: j=-1 (no end <2) → include=6, exclude=4 → dp[2]=6.
   - i=3: j=0 (end 3 < start 4) → include=5+dp[1]=9, exclude=6 → dp[3]=9.
Result = 9.

## Complexity Analysis
- **Time:** `O(n log n)` for sorting and binary searches.
- **Space:** `O(n)` for the DP array and auxiliary lists.

## Follow-Up Questions
1. How would the solution change if each operation also had a cost and you needed to maximize reward-minus-cost?
2. Can you modify the algorithm to also return the selected operations?
3. What if intervals are allowed to overlap as long as the total overlap length does not exceed a given threshold?

## Key Takeaway
Sorting by end time and applying DP with binary search yields the optimal non-overlapping reward selection.
