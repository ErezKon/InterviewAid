# 729. My Calendar I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/my-calendar-i](https://leetcode.com/problems/my-calendar-i)
**Companies:** Amazon, Bloomberg, Flexport, Google, Intuit, Meta, Microsoft, Oracle, Snowflake, Tiktok, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sorted List + Binary Search — O(n log n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a **double booking**.

A **double booking** happens when two events have some non-empty intersection (i.e., some moment is common to both events.).

The event can be represented as a pair of integers `startTime` and `endTime` that represents a booking on the half-open interval `[startTime, endTime)`, the range of real numbers `x` such that `startTime <= x < endTime`.

Implement the `MyCalendar` class:

- `MyCalendar()` Initializes the calendar object.
- `boolean book(int startTime, int endTime)` Returns `true` if the event can be added to the calendar successfully without causing a **double booking**. Otherwise, return `false` and do not add the event to the calendar.

**Constraints:**
- `0 <= start < end <= 10^9`
- At most `1000` calls will be made to `book`.

---

## 2. Key Insight

> Keep events sorted by start time. On each booking, binary search to find neighbors and check for overlap with the previous and next events.

---

## 3. Approach: Sorted List + Binary Search — O(n log n) ✅

```text
FUNCTION book(start, end):
    // events is a list of (start, end) sorted by start
    idx ← BINARY_SEARCH_INSERT_POSITION(events, start)
    // Check overlap with previous event
    IF idx > 0 AND events[idx-1][1] > start:
        RETURN false
    // Check overlap with next event
    IF idx < LENGTH(events) AND events[idx][0] < end:
        RETURN false
    INSERT events AT idx WITH (start, end)
    RETURN true
```

---

## 4. Examples

**Example 1:**
```
Input
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output:
[null, true, false, true]
Explanation:
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.
```

---

## 5. Walkthrough

| Step | Action |
|------|--------|
| 1 | Insert first event `[10,20)`. List: `[(10,20)]`. |
| 2 | Attempt `[15,25)`. Binary search gives index 1. Previous interval ends at 20 > 15 → overlap → reject. |
| 3 | Attempt `[20,30)`. Index 1, previous ends at 20 ≤ 20, next none → accept, list becomes `[(10,20),(20,30)]`. |

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) for binary search, O(n) for insertion (array) per booking |
| **Space** | O(n) to store events |

---

## 7. Follow-Up Questions

- How would you achieve O(log n) insertion time?
- Can you support range queries like “how many events overlap a given interval?”
- How would the solution change if events could be cancelled?

---

## 8. Key Takeaway

> **Sorted list + neighbor overlap check.** Two intervals `[s1,e1)` and `[s2,e2)` overlap iff `s1 < e2 AND s2 < e1`. Only need to check immediate neighbors in sorted order.
