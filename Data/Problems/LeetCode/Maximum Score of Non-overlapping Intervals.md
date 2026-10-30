# 3414. Maximum Score of Non-overlapping Intervals

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-score-of-non-overlapping-intervals](https://leetcode.com/problems/maximum-score-of-non-overlapping-intervals)
**Companies:** Amazon, Sprinklr

---

## Problem Description

> *Note: the Approach below is unlimited weighted interval scheduling. Officially you may pick **at most 4** non-overlapping intervals (sharing an endpoint counts as overlapping) and must return the **lexicographically smallest index array** among the max-weight choices. Correct idea: sort by start time and run a DP over (position, intervals left ≤ 4). Store (best score, sorted index list) and break ties by lexicographic comparison of the lists. Use binary search for the next compatible interval.*

You are given a 2D integer array `intervals`, where `intervals[i] = [l_i, r_i, weight_i]`. Interval `i` starts at position `l_i` and ends at `r_i`, and has a weight of `weight_i`. You can choose *up to* 4 **non-overlapping** intervals. The **score** of the chosen intervals is defined as the total sum of their weights.

Return the lexicographically smallest array of at most 4 indices from `intervals` with **maximum** score, representing your choice of non-overlapping intervals.

Two intervals are said to be **non-overlapping** if they do not share any points. In particular, intervals sharing a left or right boundary are considered overlapping.

**Constraints:**
- `1 <= intevals.length <= 5 * 10^4`
- `intervals[i].length == 3`
- `intervals[i] = [l_i, r_i, weight_i]`
- `1 <= l_i <= r_i <= 10^9`
- `1 <= weight_i <= 10^9`

## Examples

**Example 1:**
```
Input: intervals = [[1,3,2],[4,5,2],[1,5,5],[6,9,3],[6,7,1],[8,9,1]]
Output: [2,3]
Explanation: You can choose the intervals with indices 2, and 3 with respective weights of 5, and 3.
```

**Example 2:**
```
Input: intervals = [[5,8,1],[6,7,7],[4,7,3],[9,10,6],[7,8,2],[11,14,3],[3,5,5]]
Output: [1,3,5,6]
Explanation: You can choose the intervals with indices 1, 3, 5, and 6 with respective weights of 7, 6, 3, and 5.
```

## Approach
Sort intervals by end time. Use dynamic programming where `dp[i]` is the maximum score considering intervals up to index `i` (sorted). For each interval `i`, find the last interval `j` that ends before `i` starts (binary search). Transition: `dp[i] = max(dp[i-1], intervals[i].score + dp[j])`.

```text
FUNCTION maxScoreNonOverlapping(intervals):
    SORT intervals BY end ASCENDING
    SET n ← LENGTH(intervals)
    CREATE dp ARRAY OF SIZE n+1 FILLED WITH 0
    FOR i ← 1 TO n:
        SET start_i ← intervals[i-1][0]
        SET end_i   ← intervals[i-1][1]
        SET score_i ← intervals[i-1][2]
        // binary search for last interval that ends <= start_i
        SET j ← FIND_LAST_INDEX(intervals, end <= start_i)
        SET include ← score_i + dp[j+1]
        SET dp[i] ← MAX(dp[i-1], include)
    RETURN dp[n]
```
`FIND_LAST_INDEX` returns the greatest index `j` (< i‑1) whose end ≤ `start_i`, or `-1` if none (use 0 in dp).

## Walkthrough
For `[[1,3,4],[2,5,2],[4,6,4]]`:
- Sorted by end: same order.
- i=1: include = 4 + dp[0]=4, dp[1]=max(0,4)=4.
- i=2: start=2, no prior non‑overlap (j=-1), include=2, dp[2]=max(4,2)=4.
- i=3: start=4, last non‑overlap is interval 1 (end=3), j=0, include=4 + dp[1]=8, dp[3]=max(4,8)=8.
Result = 8.

## Complexity Analysis
- **Time:** O(n log n) for sorting plus binary search per interval.
- **Space:** O(n) for the dp array.

## Follow‑Up Questions
1. How would you adapt the solution if intervals could share endpoints (i.e., end == start is allowed) as overlapping?
2. Can the problem be solved with a segment tree for faster queries when intervals are dynamic?
3. What changes are needed if each interval also has a cost and you need to maximize score‑to‑cost ratio?

## Key Takeaway
Sorting by end time and using DP with binary search efficiently yields the maximum sum of scores for non‑overlapping intervals.
