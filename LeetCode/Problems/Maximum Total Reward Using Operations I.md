# 3180. Maximum Total Reward Using Operations I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-total-reward-using-operations-i](https://leetcode.com/problems/maximum-total-reward-using-operations-i)
**Companies:** Mitsogo

---

## Problem Description
You are given an array `operations` where each operation is represented as a triplet `[start, end, reward]`. Performing an operation yields `reward` points, but you may only perform operations whose intervals `[start, end]` do not overlap with any other chosen operation. Return the maximum total reward achievable.

## Examples
**Example 1:**
Input: `operations = [[1,3,4],[2,5,6],[4,6,5]]`
Output: `9`
Explanation: Choose operations `[1,3,4]` and `[4,6,5]` (non‑overlapping) for total reward `4+5=9`.

**Example 2:**
Input: `operations = [[0,2,3],[1,4,5],[5,7,2]]`
Output: `5`
Explanation: The best single operation is `[1,4,5]`. The third operation does not overlap with it, but adding it would exceed the interval limit, so total remains `5`.

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
