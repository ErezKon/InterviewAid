# 731. My Calendar II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/my-calendar-ii](https://leetcode.com/problems/my-calendar-ii)
**Companies:** Amazon, Apple, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two Lists — O(n²)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow‑Up Questions](#7-follow‑up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Implement a calendar that allows **double bookings** but rejects any **triple booking**. Return `true` if a new event can be added without causing a triple overlap.

---

## 2. Key Insight

> Maintain two collections: `bookings` for all events and `overlaps` for intervals where a double booking already exists. A new event creates a triple booking only if it overlaps any interval in `overlaps`.

---

## 3. Approach: Two Lists — O(n²) ✅

```text
CLASS MyCalendarTwo:
    CONSTRUCTOR:
        bookings ← []   // all events
        overlaps ← []   // double‑booked intervals

    FUNCTION book(start, end):
        // Check for triple booking
        FOR [s, e] IN overlaps:
            IF start < e AND s < end:
                RETURN false
        // Record new double bookings
        FOR [s, e] IN bookings:
            IF start < e AND s < end:
                overlaps.ADD([MAX(start, s), MIN(end, e)])
        bookings.ADD([start, end])
        RETURN true
```

---

## 4. Examples

**Example 1:**
```
MyCalendarTwo.book(10,20) → true   // first event
MyCalendarTwo.book(50,60) → true   // no overlap
MyCalendarTwo.book(10,40) → true   // overlaps first, creates double booking [10,20)
MyCalendarTwo.book(5,15)  → false  // would overlap double‑booked [10,20) → triple booking
MyCalendarTwo.book(5,10)  → true   // touches boundary, allowed
```

---

## 5. Walkthrough

| Step | Action |
|------|--------|
| 1 | `bookings = []`, `overlaps = []`. Call `book(10,20)`. No overlaps → add to `bookings`. |
| 2 | Call `book(10,40)`. No `overlaps` yet, so iterate `bookings`, find overlap with `[10,20)`, add `[10,20)` to `overlaps`. Add `[10,40)` to `bookings`. |
| 3 | Call `book(5,15)`. Check `overlaps`: `[10,20)` overlaps (`5 < 20` and `10 < 15`) → reject (triple booking). |
| 4 | Call `book(5,10)`. Overlap check passes (boundary). Overlap with `[10,20)` not triggered because `5 < 20` but `10 < 10` is false. Add event. |

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) overall – each booking may scan all previous events |
| **Space** | O(n) for storing `bookings` and `overlaps` |

---

## 7. Follow‑Up Questions

- How can you improve the time complexity to O(n log n) using an interval tree?
- What changes are needed to support cancellation of events?
- Could you extend the design to allow up to `k` overlapping bookings?

---

## 8. Key Takeaway

> **Two‑layer tracking** – keep all events and explicitly store double‑booked intervals. A triple booking occurs when a new event intersects any stored double‑booking.
