# 3030. Find the Grid of Region Average

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-grid-of-region-average](https://leetcode.com/problems/find-the-grid-of-region-average)
**Companies:** Apple, Jio

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: 2D Prefix Sum + Region Scan — O(m·n) ✅](#4-approach-2d-prefix-sum--region-scan--omn-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an `m x n` grid of integers and a threshold, for each cell compute the average of the 3×3 region centered on it (if the region is "smooth" — all pairwise adjacent differences ≤ threshold). Cells belonging to no smooth region keep their original value. Cells in one or more smooth regions get the average of their region.

**Constraints:**
- `3 <= m, n <= 100`
- `0 <= image[i][j] <= 255`

---

## 2. Examples

**Example 1:**
```
image = [[10,10,10],[10,10,10],[10,10,10]]
threshold = 0
```
All 3×3 regions are smooth, average is 10, so output grid is the same as input.

**Example 2:**
```
image = [[1,2,3],[4,5,6],[7,8,9]]
threshold = 1
```
Only the center region (cells 5) is smooth because adjacent differences exceed 1 elsewhere. The average of the center 3×3 block is 5, so the output grid becomes:
```
[[1,2,3],[4,5,6],[7,8,9]]
```
(unchanged for cells outside the smooth region).

---

## 3. Key Insight

> For each valid 3×3 sub-grid, check if all adjacent differences are within the threshold. If so, mark all cells in that region and compute their average. Use a result grid that accumulates averages and counts per cell.

---

## 4. Approach: 2D Prefix Sum + Region Scan — O(m·n) ✅

```text
FUNCTION resultGrid(image, threshold):
    m, n ← DIMENSIONS(image)
    result ← copy of image
    sumGrid ← m×n of 0
    countGrid ← m×n of 0

    FOR i ← 0 TO m - 3 DO
        FOR j ← 0 TO n - 3 DO
            IF isSmooth(image, i, j, threshold) THEN
                avg ← average of 3×3 block starting at (i,j)
                FOR di ← 0 TO 2 DO
                    FOR dj ← 0 TO 2 DO
                        sumGrid[i+di][j+dj] += avg
                        countGrid[i+di][j+dj] += 1

    FOR i, j in all cells:
        IF countGrid[i][j] > 0 THEN
            result[i][j] ← sumGrid[i][j] / countGrid[i][j]

    RETURN result
```

---

## 5. Walkthrough

Consider the first example where the entire grid is smooth.

| Step | Action | sumGrid (center cell) | countGrid (center cell) |
|------|--------|----------------------|--------------------------|
| 1    | Scan (0,0) region is smooth, avg=10 | +10 | +1 |
| 2    | No other regions (grid size 3) | | |
| 3    | Finalize: result[1][1] = 10/1 = 10 | | |

The algorithm correctly leaves every cell unchanged.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n) — constant work per 3×3 region |
| **Space** | O(m · n) — sum and count grids |

---

## 7. Follow-Up Questions

- How would you extend the solution to handle variable‑size regions?
- Can the algorithm be adapted to compute median instead of average for each smooth region?
- What changes are needed if the threshold varies per cell?

---

## 8. Key Takeaway

> **Enumerate all 3×3 regions, validate smoothness, accumulate averages per cell.** The fixed region size makes this a straightforward grid simulation with constant overhead per cell.
