# 757. Set Intersection Size At Least Two

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/set-intersection-size-at-least-two](https://leetcode.com/problems/set-intersection-size-at-least-two)
**Companies:** Amazon, Dp World, Drawbridge, Google, Meta, Microsoft

---

## Problem Description

Given a list of intervals, find the minimum size of a set `S` such that `S` intersects each interval in at least **2** points.

---

## Key Insight

> Sort by end ascending (start descending for ties). Greedily pick the last two points of each interval. Track the two largest selected points to decide how many new points each interval needs.

---

## Approach: Greedy — O(n log n) ✅

```
FUNCTION intersectionSizeTwo(intervals):
    SORT intervals by end ascending, then by start descending
    last1 = last2 = -1    // two largest elements in our set

    count = 0
    FOR [start, end] IN intervals:
        IF start > last1:
            // Need 2 new points
            last2 = end - 1
            last1 = end
            count += 2
        ELSE IF start > last2:
            // Need 1 new point
            last2 = last1
            last1 = end
            count += 1

    RETURN count
```
