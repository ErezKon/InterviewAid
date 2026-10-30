# 352. Data Stream as Disjoint Intervals

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/data-stream-as-disjoint-intervals](https://leetcode.com/problems/data-stream-as-disjoint-intervals)
**Companies:** Amazon, Google

---

## Problem Description

Given a data stream input of non-negative integers `a1, a2, ..., an`, summarize the numbers seen so far as a list of disjoint intervals.

Implement the `SummaryRanges` class:

- `SummaryRanges()` Initializes the object with an empty stream.
- `void addNum(int value)` Adds the integer `value` to the stream.
- `int[][] getIntervals()` Returns a summary of the integers in the stream currently as a list of disjoint intervals `[start_i, end_i]`. The answer should be sorted by `start_i`.

**Constraints:**

- `0 <= value <= 10^4`
- At most `3 * 10^4` calls will be made to `addNum` and `getIntervals`.
- At most `10^2` calls will be made to `getIntervals`.

**Follow up:** What if there are lots of merges and the number of disjoint intervals is small compared to the size of the data stream?

---

## Examples

```
Example 1:
  Input:
  ["SummaryRanges", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals"]
  [[], [1], [], [3], [], [7], [], [2], [], [6], []]
  Output:
  [null, null, [[1, 1]], null, [[1, 1], [3, 3]], null, [[1, 1], [3, 3], [7, 7]], null, [[1, 3], [7, 7]], null, [[1, 3], [6, 7]]]
  Explanation:
  SummaryRanges summaryRanges = new SummaryRanges();
  summaryRanges.addNum(1);      // arr = [1]
  summaryRanges.getIntervals(); // return [[1, 1]]
  summaryRanges.addNum(3);      // arr = [1, 3]
  summaryRanges.getIntervals(); // return [[1, 1], [3, 3]]
  summaryRanges.addNum(7);      // arr = [1, 3, 7]
  summaryRanges.getIntervals(); // return [[1, 1], [3, 3], [7, 7]]
  summaryRanges.addNum(2);      // arr = [1, 2, 3, 7]
  summaryRanges.getIntervals(); // return [[1, 3], [7, 7]]
  summaryRanges.addNum(6);      // arr = [1, 2, 3, 6, 7]
  summaryRanges.getIntervals(); // return [[1, 3], [6, 7]]
```

---

## Approach

```
CLASS SummaryRanges:
    intervals ← SortedList of [start, end]

    FUNCTION addNum(val):
        // Find insertion index using binary search
        idx ← BINARY_SEARCH(intervals, val)
        // Check left neighbor
        leftMerge ← FALSE
        IF idx > 0 AND intervals[idx-1].end + 1 ≥ val:
            leftIdx ← idx-1
            leftMerge ← TRUE
        // Check right neighbor
        rightMerge ← FALSE
        IF idx < LENGTH(intervals) AND intervals[idx].start - 1 ≤ val:
            rightIdx ← idx
            rightMerge ← TRUE
        // Merge cases
        IF leftMerge AND rightMerge:
            // Merge left and right intervals with val
            intervals[leftIdx].end ← intervals[rightIdx].end
            DELETE intervals[rightIdx]
        ELSE IF leftMerge:
            intervals[leftIdx].end ← MAX(intervals[leftIdx].end, val)
        ELSE IF rightMerge:
            intervals[rightIdx].start ← MIN(intervals[rightIdx].start, val)
        ELSE:
            INSERT [val, val] AT idx INTO intervals

    FUNCTION getIntervals():
        RETURN COPY OF intervals
```

---

## Walkthrough

Consider the sequence `1, 3, 7, 2, 6`:

1. **addNum(1)** → intervals = `[[1,1]]`
2. **addNum(3)** → no adjacent interval, insert → `[[1,1],[3,3]]`
3. **addNum(7)** → insert → `[[1,1],[3,3],[7,7]]`
4. **addNum(2)** → merges with left `[1,1]` and right `[3,3]` → `[[1,3],[7,7]]`
5. **addNum(6)** → merges with right `[7,7]` (since 6+1 = 7) → `[[1,3],[6,7]]`

The table above matches the **Examples** section.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log n) per `addNum` (binary search), O(k) for `getIntervals` where k is number of intervals |
| **Space** | O(n) to store intervals |

---

## Follow-Up Questions

* How would you modify the structure to support removal of numbers?
* Can you achieve O(1) amortized time for `addNum` using a different data structure?
* How would you adapt the solution for a distributed stream of numbers?

---

## Key Takeaway

> **Streaming interval merge:** maintain a sorted list of intervals, binary‑search the insertion point, and merge with neighboring intervals when possible.
