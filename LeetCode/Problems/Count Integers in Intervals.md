# 2276. Count Integers in Intervals

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-integers-in-intervals](https://leetcode.com/problems/count-integers-in-intervals)
**Companies:** Databricks, Google, Linkedin, Uber

---

## Problem Description
Design a data structure that supports adding closed integer intervals `[left, right]` and querying the total number of distinct integers covered by all added intervals. Intervals may overlap; overlapping parts should be counted only once.

## Examples
**Example 1**
```
add(1, 3)   // intervals: [1,3]
add(5, 7)   // intervals: [1,3], [5,7]
count() → 6 // numbers {1,2,3,5,6,7}
add(2, 6)   // intervals merge to [1,7]
count() → 7 // numbers {1..7}
```
**Example 2**
```
add(10, 10)
count() → 1
add(10, 12)
count() → 3
```

## Approach
Maintain a sorted container of non‑overlapping intervals (e.g., a balanced BST). When adding a new interval, locate all existing intervals that intersect it, remove them, and replace with the merged span. Keep a running total of covered length, updating it by subtracting lengths of removed intervals and adding the length of the merged interval.

```text
CLASS CountIntervals:
    CONSTRUCTOR:
        SET intervals ← SortedList()   // stores [l, r] sorted by l
        SET total ← 0

    FUNCTION add(left, right):
        SET newL ← left
        SET newR ← right
        // Find first interval with end >= left
        FOR each interval [l, r] in intervals overlapping [left, right]:
            SET newL ← MIN(newL, l)
            SET newR ← MAX(newR, r)
            SET total ← total - (r - l + 1)
            REMOVE [l, r] from intervals
        INSERT [newL, newR] into intervals
        SET total ← total + (newR - newL + 1)

    FUNCTION count():
        RETURN total
```

## Walkthrough
Add `[1,3]`:
- No overlap, insert `[1,3]`, total = 3.
Add `[5,7]`:
- No overlap, insert, total = 3 + 3 = 6.
Add `[2,6]`:
- Overlaps `[1,3]` and `[5,7]`.
- Merge to `[1,7]`, subtract old lengths 3 and 3, add new length 7 → total = 6 - 6 + 7 = 7.

## Complexity Analysis
- **Time:** O(k log m) per `add`, where *k* is number of overlapping intervals and *m* is current interval count (log m for search, linear for removals). `count` is O(1).
- **Space:** O(m) for storing intervals.

## Follow‑Up Questions
1. How would you adapt the structure for a massive number of intervals streamed in real time?
2. Can the solution be extended to support removal of intervals?
3. What changes are needed if intervals are floating‑point ranges?

## Key Takeaway
Merging overlapping intervals in a sorted container lets you maintain the exact count of distinct covered integers with efficient updates.
