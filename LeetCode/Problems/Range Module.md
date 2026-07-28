# 715. Range Module

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/range-module](https://leetcode.com/problems/range-module)
**Companies:** Amazon, Coupang, Google, Machine Zone, Meta
---

## Problem Description
Implement a data structure that tracks a set of integer intervals on the number line. It must support adding a range `[left, right)`, removing a range, and querying whether a given range is completely covered by the tracked intervals. All operations should be efficient for a large number of calls.

## Examples
- After `addRange(10,20)`, `queryRange(14,16)` returns `true`.
- After `removeRange(14,16)`, `queryRange(14,16)` returns `false` while `queryRange(10,14)` remains `true`.
- Overlapping adds merge: `addRange(5,8)` then `addRange(7,10)` results in a single interval `[5,10)`.

## Approach
Maintain a sorted list (or balanced BST) of non‑overlapping intervals `[start, end)`. For each operation, locate the first interval that may overlap using binary search, then merge or split as needed.

```text
CLASS RangeModule:
    CONSTRUCTOR:
        SET intervals ← empty sorted list of [start, end)
    FUNCTION addRange(left, right):
        // Find position to insert, merge overlapping intervals
        SET i ← BINARY_SEARCH(intervals, left)
        WHILE i < SIZE(intervals) AND intervals[i][0] ≤ right:
            SET left ← MIN(left, intervals[i][0])
            SET right ← MAX(right, intervals[i][1])
            REMOVE intervals[i]
        END WHILE
        INSERT [left, right] AT position i
    FUNCTION queryRange(left, right):
        SET i ← BINARY_SEARCH(intervals, left)
        IF i == 0: RETURN false
        SET interval ← intervals[i-1]
        RETURN interval[0] ≤ left AND interval[1] ≥ right
    FUNCTION removeRange(left, right):
        // Remove overlapping parts, possibly split intervals
        SET i ← BINARY_SEARCH(intervals, left)
        WHILE i < SIZE(intervals) AND intervals[i][0] < right:
            SET cur ← intervals[i]
            IF cur[0] < left:
                INSERT [cur[0], left] AT position i
                INCREMENT i
            END IF
            IF cur[1] > right:
                INSERT [right, cur[1]] AT position i+1
            END IF
            REMOVE intervals[i]
        END WHILE
END CLASS
```

## Walkthrough
| Step | Operation | Intervals after operation |
|------|-----------|---------------------------|
|1|addRange(10,20)|`[10,20)`|
|2|addRange(14,16) (inside existing)|`[10,20)` (no change)|
|3|removeRange(14,16)|`[10,14)`, `[16,20)`|
|4|queryRange(12,13)|`true` (covered by `[10,14)`)|
|5|queryRange(14,16)|`false` (gap between intervals)|

## Complexity Analysis
- Each operation performs binary search O(log n) plus linear work over overlapping intervals. In the worst case O(k + log n) where k is number of intervals merged or split.
- Space: O(n) to store the intervals.

## Follow‑Up Questions
1. How would you adapt the structure for floating‑point ranges?
2. Can you support range sum queries in addition to coverage?
3. What if intervals need to be persisted across restarts (disk‑based storage)?

## Key Takeaway
A sorted collection of non‑overlapping intervals enables efficient add, remove, and query operations by merging and splitting only the affected intervals.
