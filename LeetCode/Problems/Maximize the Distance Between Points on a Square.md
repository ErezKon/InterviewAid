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

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search + Greedy | **O(n log n + n log D)** | O(n) |

---

## Key Takeaway

> **Linearize perimeter positions, then binary search on the minimum gap with greedy placement.** This is the "maximize minimum distance" pattern on a circular/linear track.
