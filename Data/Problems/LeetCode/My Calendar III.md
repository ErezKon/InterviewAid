# 732. My Calendar III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/my-calendar-iii](https://leetcode.com/problems/my-calendar-iii)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Implement a calendar. After each booking, return the maximum **k-booking** — the max number of overlapping events at any point.

---

## 2. Examples

| Input (bookings) | Output |
|------------------|--------|
| `book(10, 20)`, `book(15, 25)`, `book(20, 30)` | `[1, 2, 2]` |
| `book(5, 10)`, `book(10, 15)`, `book(5, 15)` | `[1, 1, 2]` |

**Explanation:** After each call to `book`, the function returns the current maximum number of overlapping intervals.

---

## 3. Approach

**Line Sweep** – treat each start time as `+1` and each end time as `-1`. Sort all timestamps and sweep, maintaining a running count of active events. The maximum count encountered is the answer.

```text
CLASS MyCalendarThree:
    CONSTRUCTOR:
        timeline ← empty sorted map

    FUNCTION book(start, end):
        timeline[start] ← timeline.get(start, 0) + 1
        timeline[end]   ← timeline.get(end,   0) - 1

        maxK ← 0
        active ← 0
        FOR time IN sorted keys of timeline:
            active ← active + timeline[time]
            maxK ← MAX(maxK, active)
        RETURN maxK
```

---

## 4. Walkthrough

Consider the sequence `book(10,20)`, `book(15,25)`, `book(20,30)`.

| Step | Operation | Timeline after update | Sweep (active) | Max K |
|------|-----------|-----------------------|----------------|-------|
| 1 | `book(10,20)` | {10:+1, 20:-1} | 10:+1 → 1 | 1 |
| 2 | `book(15,25)` | {10:+1, 15:+1, 20:-1, 25:-1} | 10:+1 →1, 15:+1 →2 | 2 |
| 3 | `book(20,30)` | {10:+1, 15:+1, 20:0, 25:-1, 30:-1} (20 cancels) | 10:+1 →1, 15:+1 →2, 20:0 →2, 25:-1 →1 | 2 |

The maximum concurrent bookings observed is **2**.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) for each `book` due to sorting the timeline (or O(log n) with a balanced BST) |
| **Space** | O(n) to store the timeline |

---

## 6. Follow-Up Questions

* How would you support **cancellation** of a booking?
* Can you achieve **O(log n)** per `book` using a segment tree or binary indexed tree?
* How would the solution change if the time range is bounded (e.g., 0 ≤ time ≤ 10⁹)?

---

## 7. Key Takeaway

> **Line sweep is the canonical pattern for max overlap queries.** `+1` at start, `-1` at end, sweep and track running count. Can be optimized with segment tree for O(log n) per query.
