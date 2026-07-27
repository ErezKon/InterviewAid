# 1851. Minimum Interval to Include Each Query

**Difficulty:** 🔴 Hard
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/minimum-interval-to-include-each-query](https://leetcode.com/problems/minimum-interval-to-include-each-query)
**Companies:** Amazon, Bloomberg, Google

---

## 1. Problem Description

Given intervals and queries, for each query find the size of the smallest interval containing that query point. Return -1 if no interval contains the query.

---

## 2. Approach: Sort + Min-Heap — O((n+q) log n) ✅

Sort intervals by start. Sort queries by value (keep original index). Sweep left to right, adding intervals whose start ≤ query to a min-heap (keyed by interval size). Remove expired intervals.

```
FUNCTION minInterval(intervals, queries):
    SORT intervals by start
    sortedQueries = SORT queries by value, keeping original index
    result = [-1] * len(queries)
    heap = MinHeap()    // (size, end)
    i = 0

    FOR (q, origIdx) IN sortedQueries:
        // Add all intervals starting ≤ q
        WHILE i < len(intervals) AND intervals[i].start <= q:
            size = intervals[i].end - intervals[i].start + 1
            heap.PUSH((size, intervals[i].end))
            i += 1

        // Remove intervals that ended before q
        WHILE heap AND heap.TOP().end < q:
            heap.POP()

        IF heap:
            result[origIdx] = heap.TOP().size

    RETURN result
```

| Time | Space |
|------|-------|
| O((n+q) log n) | O(n + q) |

---

## Key Takeaway

> Offline query processing: sort queries and intervals, sweep with a min-heap. Lazy deletion of expired intervals keeps the smallest valid interval at the top.
