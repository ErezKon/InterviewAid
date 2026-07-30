# 3009. Maximum Number of Intersections on the Chart

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-intersections-on-the-chart](https://leetcode.com/problems/maximum-number-of-intersections-on-the-chart)
**Companies:** Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `y` of length `n`, imagine drawing a line chart where point `i` is at `(i, y[i])` and consecutive points are connected by straight line segments. Return the **maximum number of intersections** that a horizontal line can have with this chart.

**Constraints:**
- `2 <= y.length <= 10^5`
- `1 <= y[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input:  y = [1, 2, 1, 2, 1, 3, 2]
Output: 5
Explanation: A horizontal line at y=1.5 crosses 5 segments.
```

---

## Key Insight

> Each segment between `(i, y[i])` and `(i+1, y[i+1])` covers the y-range `[min(y[i], y[i+1]), max(y[i], y[i+1])]`. A horizontal line at height `h` intersects the chart at all segments whose y-range contains `h`. This is a **sweep line** problem: count the maximum overlap of intervals.

Handle endpoints carefully: a line touching exactly at a point (local min/max) counts differently.

---

## Approach

```
FUNCTION maxIntersections(y)
    events ← []

    FOR i ← 0 TO n - 2 DO
        lo ← MIN(y[i], y[i+1])
        hi ← MAX(y[i], y[i+1])
        // Open interval (lo, hi) — segment crosses strictly inside
        events.ADD((lo, +1, "open"))   // segment starts
        events.ADD((hi, -1, "close"))  // segment ends

    SORT events by y-coordinate, with opens before closes at same y

    maxCrossings ← 0
    active ← 0
    FOR each (pos, delta, type) IN events DO
        active ← active + delta
        maxCrossings ← MAX(maxCrossings, active)

    RETURN maxCrossings
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — creating and sorting events |
| Space  | **O(n)** — events list |

---

## Follow-Up Questions

1. **How to handle horizontal segments (y[i] = y[i+1])?**
   A horizontal segment is only intersected at its exact y-value, not a range. Needs special counting.

2. **How does this relate to the "Maximum Population Year" problem?**
   Same sweep-line pattern — count overlapping intervals.

---

## Key Takeaway

> **Sweep line on y-intervals** — each chart segment becomes a y-range interval; the maximum intersection count equals the maximum interval overlap.
