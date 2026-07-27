# 1266. Minimum Time Visiting All Points

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-time-visiting-all-points](https://leetcode.com/problems/minimum-time-visiting-all-points)
**Companies:** Amazon, Bloomberg, Google, Medianet, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Chebyshev Distance — O(n)](#4-approach-chebyshev-distance--on)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Visit all points in order. Each second, move 1 step in any of 8 directions. Return **minimum** seconds.

**Constraints:**
- `1 <= points.length <= 100`

---

## 2. Examples

```
Example 1:
  Input: points = [[1,1],[3,4],[-1,0]]
  Output: 7
  Explanation: [1,1]→[3,4]: max(2,3)=3. [3,4]→[-1,0]: max(4,4)=4. Total=7.
```

---

## 3. Key Insight

> With diagonal movement allowed, the time between two points = **Chebyshev distance** = `max(|dx|, |dy|)`. Move diagonally to cover both axes, then straight for the remainder.

---

## 4. Approach: Chebyshev Distance — O(n) ✅

```
FUNCTION minTimeToVisitAllPoints(points):
    total = 0
    FOR i ← 1 TO n - 1:
        dx = ABS(points[i][0] - points[i-1][0])
        dy = ABS(points[i][1] - points[i-1][1])
        total += MAX(dx, dy)    // Chebyshev distance
    RETURN total
```

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> **Chebyshev distance for 8-directional movement** — `max(|dx|, |dy|)` is the optimal distance when diagonal moves are allowed. Sum consecutive distances for ordered traversal.
