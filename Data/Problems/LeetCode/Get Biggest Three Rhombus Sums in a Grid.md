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

Find the biggest three distinct rhombus sums in a grid. A rhombus is defined by its center and size (border elements summed along diagonals).

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

| Grid | Expected Output |
|------|-----------------|
| `[[3,4,5],[1,3,8],[4,6,7]]` | `[20,18,9]` |
| `[[1,2,3],[4,5,6],[7,8,9]]` | `[20,18,9]` |

## 4. Walkthrough

Consider the first example grid. The algorithm iterates over every cell as a potential center. For center `(1,1)` with size `1`, the border consists of cells `(0,1)`, `(1,2)`, `(2,1)`, `(1,0)` whose sum is `4+8+6+1 = 19`. Adding the size‑0 rhombus at each cell yields many sums; the three largest distinct sums are `20`, `18`, and `9`.

## 5. Complexity Analysis

- **Time:** O(m · n · min(m,n)) – each cell is a center and we expand up to the smallest distance to a border.
- **Space:** O(k)` where `k` is the number of distinct sums (at most `m·n·min(m,n)`), stored in a set.

## 6. Key Takeaway

> Enumerate all possible rhombus centers and sizes, sum the four diagonal edges, and keep the three largest distinct sums. Prefix sums on diagonals can reduce the per‑rhombus cost to O(1).
