# 3180. Maximum Total Reward Using Operations I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-total-reward-using-operations-i](https://leetcode.com/problems/maximum-total-reward-using-operations-i)
**Companies:** Mitsogo

---

## Problem Description

> *Note: the Approach below solves an invented interval-scheduling problem. Officially you may add `rewardValues[i]` only if it is **greater** than the current total `x`. Correct idea: sort the distinct values and keep a bitset of reachable totals. For each value `v`, `reach |= (reach & ((1 << v) − 1)) << v`. The answer is the highest set bit.*

You are given an integer array `rewardValues` of length `n`, representing the values of rewards.

Initially, your total reward `x` is 0, and all indices are **unmarked**. You are allowed to perform the following operation **any** number of times:

- Choose an **unmarked** index `i` from the range `[0, n - 1]`.
- If `rewardValues[i]` is **greater** than your current total reward `x`, then add `rewardValues[i]` to `x` (i.e., `x = x + rewardValues[i]`), and **mark** the index `i`.

Return an integer denoting the **maximum ***total reward* you can collect by performing the operations optimally.

**Constraints:**
- `1 <= rewardValues.length <= 2000`
- `1 <= rewardValues[i] <= 2000`

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
**Weighted Interval Scheduling – DP** – Sort operations by their end time, then for each operation compute the best reward by either taking it (adding its reward to the best compatible previous operation) or skipping it.

```text
FUNCTION MaxReward(operations):
    // Sort by end time
    SET ops ← operations SORTED BY end ASCENDING
    SET n ← LENGTH(ops)
    // Precompute p[i]: index of last operation that ends before ops[i].start
    SET p ← ARRAY of size n INITIALIZED TO -1
    FOR i ← 0 TO n-1:
        FOR j ← i-1 DOWNTO 0:
            IF ops[j].end < ops[i].start:
                SET p[i] ← j
                BREAK
    // DP array where dp[i] is max reward using first i operations (0‑based)
    SET dp ← ARRAY of size n+1 INITIALIZED TO 0
    FOR i ← 1 TO n:
        SET include ← ops[i-1].reward + dp[p[i-1]+1]  // +1 because dp is 1‑based
        SET exclude ← dp[i-1]
        SET dp[i] ← MAX(include, exclude)
    RETURN dp[n]
```

## Walkthrough
Consider `operations = [[1,3,4],[2,5,6],[4,6,5]]`.
1. Sorted by end: `[[1,3,4], [2,5,6], [4,6,5]]`.
2. Compute `p`: `p[0] = -1` (no previous), `p[1] = -1` (ends 5, start 2 overlaps), `p[2] = 0` (ends 3 < start 4).
3. DP steps:
   - i=1: include=4, exclude=0 → dp[1]=4
   - i=2: include=6, exclude=4 → dp[2]=6
   - i=3: include=5 + dp[1]=9, exclude=6 → dp[3]=9
Result = 9.

## Complexity Analysis
- **Time:** `O(n log n)` for sorting plus `O(n^2)` in the naïve `p` computation; can be reduced to `O(n log n)` with binary search.
- **Space:** `O(n)` for the sorted list, `p` array, and DP table.

## Follow‑Up Questions
1. How would you modify the algorithm if each operation also had a cost and you needed to maximize reward‑minus‑cost?
2. Can the solution be extended to return the actual set of selected operations?
3. What changes are needed if intervals are allowed to overlap as long as the total overlap length does not exceed a given threshold?

## Key Takeaway
Sorting by end time and applying weighted‑interval‑scheduling DP yields the optimal non‑overlapping reward selection.
