# 252. Meeting Rooms

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/meeting-rooms](https://leetcode.com/problems/meeting-rooms)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Oracle, Palo Alto Networks, Tiktok, Uber

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

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an array of meeting times `intervals` where `intervals[i] = [start_i, end_i]`.

A person can attend all meetings if no two meeting intervals overlap. Meetings ending at time `t` and starting at time `t` **do not** overlap.

Return `true` if a person can attend all meetings. Otherwise, return `false`.

**Constraints:**
- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i < end_i <= 10^6`

---

## Examples

**Example 1:**
```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: false
```

**Example 2:**
```
Input: intervals = [[7,10],[2,4]]
Output: true
```

---

## Key Insight

> Sort by start time. If any meeting starts **before** the previous one ends, there's an overlap → can't attend all.

---

## Approach: Sort + Check Overlap — O(n log n) ✅

```
FUNCTION canAttendMeetings(intervals):
    SORT intervals BY start
    FOR i ← 1 TO n - 1 DO
        IF intervals[i].start < intervals[i-1].end THEN
            RETURN false
    RETURN true
```

---

## Walkthrough

```
intervals = [[7,10],[2,4]]
After sorting: [[2,4],[7,10]]

i=1: intervals[1].start=7 < intervals[0].end=4? No → continue
No overlap found → return true ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + scan | **O(n log n)** | **O(1)** |

---

## Follow-Up Questions

1. **What if we need the minimum rooms?** → Meeting Rooms II (LeetCode #253).
2. **What if intervals can be rescheduled?** → Interval scheduling maximization (greedy by end time).
3. **What about open vs closed endpoints?** If `end == start` of next meeting is allowed, use `≤` instead of `<`.

---

## Key Takeaway

> **Sort + adjacent overlap check** is the simplest interval conflict detection — O(n log n) from sorting, O(n) scan.

---
