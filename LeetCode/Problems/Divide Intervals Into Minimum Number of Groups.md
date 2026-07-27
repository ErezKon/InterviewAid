# 2406. Divide Intervals Into Minimum Number of Groups

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups](https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups)
**Companies:** Adobe, Amazon, Bloomberg, Google, Ibm, Meta, Walmart Labs

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Line Sweep](#approach-line-sweep--on-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a 2D array `intervals` where `intervals[i] = [left_i, right_i]` represents an **inclusive** interval, divide the intervals into the minimum number of groups such that no two intervals in the same group **overlap** (share at least one common point).

**Constraints:**
- `1 <= intervals.length <= 10^5`
- `intervals[i].length == 2`
- `1 <= left_i <= right_i <= 10^6`

---

## Examples

```
Input: intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]
Output: 3
Explanation:
  Group 1: [1,5], [6,8]
  Group 2: [2,3], [5,10]
  Group 3: [1,10]
No two intervals in a group share a common point.

Input: intervals = [[1,3],[5,6],[8,10],[11,13]]
Output: 1
Explanation: None overlap, all fit in one group.
```

---

## Key Insight

> The minimum number of groups equals the **maximum number of intervals overlapping at any single point**. This is the same core idea as "Meeting Rooms II" — each overlapping interval needs its own group just like each overlapping meeting needs its own room.

---

## Approach: Line Sweep — O(n log n) ✅

Create +1 events at each interval start and −1 events just after each interval end. Sort events and sweep to find peak overlap.

```
FUNCTION minGroups(intervals):
    events = []
    FOR [start, end] IN intervals:
        events.ADD((start, 1))
        events.ADD((end + 1, -1))

    SORT events
    maxOverlap = 0; current = 0
    FOR (time, delta) IN events:
        current += delta
        maxOverlap = MAX(maxOverlap, current)

    RETURN maxOverlap
```

**Why `end + 1`?** Because intervals are inclusive — `[1,5]` and `[5,10]` overlap at point 5. The −1 event must go at `end + 1` so it doesn't cancel before the overlap is counted.

---

## Walkthrough

```
intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]

Events created:
  (1,+1) (6,-1)    ← [1,5]: start at 1, end+1 at 6
  (2,+1) (4,-1)    ← [2,3]: start at 2, end+1 at 4
  (5,+1) (11,-1)   ← [5,10]
  (6,+1) (9,-1)    ← [6,8]
  (1,+1) (11,-1)   ← [1,10]

Sorted events:
  (1,+1)(1,+1)(2,+1)(4,-1)(5,+1)(6,-1)(6,+1)(9,-1)(11,-1)(11,-1)

Sweep:
  t=1: current=1, then 2  → max=2
  t=2: current=3           → max=3  ← peak overlap
  t=4: current=2
  t=5: current=3           → max=3
  t=6: current=2, then 3   → max=3
  t=9: current=2
  t=11: current=0

Answer: 3 ✅
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(n log n) | Sorting 2n events dominates |
| **Space** | O(n) | Storing 2n events |

---

## Follow-Up Questions

**Q1: How does this relate to Meeting Rooms II?**
> Identical core problem. Meeting Rooms II finds minimum conference rooms; this finds minimum groups. Both reduce to maximum overlap via line sweep or min-heap.

**Q2: Could you solve this with a min-heap instead?**
> Yes. Sort intervals by start. Use a min-heap of end times. For each interval, if `heap.min < current.start`, pop (reuse that group). Push `current.end`. Heap size = answer.

**Q3: What if intervals were open (exclusive endpoints)?**
> Change the −1 event from `end + 1` to `end`. Open intervals `[1,5)` and `[5,10)` don't overlap at 5.

---

## Key Takeaway

> **Maximum overlap at any point = minimum groups/rooms/colors needed. Line sweep with +1/−1 events is the cleanest O(n log n) way to compute this.**
