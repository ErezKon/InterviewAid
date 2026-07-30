# 959. Regions Cut By Slashes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/regions-cut-by-slashes](https://leetcode.com/problems/regions-cut-by-slashes)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok, Uber

---

## Problem Description
Given an `n x n` grid where each cell contains either `'/'`, `'\\'`, or a blank space, the slashes divide the cell into regions. Treat the entire grid as a continuous canvas and determine the total number of distinct regions formed after drawing all slashes.

Constraints:
- `1 <= n <= 30`
- `grid[i][j]` is `'/'`, `'\\'`, or `' '`.

## Examples
**Example 1**
```
Input: [" /","/ "]
Output: 2
Explanation: The two slashes create two separate regions.
```

**Example 2**
```
Input: ["\\/","/\\"]
Output: 4
Explanation: The intersecting slashes partition the grid into four regions.
```

## Approach
We upscale each cell to a `3 x 3` finer grid, marking the positions of slashes as walls. After expansion, the problem reduces to counting connected components of empty cells using flood‑fill (DFS/BFS) or Union‑Find.

```text
FUNCTION regionsBySlashes(grid):
    n ← LENGTH(grid)
    expanded ← 3n × 3n matrix filled with 0
    FOR r FROM 0 TO n-1:
        FOR c FROM 0 TO n-1:
            IF grid[r][c] == '/':
                expanded[3r][3c+2] ← 1
                expanded[3r+1][3c+1] ← 1
                expanded[3r+2][3c] ← 1
            ELSE IF grid[r][c] == '\\':
                expanded[3r][3c] ← 1
                expanded[3r+1][3c+1] ← 1
                expanded[3r+2][3c+2] ← 1
    regions ← 0
    FOR i FROM 0 TO 3n-1:
        FOR j FROM 0 TO 3n-1:
            IF expanded[i][j] == 0:
                CALL floodFill(expanded, i, j)
                regions ← regions + 1
    RETURN regions

FUNCTION floodFill(matrix, x, y):
    QUEUE ← [(x, y)]
    WHILE QUEUE NOT EMPTY:
        (r, c) ← POP(QUEUE)
        IF r < 0 OR r >= 3n OR c < 0 OR c >= 3n OR matrix[r][c] != 0:
            CONTINUE
        matrix[r][c] ← 1  // mark visited
        PUSH neighbours (r+1,c), (r-1,c), (r,c+1), (r,c-1) TO QUEUE
```

## Walkthrough
Consider `grid = [" /","/ "]` (n = 2).
| Step | Expanded 6×6 view (0 = empty, 1 = wall) |
|------|------------------------------------------|
| After upscaling | `[[0,0,1,0,0,0], …]` (walls form two diagonal lines) |
| Flood fill starts at first 0 → marks its region |
| Subsequent unvisited 0 starts second flood fill → second region |
| No more 0 cells → total regions = 2 |

## Complexity Analysis
- Upscaling: O(n²) time, O((3n)²) = O(n²) extra space.
- Flood fill: visits each expanded cell once → O(n²) time.
Overall: **Time O(n²), Space O(n²)**.

## Follow‑Up Questions
1. How would the solution change if diagonal connections between cells were considered part of the same region?
2. Can the problem be solved using Union‑Find without explicit upscaling?
3. How does the approach adapt when the grid size grows to 1000×1000 (memory considerations)?

## Key Takeaway
Upscaling the grid transforms slash boundaries into simple walls, allowing region counting via standard flood‑fill on a regular grid.
