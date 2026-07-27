# 732. My Calendar III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/my-calendar-iii](https://leetcode.com/problems/my-calendar-iii)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Line Sweep — O(n) per book](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Implement a calendar. After each booking, return the maximum **k-booking** — the max number of overlapping events at any point.

---

## 2. Key Insight

> **Line sweep / difference array.** Mark `+1` at start, `-1` at end. Sweep through all times to find max concurrent events.

---

## 3. Approach: Line Sweep — O(n) per book ✅

```
CLASS MyCalendarThree:
    CONSTRUCTOR:
        timeline = SortedDict()

    FUNCTION book(start, end):
        timeline[start] = timeline.get(start, 0) + 1
        timeline[end] = timeline.get(end, 0) - 1

        maxK = 0
        active = 0
        FOR time IN sorted(timeline):
            active += timeline[time]
            maxK = MAX(maxK, active)

        RETURN maxK
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) per book — scan all events |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Line sweep is the canonical pattern for max overlap queries.** `+1` at start, `-1` at end, sweep and track running count. Can be optimized with segment tree for O(log n) per query.
