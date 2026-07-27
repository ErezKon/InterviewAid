# 729. My Calendar I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/my-calendar-i](https://leetcode.com/problems/my-calendar-i)
**Companies:** Amazon, Bloomberg, Flexport, Google, Intuit, Meta, Microsoft, Oracle, Snowflake, Tiktok, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sorted List + Binary Search — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Implement a calendar where you can add events. An event `[start, end)` can only be added if it doesn't overlap with existing events.

**Constraints:**
- `0 <= start < end <= 10⁹`

---

## 2. Key Insight

> Keep events sorted by start time. On each booking, binary search to find neighbors and check for overlap with the previous and next events.

---

## 3. Approach: Sorted List + Binary Search — O(n log n) ✅

```
CLASS MyCalendar:
    CONSTRUCTOR:
        events = []    // sorted by start

    FUNCTION book(start, end):
        // Binary search for insertion point
        idx = bisect_right(events, (start, end))

        // Check overlap with previous and next event
        IF idx > 0 AND events[idx - 1][1] > start:
            RETURN false
        IF idx < len(events) AND events[idx][0] < end:
            RETURN false

        events.INSERT(idx, (start, end))
        RETURN true
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) search, O(n) insert per booking |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Sorted list + neighbor overlap check.** Two intervals `[s1,e1)` and `[s2,e2)` overlap iff `s1 < e2 AND s2 < e1`. Only need to check immediate neighbors in sorted order.
