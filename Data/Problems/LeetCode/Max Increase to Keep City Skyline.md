# 807. Max Increase to Keep City Skyline

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/max-increase-to-keep-city-skyline](https://leetcode.com/problems/max-increase-to-keep-city-skyline)
**Companies:** Google, Rivian

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy — O(n²)](#approach-greedy--on²-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There is a city composed of `n x n` blocks, where each block contains a single building shaped like a vertical square prism. You are given a **0-indexed** `n x n` integer matrix `grid` where `grid[r][c]` represents the **height** of the building located in the block at row `r` and column `c`.

A city's **skyline** is the outer contour formed by all the building when viewing the side of the city from a distance. The **skyline** from each cardinal direction north, east, south, and west may be different.

We are allowed to increase the height of **any number of buildings by any amount** (the amount can be different per building). The height of a `0`-height building can also be increased. However, increasing the height of a building should **not** affect the city's **skyline** from any cardinal direction.

Return *the **maximum total sum** that the height of the buildings can be increased by **without** changing the city's **skyline** from any cardinal direction*.

**Constraints:**
- `n == grid.length`
- `n == grid[r].length`
- `2 <= n <= 50`
- `0 <= grid[r][c] <= 100`

---

## Examples

**Example 1:**
```
Input: grid = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]
Output: 35
Explanation: The building heights are shown in the center of the above image.
The skylines when viewed from each cardinal direction are drawn in red.
The grid after increasing the height of buildings without affecting skylines is:
gridNew = [ [8, 4, 8, 7],
            [7, 4, 7, 7],
            [9, 4, 8, 7],
            [3, 3, 3, 3] ]
```

**Example 2:**
```
Input: grid = [[0,0,0],[0,0,0],[0,0,0]]
Output: 0
Explanation: Increasing the height of any building will result in the skyline changing.
```

---

## Key Insight

> Each building at `(r, c)` can grow up to `min(rowMax[r], colMax[c])` without changing any skyline. The row skyline caps the height from the side; the column skyline caps it from the front. Taking the minimum of both ensures neither is violated.

```
        col max
           ↓
row max → MIN ← maximum safe height for (r, c)
```

---

## Approach: Greedy — O(n²) ✅

```
FUNCTION maxIncreaseKeepingSkyline(grid):
    rowMax = [MAX(row) for row in grid]
    colMax = [MAX(grid[r][c] for r in range(n)) for c in range(n)]
    RETURN SUM(MIN(rowMax[r], colMax[c]) - grid[r][c] for r, c)
```

---

## Walkthrough

```
grid = [[3,0,8,4],
        [2,4,5,7],
        [9,2,6,3],
        [0,3,1,0]]

rowMax = [8, 7, 9, 3]
colMax = [9, 4, 8, 7]
```

For cell `(0,0)`: `min(8, 9) - 3 = 8 - 3 = 5`
For cell `(0,1)`: `min(8, 4) - 0 = 4 - 0 = 4`
For cell `(0,2)`: `min(8, 8) - 8 = 8 - 8 = 0`
For cell `(0,3)`: `min(8, 7) - 4 = 7 - 4 = 3`
... (continue for all 16 cells)

**Total increase:** 35 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(n²)** | O(n) |

We precompute row/col maxes in O(n²), then iterate all cells in O(n²). Extra space is O(n) for the two max arrays.

---

## Follow-Up Questions

**Q1: Why is `min(rowMax, colMax)` correct and not `max`?**
Using `max` would exceed one of the skyline constraints. The building must satisfy *both* constraints simultaneously, so the tighter (smaller) bound wins.

**Q2: What if the grid is not square?**
The same logic applies — just compute row maxes over columns and column maxes over rows independently.

**Q3: What if some buildings cannot be increased (e.g., historic landmarks)?**
Mark them as fixed; for all other cells the formula still applies. The skyline might already be determined by fixed buildings.

---

## Key Takeaway

> **Each cell's maximum allowed height is `min(rowMax, colMax)` — the tighter of two independent skyline constraints.** This is a clean greedy problem requiring no sorting or complex data structures.
