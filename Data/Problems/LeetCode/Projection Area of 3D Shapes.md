# 883. Projection Area of 3D Shapes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/projection-area-of-3d-shapes](https://leetcode.com/problems/projection-area-of-3d-shapes)
**Companies:** Google

---

## Problem Description

You are given an `n x n` `grid` where we place some `1 x 1 x 1` cubes that are axis-aligned with the `x`, `y`, and `z` axes.

Each value `v = grid[i][j]` represents a tower of `v` cubes placed on top of the cell `(i, j)`.

We view the projection of these cubes onto the `xy`, `yz`, and `zx` planes.

A **projection** is like a shadow, that maps our **3-dimensional** figure to a **2-dimensional** plane. We are viewing the "shadow" when looking at the cubes from the top, the front, and the side.

Return *the total area of all three projections*.

**Constraints:**
- `n == grid.length == grid[i].length`
- `1 <= n <= 50`
- `0 <= grid[i][j] <= 50`

## Examples

**Example 1:**
```
Input: grid = [[1,2],[3,4]]
Output: 17
Explanation: Here are the three projections ("shadows") of the shape made with each axis-aligned plane.
```

**Example 2:**
```
Input: grid = [[2]]
Output: 5
```

**Example 3:**
```
Input: grid = [[1,0],[0,2]]
Output: 8
```

## Approach
Sum three contributions:
1. **Top view (xy‑plane)** – count cells with value > 0.
2. **Front view (yz‑plane)** – for each column, take the maximum height.
3. **Side view (xz‑plane)** – for each row, take the maximum height.

```text
FUNCTION ProjectionArea(grid):
    SET n ← LENGTH(grid)
    SET top ← 0
    SET front ← 0
    SET side ← 0
    FOR i ← 0 TO n-1:
        SET rowMax ← 0
        FOR j ← 0 TO n-1:
            IF grid[i][j] > 0:
                INCREMENT top
            SET front ← MAX(front, grid[i][j]) // column max tracked globally later
            SET rowMax ← MAX(rowMax, grid[i][j])
        END FOR
        INCREMENT side BY rowMax
    END FOR
    // Compute column maxima in a second pass
    FOR j ← 0 TO n-1:
        SET colMax ← 0
        FOR i ← 0 TO n-1:
            SET colMax ← MAX(colMax, grid[i][j])
        END FOR
        INCREMENT front BY colMax
    END FOR
    RETURN top + front + side
```

## Walkthrough
Using `grid = [[1,2],[3,4]]`:
- Top view: cells (0,0),(0,1),(1,0),(1,1) → 4 >0, but only count distinct cells → 4 → actually top = 4? Wait top counts cells >0, so top = 4.
- Row maxima: row0 max = 2, row1 max = 4 → side = 6.
- Column maxima: col0 max = 3, col1 max = 4 → front = 7.
- Total = 4 + 6 + 7 = 17 (adjusted example accordingly).

## Complexity Analysis
- Time: O(n²) – two passes over the n×n grid.
- Space: O(1) – only a few scalar variables.

## Follow-Up Questions
- How would the solution change if the grid were not square?
- How to compute the projection area when cubes can be removed (negative heights)?
- Can you extend the approach to handle very large sparse grids efficiently?

## Key Takeaway
The projection area is simply the sum of three independent views: count of occupied cells, and the maximum heights per row and per column.
