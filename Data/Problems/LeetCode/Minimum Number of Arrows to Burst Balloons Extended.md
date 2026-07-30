# Greedy Interval Selection Patterns

**Difficulty:** 🟢 Easy
**Companies:** Various

---

## Problem Description

This file summarizes a family of interval‑selection problems on LeetCode. Each problem asks for the maximum number of non‑overlapping intervals (or the minimum number of resources such as arrows) given a set of intervals represented as `[start, end]`.

The core task is to select a subset of intervals that satisfy a greedy condition, often by sorting on the interval end point and iteratively picking the next interval whose start is not earlier than the end of the previously chosen interval.

## Examples

| Problem | Interval List | Goal |
|---------|---------------|------|
| #435 – Non‑overlapping Intervals | `[[1,2],[2,3],[3,4],[1,3]]` | Minimum removals to make intervals non‑overlapping |
| #452 – Minimum Number of Arrows to Burst Balloons | `[[1,6],[2,8],[7,12],[10,16]]` | Minimum arrows needed to intersect all intervals |
| #646 – Maximum Length of Pair Chain | `[[1,2],[2,3],[3,4]]` | Longest chain where each interval starts after the previous ends |
| #1024 – Video Stitching | `[[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]]` | Minimum clips to cover a target interval |

## Approach

**Algorithm:** Greedy interval scheduling (sort by end time)

1. **Sort** the intervals by their `end` coordinate in ascending order.
2. Initialise `count = 0` and `lastEnd = -∞`.
3. Iterate through the sorted intervals:
   - If `interval.start >= lastEnd`, the interval can be selected.
   - Increment `count` and set `lastEnd = interval.end`.
4. For problems that ask for *minimum* resources (e.g., arrows), the answer is `count` (or `totalIntervals - count` for removals).

```text
FUNCTION maxNonOverlapping(intervals):
    SORT intervals BY end ASC
    count ← 0
    lastEnd ← -INFINITY
    FOR each (start, end) IN intervals DO
        IF start ≥ lastEnd THEN
            count ← count + 1
            lastEnd ← end
        END IF
    END FOR
    RETURN count
```

## Walkthrough (Minimum Arrows Example)

| Step | Interval considered | `lastEnd` before | Decision | `lastEnd` after |
|------|--------------------|------------------|----------|-----------------|
| 1 | [1,6] | -∞ | select (arrow placed at 6) | 6 |
| 2 | [2,8] | 6 | start 2 < 6 → skip |
| 3 | [7,12] | 6 | select (new arrow at 12) | 12 |
| 4 | [10,16] | 12 | start 10 < 12 → skip |

Result: 2 arrows needed.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(m log m)** – sorting `m` intervals |
| Space  | **O(1)** – in‑place processing (aside from sort) |

## Follow‑Up Questions

1. How would the algorithm adapt if intervals had weights and we wanted a maximum‑weight non‑overlapping set?
2. Can we extend the greedy method to 2‑D rectangles (e.g., scheduling meetings in rooms with start/end times and locations)?
3. What if intervals are dynamic, with insertions and deletions; how to maintain the optimal count efficiently?

## Key Takeaway

Sorting intervals by their right endpoint and greedily picking the earliest‑ending compatible interval yields an optimal solution for a wide range of interval‑selection problems.
