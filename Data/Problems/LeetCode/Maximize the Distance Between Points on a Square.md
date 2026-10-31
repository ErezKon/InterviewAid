# 3464. Maximize the Distance Between Points on a Square

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-the-distance-between-points-on-a-square](https://leetcode.com/problems/maximize-the-distance-between-points-on-a-square)
**Companies:** Bloomberg, Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Binary Search on Distance — O(n log n · log D)](#approach-binary-search-on-distance--on-log-n--log-d-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer `side`, representing the edge length of a square with corners at `(0, 0)`, `(0, side)`, `(side, 0)`, and `(side, side)` on a Cartesian plane.

You are also given a **positive** integer `k` and a 2D integer array `points`, where `points[i] = [x_i, y_i]` represents the coordinate of a point lying on the **boundary** of the square.

You need to select `k` elements among `points` such that the **minimum** Manhattan distance between any two points is **maximized**.

Return the **maximum** possible **minimum** Manhattan distance between the selected `k` points.

The Manhattan Distance between two cells `(x_i, y_i)` and `(x_j, y_j)` is `|x_i - x_j| + |y_i - y_j|`.

**Constraints:**
- `1 <= side <= 10^9`
- `4 <= points.length <= min(4 * side, 15 * 10^3)`
- `points[i] == [x_i, y_i]`
- The input is generated such that:
- `points[i]` lies on the boundary of the square.
- All `points[i]` are **unique**.
- `4 <= k <= min(25, points.length)`

---

## Key Insight

> Map all points to their **perimeter position** (distance along the perimeter from a fixed corner). This linearizes the problem to placing `k` points on a circular track. Binary search on the minimum gap, then greedily verify if `k` points can be placed with at least that gap.

---

## Approach: Binary Search on Distance — O(n log n · log D) ✅

```
FUNCTION maxDistance(points, k, sideLength):
    perimeterLen = 4 * sideLength
    positions = SORT([toPerimeterPos(p) for p in points])

    FUNCTION canPlace(minGap):
        count = 1; last = positions[0]
        FOR i ← 1 TO n - 1:
            IF positions[i] - last >= minGap:
                count += 1; last = positions[i]
        RETURN count >= k

    lo, hi = 0, perimeterLen
    WHILE lo < hi:
        mid = (lo + hi + 1) / 2
        IF canPlace(mid): lo = mid
        ELSE: hi = mid - 1
    RETURN lo
```

---

## Examples

**Example 1:**
```
Input: side = 2, points = [[0,2],[2,0],[2,2],[0,0]], k = 4
Output: 2
Explanation: Select all four points.
```

**Example 2:**
```
Input: side = 2, points = [[0,0],[1,2],[2,0],[2,2],[2,1]], k = 4
Output: 1
Explanation: Select the points (0, 0), (2, 0), (2, 2), and (2, 1).
```

**Example 3:**
```
Input: side = 2, points = [[0,0],[0,1],[0,2],[1,2],[2,0],[2,2],[2,1]], k = 5
Output: 1
Explanation: Select the points (0, 0), (0, 1), (0, 2), (1, 2), and (2, 2).
```

---

## Walkthrough

1. **Convert to linear positions:**
   - For each point, compute its distance from the bottom-left corner moving clockwise.
   - Example 1 yields positions `[0, 2, 6, 8]` on a perimeter of `8`.
2. **Binary search:**
   - Start with `lo = 0`, `hi = 8`.
   - Mid = 4 → `canPlace(4)` succeeds (places points at 0 and 4), so `lo = 4`.
   - Mid = 6 → fails, set `hi = 5`.
   - Continue until `lo = 8` is the maximum feasible gap.
3. **Greedy check (`canPlace`):**
   - Place the first point at the smallest position.
   - Scan forward, placing a new point whenever the distance from the last placed point reaches `minGap`.
   - If we can place `k` points, the gap is feasible.
4. **Result:** The final `lo` is the largest minimum distance achievable.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search + Greedy | **O(n log n + n log D)** | O(n) |

---

## Key Takeaway

> **Linearize perimeter positions, then binary search on the minimum gap with greedy placement.** This is the "maximize minimum distance" pattern on a circular/linear track.
