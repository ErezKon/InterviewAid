# 352. Data Stream as Disjoint Intervals

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/data-stream-as-disjoint-intervals](https://leetcode.com/problems/data-stream-as-disjoint-intervals)
**Companies:** Amazon, Google

---

## Problem Description

Design a data structure that receives integers from a stream and returns a summary of disjoint intervals covering all values seen so far.

---

## Key Insight

Maintain a sorted structure of intervals. On `addNum(val)`, binary search for the insertion point, then check if `val` can merge with adjacent intervals (left, right, or both).

---

## Approach

```
CLASS SummaryRanges:
    intervals = SortedList of [start, end]

    FUNCTION addNum(val):
        // Binary search for position
        // Check if val merges with left interval (end+1 >= val)
        // Check if val merges with right interval (start-1 <= val)
        // Merge accordingly, or insert new [val, val]

    FUNCTION getIntervals():
        RETURN intervals
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log n) per addNum, O(n) per getIntervals |
| **Space** | O(n) |

---

## Key Takeaway

> **Streaming interval merge: maintain sorted intervals, binary search on addNum, check left/right neighbors for merge. SortedList or TreeMap gives O(log n) insertion.**
