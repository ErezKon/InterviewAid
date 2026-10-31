# 892. Surface Area of 3D Shapes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/surface-area-of-3d-shapes](https://leetcode.com/problems/surface-area-of-3d-shapes)
**Companies:** Amazon

---

## Problem Description

You are given an `n x n` `grid` where you have placed some `1 x 1 x 1` cubes. Each value `v = grid[i][j]` represents a tower of `v` cubes placed on top of cell `(i, j)`.

After placing these cubes, you have decided to glue any directly adjacent cubes to each other, forming several irregular 3D shapes.

Return *the total surface area of the resulting shapes*.

**Note:** The bottom face of each shape counts toward its surface area.

**Constraints:**
- `n == grid.length == grid[i].length`
- `1 <= n <= 50`
- `0 <= grid[i][j] <= 50`

## Examples

**Example 1:**
```
Input: grid = [[1,2],[3,4]]
Output: 34
```

**Example 2:**
```
Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
Output: 32
```

**Example 3:**
```
Input: grid = [[2,2,2],[2,1,2],[2,2,2]]
Output: 46
```

## Approach
Iterate over each cell, adding the contribution of its four sides. For each side, the exposed area equals `max(0, height - neighborHeight)`. Add top and bottom faces for every non-zero cell.

```text
FUNCTION surfaceArea(grid):
    SET rows ← number of rows in grid
    SET cols ← number of columns in grid[0]
    SET total ← 0
    FOR i ← 0 TO rows-1:
        FOR j ← 0 TO cols-1:
            SET h ← grid[i][j]
            IF h = 0: CONTINUE
            // top and bottom
            SET total ← total + 2
            // north
            SET north ← IF i = 0 THEN 0 ELSE grid[i-1][j]
            SET total ← total + MAX(0, h - north)
            // south
            SET south ← IF i = rows-1 THEN 0 ELSE grid[i+1][j]
            SET total ← total + MAX(0, h - south)
            // west
            SET west ← IF j = 0 THEN 0 ELSE grid[i][j-1]
            SET total ← total + MAX(0, h - west)
            // east
            SET east ← IF j = cols-1 THEN 0 ELSE grid[i][j+1]
            SET total ← total + MAX(0, h - east)
    RETURN total
```

## Walkthrough
| Step | i | j | h | north | south | west | east | added area |
|------|---|---|---|-------|-------|------|------|------------|
| 1 | 0 | 0 | 1 | 0 | 2 | 0 | 2 | 2 (top/bottom) + 1 + 0 + 1 + 0 = 4 |
| 2 | 0 | 1 | 2 | 0 | 4 | 1 | 0 | 2 + 2 + 0 + 1 + 2 = 7 |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

Summing all rows yields 34.

## Complexity Analysis
- **Time:** O(m·n) – each cell visited once.
- **Space:** O(1) – only a few scalar variables.

## Follow-Up Questions
1. How would you modify the algorithm for a non-rectangular grid (irregular shape)?
2. Can you compute the surface area while streaming the grid rows without storing the entire matrix?
3. How does the solution change if diagonal adjacency also hides faces?

## Key Takeaway
The surface area can be obtained by summing the exposed side differences between each cell and its neighbors, plus top and bottom faces for every stack.
