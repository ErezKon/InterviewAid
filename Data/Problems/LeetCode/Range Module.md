# 715. Range Module

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/range-module](https://leetcode.com/problems/range-module)
**Companies:** Amazon, Coupang, Google, Machine Zone, Meta
---

## Problem Description
A Range Module is a module that tracks ranges of numbers. Design a data structure to track the ranges represented as **half-open intervals** and query about them.

A **half-open interval** `[left, right)` denotes all the real numbers `x` where `left <= x < right`.

Implement the `RangeModule` class:

- `RangeModule()` Initializes the object of the data structure.
- `void addRange(int left, int right)` Adds the **half-open interval** `[left, right)`, tracking every real number in that interval. Adding an interval that partially overlaps with currently tracked numbers should add any numbers in the interval `[left, right)` that are not already tracked.
- `boolean queryRange(int left, int right)` Returns `true` if every real number in the interval `[left, right)` is currently being tracked, and `false` otherwise.
- `void removeRange(int left, int right)` Stops tracking every real number currently being tracked in the **half-open interval** `[left, right)`.

**Constraints:**

- `1 <= left < right <= 10⁹`
- At most `10⁴` calls will be made to `addRange`, `queryRange`, and `removeRange`.

## Examples

```
Example 1:
  Input: ["RangeModule", "addRange", "removeRange", "queryRange", "queryRange", "queryRange"]
         [[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
  Output: [null, null, null, true, false, true]
  Explanation:
    RangeModule rangeModule = new RangeModule();
    rangeModule.addRange(10, 20);
    rangeModule.removeRange(14, 16);
    rangeModule.queryRange(10, 14); // return True,(Every number in [10, 14) is being tracked)
    rangeModule.queryRange(13, 15); // return False,(Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)
    rangeModule.queryRange(16, 17); // return True, (The number 16 in [16, 17) is still being tracked, despite the remove operation)
```

## Approach
Maintain a sorted list (or balanced BST) of non-overlapping intervals `[start, end)`. For each operation, locate the first interval that may overlap using binary search, then merge or split as needed.

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
- Each operation performs binary search O(log n) plus linear work over overlapping intervals. In the worst case O(k + log n) where k is number of intervals merged or split.
- Space: O(n) to store the intervals.

## Follow-Up Questions
1. How would you adapt the structure for floating-point ranges?
2. Can you support range sum queries in addition to coverage?
3. What if intervals need to be persisted across restarts (disk-based storage)?

## Key Takeaway
A sorted collection of non-overlapping intervals enables efficient add, remove, and query operations by merging and splitting only the affected intervals.
