# 3047. Find the Largest Area of Square Inside Two Rectangles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-largest-area-of-square-inside-two-rectangles](https://leetcode.com/problems/find-the-largest-area-of-square-inside-two-rectangles)
**Companies:** Bloomberg, Cisco, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Pairwise Intersection — O(n²) ✅](#4-approach-pairwise-intersection--on²-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `n` axis-aligned rectangles defined by `bottomLeft[i]` and `topRight[i]`, find the largest square that fits inside the intersection of any two rectangles. Return its area, or 0 if no valid intersection exists.

**Constraints:**
- `1 <= n <= 1000`
- Coordinates up to 10⁸.

---

## 2. Examples

```
Example 1:
  Input:  bottomLeft = [[1,1],[2,2]], topRight = [[3,3],[4,4]]
  Output: 1
  Reason: Intersection is [2,2] to [3,3] → min side = 1 → area = 1.
```

---

## 3. Key Insight

> The intersection of two axis-aligned rectangles is also a rectangle (or empty). Compute it with `max(x1)`, `max(y1)`, `min(x2)`, `min(y2)`. The largest inscribed square has side = min(width, height) of the intersection.

---

## 4. Approach: Pairwise Intersection — O(n²) ✅

```
FUNCTION largestSquareArea(bottomLeft, topRight):
    maxSide = 0
    FOR i ← 0 TO n - 1:
        FOR j ← i + 1 TO n - 1:
            // Intersection rectangle
            x1 = MAX(bottomLeft[i][0], bottomLeft[j][0])
            y1 = MAX(bottomLeft[i][1], bottomLeft[j][1])
            x2 = MIN(topRight[i][0], topRight[j][0])
            y2 = MIN(topRight[i][1], topRight[j][1])
            IF x1 < x2 AND y1 < y2:
                side = MIN(x2 - x1, y2 - y1)
                maxSide = MAX(maxSide, side)
    RETURN maxSide * maxSide
```

---

## 5. Walkthrough

```
bottomLeft = [[1,1],[2,2]], topRight = [[3,3],[4,4]]

Pair (0,1):
  x1 = max(1,2) = 2, y1 = max(1,2) = 2
  x2 = min(3,4) = 3, y2 = min(3,4) = 3
  Valid intersection: width=1, height=1
  side = min(1,1) = 1, maxSide = 1

Area = 1² = 1 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) — all pairs |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Rectangle intersection** is computed with `max` of bottoms and `min` of tops. The inscribed square side is `min(width, height)`. With n ≤ 1000, O(n²) brute force is efficient enough.
