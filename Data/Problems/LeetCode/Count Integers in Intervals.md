# 2276. Count Integers in Intervals

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-integers-in-intervals](https://leetcode.com/problems/count-integers-in-intervals)
**Companies:** Databricks, Google, Linkedin, Uber

---

## Problem Description
Given an **empty** set of intervals, implement a data structure that can:

- **Add** an interval to the set of intervals.
- **Count** the number of integers that are present in **at least one** interval.

Implement the `CountIntervals` class:

- `CountIntervals()` Initializes the object with an empty set of intervals.
- `void add(int left, int right)` Adds the interval `[left, right]` to the set of intervals.
- `int count()` Returns the number of integers that are present in **at least one** interval.

**Note** that an interval `[left, right]` denotes all the integers `x` where `left <= x <= right`.

**Constraints:**
- `1 <= left <= right <= 10^9`
- At most `10^5` calls **in total** will be made to `add` and `count`.
- At least **one** call will be made to `count`.

## Examples
```
Example 1:
  Input
  ["CountIntervals", "add", "add", "count", "add", "count"]
  [[], [2, 3], [7, 10], [], [5, 8], []]
  Output
  [null, null, null, 6, null, 8]

  Explanation
  CountIntervals countIntervals = new CountIntervals(); // initialize the object with an empty set of intervals.
  countIntervals.add(2, 3);  // add [2, 3] to the set of intervals.
  countIntervals.add(7, 10); // add [7, 10] to the set of intervals.
  countIntervals.count();    // return 6
                             // the integers 2 and 3 are present in the interval [2, 3].
                             // the integers 7, 8, 9, and 10 are present in the interval [7, 10].
  countIntervals.add(5, 8);  // add [5, 8] to the set of intervals.
  countIntervals.count();    // return 8
                             // the integers 2 and 3 are present in the interval [2, 3].
                             // the integers 5 and 6 are present in the interval [5, 8].
                             // the integers 7 and 8 are present in the intervals [5, 8] and [7, 10].
                             // the integers 9 and 10 are present in the interval [7, 10].
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
