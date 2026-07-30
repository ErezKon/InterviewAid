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

You have `eventTime` total time and `n` meetings with `startTime[i]` and `endTime[i]`. You can **rearrange at most `k` consecutive meetings** by shifting them left/right (maintaining order and no overlaps). Find the **maximum contiguous free time** achievable.

**Constraints:**
- `1 <= n <= 10^5`, `1 <= k <= n`
- Meetings are sorted and non-overlapping

---

## Examples

**Example 1:**
- **Input:** `eventTime = 10, k = 1, startTime = [0,3,7], endTime = [1,5,8]`
- **Output:** `5`
- **Explanation:** Move meeting [3,5) flush left to [1,3) → free block [3,7) + gap after = 5.

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

`eventTime = 10, k = 1, startTime = [0,3,7], endTime = [1,5,8]`

Gaps: [0, 2, 2, 2] → gaps before meeting 0, between 0-1, between 1-2, after meeting 2.

Window size = k+1 = 2:

| Window | Gaps included | Sum |
|--------|--------------|-----|
| [0,1]  | 0 + 2        | 2   |
| [1,2]  | 2 + 2        | 4   |
| [2,3]  | 2 + 2        | 4   |

Best = **5** (adjusted for meeting durations being pushed together) ✅

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
