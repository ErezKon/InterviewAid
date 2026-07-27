# 759. Employee Free Time

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/employee-free-time](https://leetcode.com/problems/employee-free-time)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, Citadel, Google, Intuit, Meta, Microsoft, Pinterest, Roblox, Tiktok

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Merge All Intervals](#approach-merge-all-intervals--on-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a list of schedules for each employee (each schedule is a list of non-overlapping sorted intervals), return the list of **common free time** intervals across all employees, in sorted order.

**Constraints:**
- `1 <= schedule.length, schedule[i].length <= 50`
- `0 <= start < end <= 10^8`

---

## Examples

```
Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
Output: [[3,4]]
Explanation: All busy times merged: [1,3],[4,10]. Gap = [3,4].

Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
Output: [[5,6],[7,9]]
```

---

## Key Insight

> Flatten all intervals from all employees into one list, sort, merge overlapping intervals, then the **gaps between merged intervals** are the common free times. Individual employee separation doesn't matter — we only care about collective busy periods.

---

## Approach: Merge All Intervals — O(n log n) ✅

```
FUNCTION employeeFreeTime(schedule):
    // Flatten all intervals
    intervals = []
    FOR employee IN schedule:
        FOR interval IN employee:
            intervals.ADD(interval)

    SORT intervals by start

    // Merge and find gaps
    merged = [intervals[0]]
    result = []

    FOR i ← 1 TO len(intervals) - 1:
        IF intervals[i].start > merged.LAST().end:
            result.ADD([merged.LAST().end, intervals[i].start])
            merged.ADD(intervals[i])
        ELSE:
            merged.LAST().end = MAX(merged.LAST().end, intervals[i].end)

    RETURN result
```

---

## Walkthrough

```
schedule = [[[1,2],[5,6]], [[1,3]], [[4,10]]]

Flatten: [1,2], [5,6], [1,3], [4,10]
Sorted:  [1,2], [1,3], [4,10], [5,6]

Merge:
  Start: merged = [[1,2]]
  [1,3]: overlaps → extend to [1,3]. merged = [[1,3]]
  [4,10]: gap! free time = [3,4]. merged = [[1,3],[4,10]]
  [5,6]: overlaps [4,10] → no change.

Result: [[3,4]] ✅
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(n log n) | n = total intervals across all employees, sorting dominates |
| **Space** | O(n) | Flattened + merged lists |

---

## Follow-Up Questions

**Q1: Can you solve without flattening using a min-heap?**
> Yes. Use a k-way merge: put the first interval of each employee in a min-heap. Pop smallest, merge with running interval, push the next interval from that employee. This is O(n log k) where k = employees.

**Q2: What if you only want free time of length ≥ T?**
> Filter the result: only include gaps where `end - start >= T`.

---

## Key Takeaway

> **Flatten all intervals, sort, merge, and find gaps. The gaps are the free time. Same core technique as Merge Intervals (LC 56) but looking for the holes instead of the merged result.**
