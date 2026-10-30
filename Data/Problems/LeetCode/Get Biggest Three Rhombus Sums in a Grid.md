# 1878. Get Biggest Three Rhombus Sums in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/get-biggest-three-rhombus-sums-in-a-grid](https://leetcode.com/problems/get-biggest-three-rhombus-sums-in-a-grid)
**Companies:** Amazon, Google, Quora, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Enumerate All Rhombi — O(m · n · min(m,n)) ✅](#2-approach-enumerate-all-rhombi)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

You are given an `m x n` integer matrix `grid`.

A **rhombus sum** is the sum of the elements that form **the border** of a regular rhombus shape in `grid`. The rhombus must have the shape of a square rotated 45 degrees with each of the corners centered in a grid cell. (The official statement includes an image of four valid rhombus shapes with the corresponding colored cells that should be included in each **rhombus sum**.)

Note that the rhombus can have an area of 0, which is depicted by the purple rhombus in the bottom right corner.

Return *the biggest three **distinct rhombus sums** in the* `grid` *in **descending order**. If there are less than three distinct values, return all of them*.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `1 <= grid[i][j] <= 10^5`

## 2. Approach: Enumerate All Rhombi — O(m · n · min(m,n)) ✅

```text
FUNCTION getBiggestThree(grid):
    sums = set()
    m ← NUMBER OF ROWS IN grid
    n ← NUMBER OF COLUMNS IN grid

    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            // size 0 rhombus (single cell)
            sums.ADD(grid[r][c])
            FOR size ← 1 TO MIN(r, m-1-r, c, n-1-c):
                // sum the four edges of the rhombus
                rhombusSum ← 0
                // top‑right edge
                i ← r - size; j ← c
                WHILE i < r:
                    rhombusSum += grid[i][j]
                    i += 1; j += 1
                // bottom‑right edge
                i ← r; j ← c + size
                WHILE i < r + size:
                    rhombusSum += grid[i][j]
                    i += 1; j -= 1
                // bottom‑left edge
                i ← r + size; j ← c
                WHILE i > r:
                    rhombusSum += grid[i][j]
                    i -= 1; j -= 1
                // top‑left edge
                i ← r; j ← c - size
                WHILE i > r - size:
                    rhombusSum += grid[i][j]
                    i -= 1; j += 1
                sums.ADD(rhombusSum)

    top3 ← sorted(sums, reverse=True)[:3]
    RETURN top3
```

## 3. Examples

```
Example 1:
  Input: grid = [[3,4,5,1,3],[3,3,4,2,3],[20,30,200,40,10],[1,5,5,4,1],[4,3,2,2,5]]
  Output: [228,216,211]
  Explanation: The rhombus shapes for the three biggest distinct rhombus sums are:
  - Blue: 20 + 3 + 200 + 5 = 228
  - Red: 200 + 2 + 10 + 4 = 216
  - Green: 5 + 200 + 4 + 2 = 211
```
```
Example 2:
  Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
  Output: [20,9,8]
  Explanation: The rhombus shapes for the three biggest distinct rhombus sums are:
  - Blue: 4 + 2 + 6 + 8 = 20
  - Red: 9 (area 0 rhombus in the bottom right corner)
  - Green: 8 (area 0 rhombus in the bottom middle)
```
```
Example 3:
  Input: grid = [[7,7,7]]
  Output: [7]
  Explanation: All three possible rhombus sums are the same, so return [7].
```

## 4. Walkthrough

Consider the first example grid. The algorithm iterates over every cell as a potential center. For center `(1,1)` with size `1`, the border consists of cells `(0,1)`, `(1,2)`, `(2,1)`, `(1,0)` whose sum is `4+8+6+1 = 19`. Adding the size‑0 rhombus at each cell yields many sums; the three largest distinct sums are `20`, `18`, and `9`.

## 5. Complexity Analysis

- **Time:** O(m · n · min(m,n)) – each cell is a center and we expand up to the smallest distance to a border.
- **Space:** O(k)` where `k` is the number of distinct sums (at most `m·n·min(m,n)`), stored in a set.

## 6. Key Takeaway

> Enumerate all possible rhombus centers and sizes, sum the four diagonal edges, and keep the three largest distinct sums. Prefix sums on diagonals can reduce the per‑rhombus cost to O(1).
