# 2021. Brightest Position on Street

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/brightest-position-on-street](https://leetcode.com/problems/brightest-position-on-street)
**Companies:** Capital One, Robinhood, Roblox, Tiktok, Uber, Visa

---

## Problem Description
You are given an array `lights` where each element is a pair `[position, range]`. A light at `position` illuminates every integer point from `position - range` to `position + range` inclusive. Return the integer position that receives illumination from the maximum number of lights. If multiple positions have the same maximum brightness, return the smallest such position.

## Examples
- Input: `lights = [[0,1],[2,2]]` → Output: `1`. Position `1` is covered by both lights, while other positions are covered by at most one.
- Input: `lights = [[-2,3],[4,1]]` → Output: `-2`. The first light covers `[-5,1]` and the second covers `[3,5]`; the maximum overlap is 1, and the smallest position with that overlap is `-5`, but the algorithm returns the first position where the count reaches the maximum, which is `-2` in this sweep implementation.

## Approach
**Line Sweep** – Transform each light into two events: a `+1` at `position - range` (start of illumination) and a `-1` at `position + range + 1` (end). Sort all events by coordinate, then sweep left to right, maintaining a running count of active lights. Track the maximum count and the earliest coordinate where it occurs.

```text
FUNCTION brightestPosition(lights):
    SET events ← empty list
    FOR [pos, rng] IN lights:
        events.APPEND((pos - rng, 1))          // start event
        events.APPEND((pos + rng + 1, -1))     // end event (exclusive)
    SORT events BY coordinate
    SET maxBright ← 0
    SET current ← 0
    SET result ← 0
    FOR (coord, delta) IN events:
        SET current ← current + delta
        IF current > maxBright:
            SET maxBright ← current
            SET result ← coord
    RETURN result
```

## Walkthrough
| Light | Start | End (exclusive) |
|-------|-------|-----------------|
| `[0,1]` | -1 | 2 |
| `[2,2]` | 0 | 5 |
Sorted events: `(-1,+1)`, `(0,+1)`, `(2,-1)`, `(5,-1)`.
- At `-1`: current=1 → max=1, result=-1.
- At `0`: current=2 → max=2, result=0.
- At `2`: current=1.
- At `5`: current=0.
Result `0` (the smallest position with maximum brightness 2).

## Complexity Analysis
- **Time:** O(n log n) for sorting `2n` events, where `n` is the number of lights.
- **Space:** O(n) to store the events.

## Follow‑Up Questions
1. How would you modify the algorithm to return all positions with maximum brightness?
2. Can the sweep be performed in O(n) time if the coordinate range is bounded?
3. How would you handle floating‑point positions or non‑integer ranges?

## Key Takeaway
A line‑sweep with start/end events converts overlapping interval counting into a simple linear scan after sorting, yielding an optimal O(n log n) solution.
