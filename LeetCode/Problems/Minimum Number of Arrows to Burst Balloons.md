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

## Key Takeaway

> Same pattern as Non-overlapping Intervals (#435). Sort by end, greedily keep the current arrow position, add a new arrow only when a balloon isn't reachable.
