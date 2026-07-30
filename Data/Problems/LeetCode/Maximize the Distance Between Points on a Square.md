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

Given points on the perimeter of a square and an integer `k`, select `k` points to **maximize the minimum distance** between any two selected points (using perimeter distance, not Euclidean).

**Constraints:**
- Points lie on the perimeter of a square.
- Select exactly `k` points.

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
points = [(0,0), (0,2), (2,2), (2,0)]   // square side = 2
k = 2
Output: 8
Explanation: Choose opposite corners; perimeter distance = 8.
```

**Example 2:**
```
points = [(0,1), (1,2), (2,1), (1,0)]
sideLength = 2, k = 3
Output: 4
Explanation: Selecting three points equally spaced gives minimum gap 4 along the perimeter.
```

---

## Walkthrough

1. **Convert to linear positions:**
   - For each point, compute its distance from the bottom‑left corner moving clockwise.
   - Example 1 yields positions `[0, 2, 6, 8]` on a perimeter of `8`.
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
