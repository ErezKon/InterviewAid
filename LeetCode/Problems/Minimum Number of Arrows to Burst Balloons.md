# 452. Minimum Number of Arrows to Burst Balloons

**Difficulty:** 🟡 Medium
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Livspace, Microsoft, Tiktok, Zoho

---

## 1. Problem Description

Given balloons as intervals `[xstart, xend]`, find the minimum number of arrows to burst all balloons. An arrow at `x` bursts all balloons where `xstart ≤ x ≤ xend`.

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
Explanation: Shoot one arrow at x = 6 to burst [1,6],[2,8]; another at x = 12 to burst [7,12],[10,16].
```
**Example 2:**
```
Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
Explanation: No balloons overlap, so each needs its own arrow.
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
