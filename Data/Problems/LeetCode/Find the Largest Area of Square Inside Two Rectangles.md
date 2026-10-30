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

There exist `n` rectangles in a 2D plane with edges parallel to the x and y axis. You are given two 2D integer arrays `bottomLeft` and `topRight` where `bottomLeft[i] = [a_i, b_i]` and `topRight[i] = [c_i, d_i]` represent the **bottom-left** and **top-right** coordinates of the `i`-th rectangle, respectively.

You need to find the **maximum** area of a **square** that can fit inside the intersecting region of at least two rectangles. Return `0` if such a square does not exist.

**Constraints:**
- `n == bottomLeft.length == topRight.length`
- `2 <= n <= 10³`
- `bottomLeft[i].length == topRight[i].length == 2`
- `1 <= bottomLeft[i][0], bottomLeft[i][1] <= 10⁷`
- `1 <= topRight[i][0], topRight[i][1] <= 10⁷`
- `bottomLeft[i][0] < topRight[i][0]`
- `bottomLeft[i][1] < topRight[i][1]`

---

## 2. Examples

```
Example 1:
  Input: bottomLeft = [[1,1],[2,2],[3,1]], topRight = [[3,3],[4,4],[6,6]]
  Output: 1
  Explanation: A square with side length 1 can fit inside either the intersecting region of
  rectangles 0 and 1 or the intersecting region of rectangles 1 and 2. Hence the maximum area is 1.
  It can be shown that a square with a greater side length can not fit inside any intersecting
  region of two rectangles.

Example 2:
  Input: bottomLeft = [[1,1],[1,3],[1,5]], topRight = [[5,5],[5,7],[5,9]]
  Output: 4
  Explanation: A square with side length 2 can fit inside either the intersecting region of
  rectangles 0 and 1 or the intersecting region of rectangles 1 and 2. Hence the maximum area is
  2 * 2 = 4. It can be shown that a square with a greater side length can not fit inside any
  intersecting region of two rectangles.

Example 3:
  Input: bottomLeft = [[1,1],[2,2],[1,2]], topRight = [[3,3],[4,4],[3,4]]
  Output: 1
  Explanation: A square with side length 1 can fit inside the intersecting region of any two
  rectangles. Also, no larger square can, so the maximum area is 1. Note that the region can be
  formed by the intersection of more than 2 rectangles.

Example 4:
  Input: bottomLeft = [[1,1],[3,3],[3,1]], topRight = [[2,2],[4,4],[4,2]]
  Output: 0
  Explanation: No pair of rectangles intersect, hence, the answer is 0.
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
