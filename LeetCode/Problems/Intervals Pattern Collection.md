# Interval Problem Collection

---

## Problem Description

This collection groups classic interval manipulation problems. Each problem asks you to process a list of intervals—pairs of start and end points—under various constraints such as merging overlapping intervals, inserting a new interval, counting overlaps, or partitioning the timeline.

## Examples

1. **Merge Intervals** – Input: `[[1,3],[2,6],[8,10],[15,18]]` → Output: `[[1,6],[8,10],[15,18]]`.
2. **Insert Interval** – Input: intervals `[[1,3],[6,9]]`, new interval `[2,5]` → Output: `[[1,5],[6,9]]`.
3. **Meeting Rooms II** – Input: `[[0,30],[5,10],[15,20]]` → Output: `2` rooms needed.

## Approach

1. **Sort by start time** – Most interval problems begin by sorting intervals ascending on their start.
2. **Greedy selection** – For non‑overlapping selections (e.g., minimum arrows), iterate sorted intervals and keep the interval with the smallest end that does not conflict.
3. **Line sweep** – Transform each interval into two events `(start, +1)` and `(end, -1)`, sort all events, then sweep to count concurrent intervals.

```text
FUNCTION lineSweep(intervals):
    events ← []
    FOR each [s, e] IN intervals:
        events.APPEND((s, +1))
        events.APPEND((e, -1))
    SORT events BY first element
    active ← 0
    maxActive ← 0
    FOR (point, delta) IN events:
        active ← active + delta
        maxActive ← MAX(maxActive, active)
    RETURN maxActive
```

## Walkthrough

| Step | Intervals | Action |
|------|-----------|--------|
| 1 | `[[1,3],[2,6],[8,10],[15,18]]` | Sort → same order |
| 2 | Merge first two (overlap) → `[1,6]` | Keep `[1,6]` |
| 3 | Append `[8,10]` (no overlap) |
| 4 | Append `[15,18]` |
| Result | `[[1,6],[8,10],[15,18]]` |

## Complexity Analysis

- **Time:** O(n log n) for sorting (or O(n) if intervals are pre‑sorted).
- **Space:** O(n) for the events list or merged output.

## Follow‑Up Questions

1. How would you support dynamic insertions and deletions of intervals?
2. Can you answer range count queries efficiently using a segment tree or binary indexed tree?
3. Extend the problem to 2‑D rectangles—what additional challenges arise?

## Key Takeaway

Sorting by start time and applying a greedy or line‑sweep strategy solves the majority of interval problems efficiently.
