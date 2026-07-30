# 435. Non-overlapping Intervals

**Difficulty:** 🟡 Medium
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/non-overlapping-intervals](https://leetcode.com/problems/non-overlapping-intervals)
**Companies:** Amazon, Apple, Bloomberg, Capital One, Goldman Sachs, Google, Grammarly, Ibm, Jpmorgan, Meta, Microsoft, Oracle, Snowflake, Tcs, Tiktok, Verkada, Visa, Zoho

---

## 1. Problem Description

Given a collection of intervals, determine the minimum number of intervals you need to remove so that the remaining intervals are non-overlapping.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[[1,2],[2,3],[3,4],[1,3]]` | `1` | Remove `[1,3]` to make the rest non-overlapping. |
| `[[1,2],[1,2],[1,2]]` | `2` | Keep only one interval; remove the other two. |
| `[[1,2],[2,3]]` | `0` | Intervals already non-overlapping; no removal needed. |

---

## 3. Approach: Greedy — Sort by End — O(n log n) ✅

```text
FUNCTION eraseOverlapIntervals(intervals):
    // Sort intervals by their ending coordinate
    SORT intervals BY end ASCENDING
    SET count ← 0
    SET prevEnd ← -infinity

    FOR EACH [start, end] IN intervals:
        IF start ≥ prevEnd:
            SET prevEnd ← end          // keep this interval
        ELSE:
            SET count ← count + 1      // remove overlapping interval

    RETURN count
```

The greedy choice of always keeping the interval with the earliest end maximizes the number of non‑overlapping intervals, thus minimizing removals.

---

## 4. Walkthrough

Consider the input `[[1,2],[2,3],[3,4],[1,3]]`:

1. Sort by end → `[[1,2],[1,3],[2,3],[3,4]]`.
2. Initialize `prevEnd = -∞`, `count = 0`.
3. Interval `[1,2]`: `1 ≥ -∞` → keep, `prevEnd = 2`.
4. Interval `[1,3]`: `1 < 2` → overlap, `count = 1` (remove).
5. Interval `[2,3]`: `2 ≥ 2` → keep, `prevEnd = 3`.
6. Interval `[3,4]`: `3 ≥ 3` → keep, `prevEnd = 4`.
7. End of list → `count = 1` intervals removed.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n log n) – sorting dominates | O(1) – in‑place processing |

---

## 6. Follow‑Up Questions

* How would you modify the algorithm to return the actual set of intervals to keep?
* Can this be solved in O(n) time if the intervals are already sorted?
* How would you handle intervals with open vs. closed endpoints?

---

## Key Takeaway

> By sorting intervals by their end points and greedily selecting non‑overlapping ones, you minimize removals—mirroring the classic activity‑selection problem.
