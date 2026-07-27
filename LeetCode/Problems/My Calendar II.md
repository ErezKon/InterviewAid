# 731. My Calendar II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/my-calendar-ii](https://leetcode.com/problems/my-calendar-ii)
**Companies:** Amazon, Apple, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two Lists — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Implement a calendar allowing **double bookings** but not **triple bookings**. Return `true` if the event can be booked.

---

## 2. Key Insight

> Track two lists: `bookings` (all events) and `overlaps` (intersection of double-booked regions). A new event causes a triple booking only if it overlaps with any region in `overlaps`.

---

## 3. Approach: Two Lists — O(n²) ✅

```
CLASS MyCalendarTwo:
    CONSTRUCTOR: self.bookings = []; self.overlaps = []

    FUNCTION book(start, end):
        FOR [s, e] IN overlaps:
            IF start < e AND s < end: RETURN false    // triple booking
        FOR [s, e] IN bookings:
            IF start < e AND s < end:
                overlaps.ADD([MAX(start, s), MIN(end, e)])
        bookings.ADD([start, end])
        RETURN true
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) overall, O(n) per booking |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Two-layer tracking** — `bookings` for all events, `overlaps` for double-booked regions. A triple booking = new event overlapping an existing double-booking.
