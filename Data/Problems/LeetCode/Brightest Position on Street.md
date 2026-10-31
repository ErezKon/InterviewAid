# 2021. Brightest Position on Street

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/brightest-position-on-street](https://leetcode.com/problems/brightest-position-on-street)
**Companies:** Capital One, Robinhood, Roblox, Tiktok, Uber, Visa

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

A perfectly straight street is represented by a number line. The street has street lamp(s) on it and is represented by a 2D integer array `lights`. Each `lights[i] = [position_i, range_i]` indicates that there is a street lamp at position `position_i` that lights up the area from `[position_i - range_i, position_i + range_i]` (**inclusive**).

The **brightness** of a position `p` is defined as the number of street lamp that light up the position `p`.

Given `lights`, return *the **brightest** position on the** street. If there are multiple brightest positions, return the **smallest** one.*

**Constraints:**
- `1 <= lights.length <= 10^5`
- `lights[i].length == 2`
- `-10^8 <= position_i <= 10^8`
- `0 <= range_i <= 10^8`

## Examples

**Example 1:**
```
Input: lights = [[-3,2],[1,2],[3,3]]
Output: -1
Explanation: The first street lamp lights up the area from [(-3) - 2, (-3) + 2] = [-5, -1].
The second street lamp lights up the area from [1 - 2, 1 + 2] = [-1, 3].
The third street lamp lights up the area from [3 - 3, 3 + 3] = [0, 6].
Position -1 has a brightness of 2, illuminated by the first and second street light.
Positions 0, 1, 2, and 3 have a brightness of 2, illuminated by the second and third street light.
Out of all these positions, -1 is the smallest, so return it.
```

**Example 2:**
```
Input: lights = [[1,0],[0,1]]
Output: 1
Explanation: The first street lamp lights up the area from [1 - 0, 1 + 0] = [1, 1].
The second street lamp lights up the area from [0 - 1, 0 + 1] = [-1, 1].
Position 1 has a brightness of 2, illuminated by the first and second street light.
Return 1 because it is the brightest position on the street.
```

**Example 3:**
```
Input: lights = [[1,2]]
Output: -1
Explanation: The first street lamp lights up the area from [1 - 2, 1 + 2] = [-1, 3].
Positions -1, 0, 1, 2, and 3 have a brightness of 1, illuminated by the first street light.
Out of all these positions, -1 is the smallest, so return it.
```

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
- **Time:** O(n log n) for sorting `2n` events, where `n` is the number of lights.
- **Space:** O(n) to store the events.

## Follow-Up Questions
1. How would you modify the algorithm to return all positions with maximum brightness?
2. Can the sweep be performed in O(n) time if the coordinate range is bounded?
3. How would you handle floating-point positions or non-integer ranges?

## Key Takeaway
A line-sweep with start/end events converts overlapping interval counting into a simple linear scan after sorting, yielding an optimal O(n log n) solution.
