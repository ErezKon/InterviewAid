# 3181. Maximum Total Reward Using Operations II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-total-reward-using-operations-ii](https://leetcode.com/problems/maximum-total-reward-using-operations-ii)
**Companies:** Mitsogo

---

## Problem Description
You are given an array `operations` where each operation is a triplet `[start, end, reward]`. You may select a subset of operations such that no two selected intervals `[start, end]` overlap. Return the maximum total reward achievable.

## Examples
**Example 1:**
Input: `operations = [[1,3,4],[2,5,6],[4,6,5]]`
Output: `9`
Explanation: Choose `[1,3,4]` and `[4,6,5]` for total reward `4+5=9`.

**Example 2:**
Input: `operations = [[0,2,3],[1,4,5],[5,7,2]]`
Output: `5`
Explanation: The best non‑overlapping set is the single operation `[1,4,5]`.

## Approach
**Weighted Interval Scheduling – DP with Binary Search** – Sort operations by end time. For each operation, find the last non‑conflicting operation using binary search, then decide to take or skip.

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
        SET include ← cur.reward + dp[j+1]   // dp is 1‑based
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

## Follow‑Up Questions
1. How would the solution change if each operation also had a cost and you needed to maximize reward‑minus‑cost?
2. Can you modify the algorithm to also return the selected operations?
3. What if intervals are allowed to overlap as long as the total overlap length does not exceed a given threshold?

## Key Takeaway
Sorting by end time and applying DP with binary search yields the optimal non‑overlapping reward selection.
