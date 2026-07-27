# 1751. Maximum Number of Events That Can Be Attended II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii](https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii)
**Companies:** Amazon, Bloomberg, General Electric, Google, Microsoft, Phonepe, Snowflake, Tcs

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `events` where `events[i] = [startDay, endDay, value]` and an integer `k`, you can attend at most `k` **non-overlapping** events. You can only attend one event per day and must attend the entire event. Return the **maximum sum of values**.

**Constraints:**
- `1 <= k <= events.length <= 10^6`
- `1 <= startDay <= endDay <= 10^9`
- `1 <= value <= 10^6`

---

## Examples

**Example 1:**
```
Input:  events = [[1,2,4],[3,4,3],[2,3,1]], k = 2
Output: 7
Explanation: Attend event 0 (days 1-2, val 4) and event 1 (days 3-4, val 3). Total = 7.
```

**Example 2:**
```
Input:  events = [[1,2,4],[3,4,3],[2,3,10]], k = 2
Output: 14
```

---

## Key Insight

> This is **Weighted Job Scheduling** generalized to at most `k` selections. Sort by end time, then use **DP with binary search**: for each event, decide whether to skip it or attend it (using the best state from before it starts).

---

## Approach: DP + Binary Search — O(nk log n) ✅

```
FUNCTION maxValue(events, k)
    SORT events by end time
    n ← len(events)
    // dp[i][j] = max value considering first i events, attending at most j
    dp ← (n+1) × (k+1) matrix of zeros

    FOR i ← 1 TO n DO
        [start, end, val] ← events[i-1]
        // Binary search: find last event ending before start
        prev ← binary search for rightmost index where end < start

        FOR j ← 1 TO k DO
            dp[i][j] ← MAX(dp[i-1][j], dp[prev][j-1] + val)

    RETURN dp[n][k]
END FUNCTION
```

---

## Walkthrough

```
events = [[1,2,4],[3,4,3],[2,3,1]], sorted by end: [[1,2,4],[2,3,1],[3,4,3]], k=2
```

| i | Event      | prev | j=1              | j=2               |
|---|-----------|------|------------------|--------------------|
| 1 | [1,2,4]   | 0    | max(0, 0+4)=4   | max(0, 0+4)=4     |
| 2 | [2,3,1]   | 0    | max(4, 0+1)=4   | max(4, 0+1)=4     |
| 3 | [3,4,3]   | 1    | max(4, 4+3)=**7** | max(4, 4+3)=**7** |

**Result: 7** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(nk log n)** — n events × k attendances × log n binary search |
| Space  | **O(nk)** — DP table (can optimize to O(nk) with rolling) |

---

## Follow-Up Questions

1. **How does this differ from LeetCode 1235 (Maximum Profit in Job Scheduling)?**
   Problem 1235 has no limit on k. This adds the "at most k" dimension.

2. **Can we optimize space?**
   Use 1D DP per j-level with rolling updates.

3. **What if events could partially overlap?**
   Would need interval tree or more complex overlap detection.

---

## Key Takeaway

> **Weighted job scheduling + DP dimension for k** — sort by end time, binary search for the latest non-overlapping predecessor, and add a DP dimension for the count limit.
