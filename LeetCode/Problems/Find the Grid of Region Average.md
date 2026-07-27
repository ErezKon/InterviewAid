# 3030. Find the Grid of Region Average

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-grid-of-region-average](https://leetcode.com/problems/find-the-grid-of-region-average)
**Companies:** Apple, Jio

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: 2D Prefix Sum + Region Scan — O(m·n) ✅](#3-approach-2d-prefix-sum--region-scan--omn-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an `m x n` grid of integers and a threshold, for each cell compute the average of the 3×3 region centered on it (if the region is "smooth" — all pairwise adjacent differences ≤ threshold). Cells belonging to no smooth region keep their original value. Cells in one or more smooth regions get the average of their region.

**Constraints:**
- `3 <= m, n <= 100`
- `0 <= image[i][j] <= 255`

---

## 2. Key Insight

> For each valid 3×3 sub-grid, check if all adjacent differences are within the threshold. If so, mark all cells in that region and compute their average. Use a result grid that accumulates averages and counts per cell.

---

## 3. Approach: 2D Prefix Sum + Region Scan — O(m·n) ✅

```
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

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n) — constant work per 3×3 region |
| **Space** | O(m · n) — sum and count grids |

---

## 5. Key Takeaway

> **Enumerate all 3×3 regions, validate smoothness, accumulate averages per cell.** The fixed region size makes this a straightforward grid simulation with constant overhead per cell.
