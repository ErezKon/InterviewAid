# 452. Minimum Number of Arrows to Burst Balloons

**Difficulty:** 🟡 Medium
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Livspace, Microsoft, Tiktok, Zoho

---

## 1. Problem Description

There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array `points` where `points[i] = [x_start, x_end]` denotes a balloon whose **horizontal diameter** stretches between `x_start` and `x_end`. You do not know the exact y-coordinates of the balloons.

Arrows can be shot up **directly vertically** (in the positive y-direction) from different points along the x-axis. A balloon with `x_start` and `x_end` is **burst** by an arrow shot at `x` if `x_start <= x <= x_end`. There is **no limit** to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

Given the array `points`, return *the **minimum** number of arrows that must be shot to burst all balloons*.

**Constraints:**
- `1 <= points.length <= 10^5`
- `points[i].length == 2`
- `-2^31 <= x_start < x_end <= 2^31 - 1`

---

## 2. Approach: Greedy — Sort by End — O(n log n) ✅

```
FUNCTION findMinArrowShots(points):
    SORT points by end coordinate
    arrows = 1
    arrowPos = points[0].end

    FOR i ← 1 TO n - 1:
        IF points[i].start > arrowPos:
            // This balloon is not burst → need new arrow
            arrows += 1
            arrowPos = points[i].end

    RETURN arrows
```

### Why Sort by End?

Shooting at the earliest-ending balloon's right edge maximizes the chance of hitting subsequent balloons.

| Time | Space |
|------|-------|
| O(n log n) | O(1) |

---

## 3. Examples

**Example 1:**
```
Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].
- Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].
```

**Example 2:**
```
Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
Explanation: One arrow needs to be shot for each balloon for a total of 4 arrows.
```

**Example 3:**
```
Input: points = [[1,2],[2,3],[3,4],[4,5]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].
- Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].
```

## 4. Walkthrough

Consider Example 1. After sorting by end: `[[1,6],[2,8],[7,12],[10,16]]`.
1. Start with first balloon `[1,6]`, place arrow at `6` (arrows=1).
2. Next balloon `[2,8]` starts at `2 ≤ 6`, already burst.
3. Balloon `[7,12]` starts at `7 > 6`, need new arrow at `12` (arrows=2).
4. Balloon `[10,16]` starts at `10 ≤ 12`, already burst.
Result: 2 arrows.

## 5. Complexity Analysis

- **Time:** O(n log n) for sorting the intervals.
- **Space:** O(1) extra space (ignoring input storage).

## 6. Follow-Up Questions

- How would the solution change if arrows could be shot at any real coordinate (not just integer)?
- Can you extend the approach to 2D balloons represented by circles?
- What if each arrow has a limited range?

## Key Takeaway

> Same pattern as Non-overlapping Intervals (#435). Sort by end, greedily keep the current arrow position, add a new arrow only when a balloon isn't reachable.
