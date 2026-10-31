# 3439. Reschedule Meetings for Maximum Free Time I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reschedule-meetings-for-maximum-free-time-i](https://leetcode.com/problems/reschedule-meetings-for-maximum-free-time-i)
**Companies:** Amazon, Bloomberg, Fivetran, Google, Meta

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

You are given an integer `eventTime` denoting the duration of an event, where the event occurs from time `t = 0` to time `t = eventTime`.

You are also given two integer arrays `startTime` and `endTime`, each of length `n`. These represent the start and end time of `n` **non-overlapping** meetings, where the `i^th` meeting occurs during the time `[startTime[i], endTime[i]]`.

You can reschedule **at most** `k` meetings by moving their start time while maintaining the **same duration**, to **maximize** the **longest** *continuous period of free time* during the event.

The **relative** order of all the meetings should stay the* same* and they should remain non-overlapping.

Return the **maximum** amount of free time possible after rearranging the meetings.

**Note** that the meetings can **not** be rescheduled to a time outside the event.

**Constraints:**
- `1 <= eventTime <= 10^9`
- `n == startTime.length == endTime.length`
- `2 <= n <= 10^5`
- `1 <= k <= n`
- `0 <= startTime[i] < endTime[i] <= eventTime`
- `endTime[i] <= startTime[i + 1]` where `i` lies in the range `[0, n - 2]`.

---

## Examples

**Example 1:**
```
Input: eventTime = 5, k = 1, startTime = [1,3], endTime = [2,5]
Output: 2
Explanation: Reschedule the meeting at [1, 2] to [2, 3], leaving no meetings during the time [0, 2].
```

**Example 2:**
```
Input: eventTime = 10, k = 1, startTime = [0,2,9], endTime = [1,4,10]
Output: 6
Explanation: Reschedule the meeting at [2, 4] to [1, 3], leaving no meetings during the time [3, 9].
```

**Example 3:**
```
Input: eventTime = 5, k = 2, startTime = [0,1,2,3,4], endTime = [1,2,3,4,5]
Output: 0
Explanation: There is no time during the event not occupied by meetings.
```

---

## Key Insight

> Moving k consecutive meetings to one side merges k+1 adjacent gaps. Use a **sliding window of size k** over meetings to find the window whose surrounding k+1 gaps sum to the maximum.

---

## Approach

```
// Sliding window over gaps between meetings
// Move k consecutive meetings to merge k+1 gaps
// Find maximum merged gap

FUNCTION MaxFreeTimeI(eventTime, k, startTime, endTime)
    n ← LENGTH(startTime)

    ——— Compute n+1 gaps ———
    gaps ← []
    APPEND startTime[0] to gaps                     // gap before first meeting
    FOR i ← 1 TO n-1 DO
        APPEND (startTime[i] - endTime[i-1]) to gaps
    END FOR
    APPEND (eventTime - endTime[n-1]) to gaps       // gap after last meeting

    ——— Sliding window of k+1 consecutive gaps ———
    windowSum ← SUM(gaps[0..k])
    best ← windowSum

    FOR i ← 1 TO n - k DO
        windowSum ← windowSum - gaps[i-1] + gaps[i+k]
        best ← MAX(best, windowSum)
    END FOR

    RETURN best
END FUNCTION
```

---

## Walkthrough

Example 2: `eventTime = 10, k = 1, startTime = [0,2,9], endTime = [1,4,10]`

Gaps: [0, 1, 5, 0] → before meeting 0 (0-0), between 0-1 (2-1), between 1-2 (9-4), after meeting 2 (10-10).

Window size = k+1 = 2:

| Window | Gaps included | Sum |
|--------|--------------|-----|
| [0,1]  | 0 + 1        | 1   |
| [1,2]  | 1 + 5        | 6   |
| [2,3]  | 5 + 0        | 5   |

Best = **6** (move meeting [2,4] left to [1,3], freeing [3,9]), matching the expected output.

Check Example 1: gaps [1, 1, 0], windows 1+1 = 2 and 1+0 = 1 → **2**. Example 3: all gaps are 0 → **0**.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) — compute gaps + sliding window |
| Space  | O(n) — gaps array |

---

## Follow-Up Questions

1. **Why k+1 gaps instead of k?**
   → Moving k consecutive meetings merges the gap before the first, between each pair, and after the last — that's k+1 gaps total.

2. **What if meetings can be moved to any slot (not just shifted)?**
   → That's variant II — requires checking if the meeting fits in a distant gap.

3. **What if k = n (can move all meetings)?**
   → All gaps merge; answer = `eventTime - sum(all meeting durations)`.

---

## Key Takeaway

> Rearranging k consecutive elements to maximize a merged gap is a classic **sliding window over gaps** pattern — compute all gaps, then slide a window of size k+1 to find the maximum sum.
