# 807. Max Increase to Keep City Skyline

**Difficulty:** 🟡 Medium
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

Given an `n × n` grid where `grid[r][c]` represents the height of a building at row `r`, column `c`, increase building heights as much as possible such that the **skyline** viewed from any direction (top, bottom, left, right) remains unchanged. Return the total sum of height increases.

The skyline from the left/right is determined by the **row maximums**, and from the top/bottom by the **column maximums**.

**Constraints:**
- `n == grid.length == grid[i].length`
- `2 ≤ n ≤ 50`
- `0 ≤ grid[i][j] ≤ 100`

---

## Examples

**Example 1:**
```
Input:  grid = [[3,0,8,4],
                [2,4,5,7],
                [9,2,6,3],
                [0,3,1,0]]

Row maxes: [8, 7, 9, 3]
Col maxes: [9, 4, 8, 7]

New grid:  [[8,4,8,4],
            [7,4,7,7],
            [9,4,8,7],
            [3,3,3,3]]

Output: 35  (sum of all individual increases)
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
