# 959. Regions Cut By Slashes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/regions-cut-by-slashes](https://leetcode.com/problems/regions-cut-by-slashes)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok, Uber

---

## Approach: Upscale 3x + Flood Fill — O(n²) ✅

```
FUNCTION regionsBySlashes(grid):
    n = len(grid)
    // Upscale each cell to 3×3
    expanded = 3n × 3n grid of 0s

    FOR r, c in grid:
        IF grid[r][c] == '/':
            expanded[3r][3c+2] = 1
            expanded[3r+1][3c+1] = 1
            expanded[3r+2][3c] = 1
        ELSE IF grid[r][c] == '\':
            expanded[3r][3c] = 1
            expanded[3r+1][3c+1] = 1
            expanded[3r+2][3c+2] = 1

    // Count connected components of 0s
    regions = 0
    FOR r, c in expanded:
        IF expanded[r][c] == 0:
            BFS/DFS flood fill
            regions += 1

    RETURN regions
```

Alternative: Union-Find on triangles (split each cell into 4 triangles).
