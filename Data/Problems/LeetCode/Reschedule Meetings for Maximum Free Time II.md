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

> Unlike variant I (where meetings keep their order and can only shift), here a single meeting can be moved **anywhere** there's a gap large enough to hold it. Removing meeting i always merges `gaps[i] + gaps[i+1]`; if it also fits into some **non-adjacent** gap, its own duration is freed too, giving `gaps[i] + dur[i] + gaps[i+1]`. Prefix/suffix maxima of gaps answer "largest non-adjacent gap" in O(1).

---

## Approach

```
// gaps[j] = free time before meeting j (gaps[n] = after last meeting)
// For meeting i, the adjacent gaps are gaps[i] and gaps[i+1]
// Non-adjacent gaps: gaps[0..i-1] and gaps[i+2..n]

FUNCTION MaxFreeTime(eventTime, startTime, endTime)
    n ← LENGTH(startTime)

    ——— Compute n+1 gaps ———
    gaps ← [startTime[0]]
    FOR i ← 1 TO n-1 DO
        APPEND (startTime[i] - endTime[i-1]) to gaps
    END FOR
    APPEND (eventTime - endTime[n-1]) to gaps

    ——— Prefix / suffix maxima of gaps ———
    prefMax[j] ← MAX(gaps[0..j]),   suffMax[j] ← MAX(gaps[j..n]),   (empty range → 0)

    best ← 0
    FOR i ← 0 TO n-1 DO
        dur ← endTime[i] - startTime[i]
        other ← MAX(prefMax[i-1], suffMax[i+2])     // largest non-adjacent gap
        IF other >= dur THEN
            best ← MAX(best, gaps[i] + dur + gaps[i+1])   // move meeting i away entirely
        ELSE
            best ← MAX(best, gaps[i] + gaps[i+1])         // just slide it to one side
        END IF
    END FOR

    RETURN best
END FUNCTION
```

---

## Walkthrough

Example 3: `eventTime = 10, startTime = [0,3,7,9], endTime = [1,4,8,10]`

Gaps: [0, 2, 3, 1, 0] (before meeting 0, between 0-1, 1-2, 2-3, after meeting 3)
Durations: [1, 1, 1, 1]

| Meeting i | gaps[i] + dur + gaps[i+1] | Largest non-adjacent gap | Fits? | Free time |
|-----------|---------------------------|--------------------------|-------|-----------|
| i=0 | 0+1+2 = 3 | max(gaps[2..4]) = 3 | yes | 3 |
| i=1 | 2+1+3 = 6 | max(gaps[0], gaps[3..4]) = 1 | yes | 6 |
| i=2 | 3+1+1 = 5 | max(gaps[0..1], gaps[4]) = 2 | yes | 5 |
| i=3 | 1+1+0 = 2 | max(gaps[0..2]) = 3 | yes | 2 |

Best = **6** (move [3,4] into the gap [8,9], freeing [1,7]), matching the expected output.

Example 2 (`[0,7,9]`, `[1,8,10]`): gaps [0, 6, 1, 0]. For i=0, merged = 0+1+6 = 7 and gap 1 (between meetings 1 and 2) can hold it → **7**.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) - gaps, prefix/suffix maxima, one pass over meetings |
| Space  | O(n) - gaps and prefix/suffix arrays |

---

## Follow-Up Questions

1. **How does this differ from variant I?**
   → Variant I keeps the relative order (sliding window over k+1 gaps), while variant II allows relocating one meeting into any gap.

2. **What if we can move k meetings?**
   → Becomes significantly harder; need to consider combinations of meetings to remove and fit elsewhere.

3. **What if meetings can be shortened?**
   → Different problem - becomes an optimization over meeting durations.

---

## Key Takeaway

> When relocating one element to maximize a merged gap, compute the merged gap from removal, then check whether the element fits in some non-adjacent gap - prefix and suffix maxima make that check O(1) per element.
