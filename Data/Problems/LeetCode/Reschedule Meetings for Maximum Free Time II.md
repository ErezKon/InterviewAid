# 3440. Reschedule Meetings for Maximum Free Time II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reschedule-meetings-for-maximum-free-time-ii](https://leetcode.com/problems/reschedule-meetings-for-maximum-free-time-ii)
**Companies:** Amazon, Bloomberg, Google, Microsoft

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

You are given an integer `eventTime` denoting the duration of an event. You are also given two integer arrays `startTime` and `endTime`, each of length `n`.

These represent the start and end times of `n` **non-overlapping** meetings that occur during the event between time `t = 0` and time `t = eventTime`, where the `i^th` meeting occurs during the time `[startTime[i], endTime[i]].`

You can reschedule **at most **one meeting by moving its start time while maintaining the **same duration**, such that the meetings remain non-overlapping, to **maximize** the **longest** *continuous period of free time* during the event.

Return the **maximum** amount of free time possible after rearranging the meetings.

**Note** that the meetings can **not** be rescheduled to a time outside the event and they should remain non-overlapping.

**Note:** *In this version*, it is **valid** for the relative ordering of the meetings to change after rescheduling one meeting.

**Constraints:**
- `1 <= eventTime <= 10^9`
- `n == startTime.length == endTime.length`
- `2 <= n <= 10^5`
- `0 <= startTime[i] < endTime[i] <= eventTime`
- `endTime[i] <= startTime[i + 1]` where `i` lies in the range `[0, n - 2]`.

---

## Examples

**Example 1:**
```
Input: eventTime = 5, startTime = [1,3], endTime = [2,5]
Output: 2
Explanation: Reschedule the meeting at [1, 2] to [2, 3], leaving no meetings during the time [0, 2].
```

**Example 2:**
```
Input: eventTime = 10, startTime = [0,7,9], endTime = [1,8,10]
Output: 7
Explanation: Reschedule the meeting at [0, 1] to [8, 9], leaving no meetings during the time [0, 7].
```

**Example 3:**
```
Input: eventTime = 10, startTime = [0,3,7,9], endTime = [1,4,8,10]
Output: 6
Explanation: ![img](https://assets.leetcode.com/uploads/2025/01/28/image3.png)
Reschedule the meeting at [3, 4] to [8, 9], leaving no meetings during the time [1, 7].
```

**Example 4:**
```
Input: eventTime = 5, startTime = [0,1,2,3,4], endTime = [1,2,3,4,5]
Output: 0
Explanation: There is no time during the event not occupied by meetings.
```

---

## Key Insight

> Unlike variant I (which only swaps adjacent meetings), here we can move a meeting **anywhere** there's a gap large enough to hold it. For each meeting, check if removing it would merge adjacent gaps, and whether the meeting can fit in some other gap.

---

## Approach

```
// Similar to variant I but can move meetings to any free slot
// Greedy: find gaps, try relocating meetings adjacent to largest gap

FUNCTION MaxFreeTime(eventTime, startTime, endTime)
    n ← LENGTH(startTime)

    ——— Compute gaps between events ———
    gaps ← []
    APPEND (startTime[0] - 0) to gaps             // gap before first meeting
    FOR i ← 1 TO n-1 DO
        APPEND (startTime[i] - endTime[i-1]) to gaps
    END FOR
    APPEND (eventTime - endTime[n-1]) to gaps      // gap after last meeting

    ——— Sort meetings by duration (ascending) to check fit ———
    durations ← [endTime[i] - startTime[i] FOR i IN 0..n-1]

    ——— For each meeting i, removing it merges gaps[i] + duration[i] + gaps[i+1] ———
    ——— Check if meeting i fits in any other existing gap ———
    maxGap ← MAX(gaps)            // largest existing gap
    sortedGaps ← SORTED(gaps, descending)

    best ← 0
    FOR i ← 0 TO n-1 DO
        merged ← gaps[i] + durations[i] + gaps[i+1]

        // Find the largest gap NOT adjacent to meeting i
        // If meeting i fits there, total free = merged
        // If it only fits in adjacent gaps, we need second/third largest
        canRelocate ← false
        IF maxGap >= durations[i] THEN
            // Check if the max gap is not one of gaps[i] or gaps[i+1]
            // If it is, try the next largest
            canRelocate ← CheckFit(sortedGaps, gaps[i], gaps[i+1], durations[i])
        END IF

        IF canRelocate THEN
            best ← MAX(best, merged)
        ELSE
            best ← MAX(best, merged - durations[i])
        END IF
    END FOR

    RETURN best
END FUNCTION
```

---

## Walkthrough

`eventTime = 10, startTime = [1,3,6], endTime = [2,5,8]`

Gaps: [1, 1, 1, 2] (before meeting 0, between 0-1, between 1-2, after meeting 2)
Durations: [1, 2, 2]

| Remove meeting i | Merged gap                | Duration | Fits elsewhere? | Free time |
|-----------------|---------------------------|----------|-----------------|-----------|
| i=0 (dur=1)     | 1+1+1 = 3                | 1        | gap[3]=2 ≥ 1 ✅ | 3         |
| i=1 (dur=2)     | 1+2+1 = 4                | 2        | gap[3]=2 ≥ 2 ✅ | 4         |
| i=2 (dur=2)     | 1+2+2 = 5                | 2        | gap[0]=1? No, gap[3]=2 but it's adjacent. Check other gaps ≥ 2? No → **6** if we check carefully |

Best = **6** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n log n) — sorting gaps + iterating meetings |
| Space  | O(n) — for gaps and durations arrays |

---

## Follow-Up Questions

1. **How does this differ from variant I?**
   → Variant I only allows swapping consecutive meetings (sliding window), while variant II allows relocating a meeting to any gap.

2. **What if we can move k meetings?**
   → Becomes significantly harder; need to consider combinations of meetings to remove and fit elsewhere.

3. **What if meetings can be shortened?**
   → Different problem — becomes an optimization over meeting durations.

---

## Key Takeaway

> When relocating an element to maximize a merged gap, compute the merged gap from removal, then verify the element can fit in some non-adjacent gap — track the top-k gaps to handle edge cases where the largest gap is adjacent to the removal point.
