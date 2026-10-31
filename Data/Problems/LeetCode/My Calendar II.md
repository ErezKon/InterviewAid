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
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a **triple booking**.

A **triple booking** happens when three events have some non-empty intersection (i.e., some moment is common to all the three events.).

The event can be represented as a pair of integers `startTime` and `endTime` that represents a booking on the half-open interval `[startTime, endTime)`, the range of real numbers `x` such that `startTime <= x < endTime`.

Implement the `MyCalendarTwo` class:

- `MyCalendarTwo()` Initializes the calendar object.
- `boolean book(int startTime, int endTime)` Returns `true` if the event can be added to the calendar successfully without causing a **triple booking**. Otherwise, return `false` and do not add the event to the calendar.

**Constraints:**
- `0 <= start < end <= 10^9`
- At most `1000` calls will be made to `book`.

---

## 2. Key Insight

> Maintain two collections: `bookings` for all events and `overlaps` for intervals where a double booking already exists. A new event creates a triple booking only if it overlaps any interval in `overlaps`.

---

## 3. Approach: Two Lists — O(n²) ✅

```text
CLASS MyCalendarTwo:
    CONSTRUCTOR:
        bookings ← []   // all events
        overlaps ← []   // double-booked intervals

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
Input
["MyCalendarTwo", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output:
[null, true, true, true, false, true, true]
Explanation:
MyCalendarTwo myCalendarTwo = new MyCalendarTwo();
myCalendarTwo.book(10, 20); // return True, The event can be booked.
myCalendarTwo.book(50, 60); // return True, The event can be booked.
myCalendarTwo.book(10, 40); // return True, The event can be double booked.
myCalendarTwo.book(5, 15);  // return False, The event cannot be booked, because it would result in a triple booking.
myCalendarTwo.book(5, 10); // return True, The event can be booked, as it does not use time 10 which is already double booked.
myCalendarTwo.book(25, 55); // return True, The event can be booked, as the time in [25, 40) will be double booked with the third event, the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.
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

## 7. Follow-Up Questions

- How can you improve the time complexity to O(n log n) using an interval tree?
- What changes are needed to support cancellation of events?
- Could you extend the design to allow up to `k` overlapping bookings?

---

## 8. Key Takeaway

> **Two-layer tracking** – keep all events and explicitly store double-booked intervals. A triple booking occurs when a new event intersects any stored double-booking.
