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

You are given an array of `events` where `events[i] = [startDay_i, endDay_i, value_i]`. The `i`th event starts at `startDay_i` and ends at `endDay_i`, and if you attend this event, you will receive a value of `value_i`. You are also given an integer `k` which represents the maximum number of events you can attend.

You can only attend one event at a time. If you choose to attend an event, you must attend the **entire** event. Note that the end day is **inclusive**: that is, you cannot attend two events where one of them starts and the other ends on the same day.

Return *the **maximum sum** of values that you can receive by attending events.*

**Constraints:**
- `1 <= k <= events.length`
- `1 <= k * events.length <= 10^6`
- `1 <= startDay_i <= endDay_i <= 10^9`
- `1 <= value_i <= 10^6`

---

## Examples

```
Example 1:
  Input: events = [[1,2,4],[3,4,3],[2,3,1]], k = 2
  Output: 7
  Explanation: Choose the green events, 0 and 1 (0-indexed) for a total value of 4 + 3 = 7.
```

```
Example 2:
  Input: events = [[1,2,4],[3,4,3],[2,3,10]], k = 2
  Output: 10
  Explanation: Choose event 2 for a total value of 10.
    Notice that you cannot attend any other event as they overlap, and that you do not have to attend k events.
```

```
Example 3:
  Input: events = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]], k = 3
  Output: 9
  Explanation: Although the events do not overlap, you can only attend 3 events. Pick the highest valued three.
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
