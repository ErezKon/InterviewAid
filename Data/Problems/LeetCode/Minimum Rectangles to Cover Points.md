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

You are given a 2D integer array `points`, where `points[i] = [x_i, y_i]`. You are also given an integer `w`. Your task is to **cover** **all** the given points with rectangles.

Each rectangle has its lower end at some point `(x_1, 0)` and its upper end at some point `(x_2, y_2)`, where `x_1 <= x_2`, `y_2 >= 0`, and the condition `x_2 - x_1 <= w` **must** be satisfied for each rectangle.

A point is considered covered by a rectangle if it lies within or on the boundary of the rectangle.

Return an integer denoting the **minimum** number of rectangles needed so that each point is covered by **at least one** rectangle*.*

**Note:** A point may be covered by more than one rectangle.

**Constraints:**
- `1 <= points.length <= 10^5`
- `points[i].length == 2`
- `0 <= x_i == points[i][0] <= 10^9`
- `0 <= y_i == points[i][1] <= 10^9`
- `0 <= w <= 10^9`
- All pairs `(x_i, y_i)` are distinct.

---

## 2. Examples

**Example 1:**
```
Input: points = [[2,1],[1,0],[1,4],[1,8],[3,5],[4,6]], w = 1
Output: 2
Explanation: The image above shows one possible placement of rectangles to cover the points:
- A rectangle with a lower end at (1, 0) and its upper end at (2, 8)
- A rectangle with a lower end at (3, 0) and its upper end at (4, 8)
```

**Example 2:**
```
Input: points = [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]], w = 2
Output: 3
Explanation: The image above shows one possible placement of rectangles to cover the points:
- A rectangle with a lower end at (0, 0) and its upper end at (2, 2)
- A rectangle with a lower end at (3, 0) and its upper end at (5, 5)
- A rectangle with a lower end at (6, 0) and its upper end at (6, 6)
```

**Example 3:**
```
Input: points = [[2,3],[1,2]], w = 0
Output: 2
Explanation: The image above shows one possible placement of rectangles to cover the points:
- A rectangle with a lower end at (1, 0) and its upper end at (1, 2)
- A rectangle with a lower end at (2, 0) and its upper end at (2, 3)
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
