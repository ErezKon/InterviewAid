# 3414. Maximum Score of Non-overlapping Intervals

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-score-of-non-overlapping-intervals](https://leetcode.com/problems/maximum-score-of-non-overlapping-intervals)
**Companies:** Amazon, Sprinklr

---

## Problem Description
Given an array `intervals` where each interval is represented as `[start, end, score]`, select a subset of non‑overlapping intervals such that the sum of their scores is maximized. Two intervals overlap if they share any common point. Return the maximum total score achievable.

## Examples
**Example 1:**
```
Input: intervals = [[1,3,4],[2,5,2],[4,6,4]]
Output: 8
Explanation: Choose intervals [1,3,4] and [4,6,4]; they do not overlap and total score = 8.
```
**Example 2:**
```
Input: intervals = [[1,2,3],[2,3,4],[3,4,5]]
Output: 12
Explanation: All intervals can be taken because each ends where the next begins (no overlap).
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
