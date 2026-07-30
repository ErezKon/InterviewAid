# 3111. Minimum Rectangles to Cover Points

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-rectangles-to-cover-points](https://leetcode.com/problems/minimum-rectangles-to-cover-points)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort by X + Greedy — O(n log n)](#4-approach-sort-by-x--greedy--on-log-n)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given 2D points and an integer `w`, cover all points using rectangles of width `w` (infinite height). Return the **minimum** number of rectangles needed.

**Constraints:**
- `1 <= points.length <= 10⁵`
- `0 <= x, y <= 10⁹`
- `0 <= w <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: points = [[2,1],[1,0],[1,4],[1,8],[3,5],[4,6]], w = 1
  Output: 2
  Explanation: Rectangle [1,2] covers points with x∈[1,2], rectangle [3,4] covers x∈[3,4].

Example 2:
  Input: points = [[0,0],[4,0],[8,0]], w = 1
  Output: 3
```

---

## 3. Key Insight

> Since rectangles have infinite height, only the **x-coordinates** matter. Sort points by x. Greedily place each rectangle starting at the leftmost uncovered point, covering width `w`.

---

## 4. Approach: Sort by X + Greedy — O(n log n) ✅

```
FUNCTION minRectangles(points, w):
    xs = SORT([p[0] for p in points])
    count = 0
    i = 0

    WHILE i < len(xs):
        start = xs[i]
        count += 1
        // Skip all points within [start, start + w]
        WHILE i < len(xs) AND xs[i] <= start + w:
            i += 1

    RETURN count
```

---

## 5. Walkthrough

```
points x-coords sorted: [1, 1, 1, 2, 3, 4], w = 1

i=0: start=1, cover [1,2]. Skip 1,1,1,2 → i=4. count=1
i=4: start=3, cover [3,4]. Skip 3,4 → i=6. count=2

Answer = 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting dominates |
| **Space** | O(n) for sorted x-coordinates |

---

## 7. Key Takeaway

> **Infinite height reduces 2D to 1D** — only x-coordinates matter. Then it's a classic interval covering problem: sort and greedily assign intervals.
