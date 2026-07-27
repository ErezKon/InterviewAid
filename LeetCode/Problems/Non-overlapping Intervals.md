# 435. Non-overlapping Intervals

**Difficulty:** 🟡 Medium
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/non-overlapping-intervals](https://leetcode.com/problems/non-overlapping-intervals)
**Companies:** Amazon, Apple, Bloomberg, Capital One, Goldman Sachs, Google, Grammarly, Ibm, Jpmorgan, Meta, Microsoft, Oracle, Snowflake, Tcs, Tiktok, Verkada, Visa, Zoho

---

## 1. Problem Description

Given intervals, return the minimum number of intervals to remove to make the rest non-overlapping.

---

## 2. Approach: Greedy — Sort by End — O(n log n) ✅

```
FUNCTION eraseOverlapIntervals(intervals):
    SORT intervals by end
    count = 0
    prevEnd = -infinity

    FOR [start, end] IN intervals:
        IF start >= prevEnd:
            prevEnd = end       // keep this interval
        ELSE:
            count += 1          // remove this interval

    RETURN count
```

Equivalently: find max non-overlapping intervals, subtract from total.

| Time | Space |
|------|-------|
| O(n log n) | O(1) |

---

## Key Takeaway

> Activity selection problem: sort by end time, greedily keep non-overlapping intervals. Remove count = total - kept.
