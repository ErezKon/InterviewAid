# 1288. Remove Covered Intervals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-covered-intervals](https://leetcode.com/problems/remove-covered-intervals)
**Companies:** Amazon

---

## Problem Description
Given an array of intervals where `intervals[i] = [start_i, end_i]`, an interval `[a, b]` is said to be covered by another interval `[c, d]` if `c ≤ a` and `b ≤ d`. Return the number of intervals that are **not** covered by any other interval.

## Examples
**Example 1**
```
Input: intervals = [[1,4],[3,6],[2,8]]
Output: 2
Explanation: Interval [1,4] is covered by [2,8]; [3,6] is also covered. Only [2,8] remains.
```
**Example 2**
```
Input: intervals = [[1,4],[2,3]]
Output: 1
Explanation: [2,3] is covered by [1,4].
```

## Approach
Sort intervals by start ascending and end descending. Iterate, keeping track of the farthest `end` seen. An interval is covered if its `end` ≤ `maxEnd` seen so far.

```text
FUNCTION removeCoveredIntervals(intervals):
    SORT intervals BY start ASC, end DESC
    count ← 0
    maxEnd ← -∞
    FOR each (start, end) IN intervals:
        IF end > maxEnd:
            count ← count + 1
            maxEnd ← end
        // else interval is covered, skip
    RETURN count
```

## Walkthrough
For `[[1,4],[2,3],[3,5]]` after sorting → `[[1,4],[2,3],[3,5]]`:
| Interval | maxEnd before | end > maxEnd? | Action | maxEnd after |
|----------|---------------|--------------|--------|--------------|
| [1,4]    | -∞            | yes          | count=1| 4            |
| [2,3]    | 4             | no           | skip   | 4            |
| [3,5]    | 4             | yes          | count=2| 5            |
Result = 2 uncovered intervals.

## Complexity Analysis
Time: `O(n log n)` for sorting.
Space: `O(1)` extra beyond input storage.

## Follow-Up Questions
1. How would you modify the algorithm to also return the list of uncovered intervals?
2. Can this be solved in `O(n)` time if the intervals are already sorted?
3. What changes are needed if intervals can be nested multiple levels and you need the deepest nesting depth?

## Key Takeaway
Sorting by start ascending and end descending lets a single pass identify covered intervals by tracking the maximum end seen so far.
