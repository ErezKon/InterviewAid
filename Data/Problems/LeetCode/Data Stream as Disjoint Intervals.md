# 352. Data Stream as Disjoint Intervals

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/data-stream-as-disjoint-intervals](https://leetcode.com/problems/data-stream-as-disjoint-intervals)
**Companies:** Amazon, Google

---

## Problem Description

Design a data structure that receives integers from a stream and returns a summary of disjoint intervals covering all values seen so far.

---

## Examples

| Input | Output |
|-------|--------|
| `addNum(1)` | `[[1,1]]` |
| `addNum(3)` | `[[1,1],[3,3]]` |
| `addNum(7)` | `[[1,1],[3,3],[7,7]]` |
| `addNum(2)` | `[[1,3],[7,7]]` |
| `addNum(6)` | `[[1,3],[6,7]]` |

*Explanation:* After each insertion, the data structure merges adjacent numbers into intervals.

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
