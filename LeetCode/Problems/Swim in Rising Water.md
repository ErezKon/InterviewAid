# 778. Swim in Rising Water

**Difficulty:** 🔴 Hard
**Acceptance:** 61.0%
**LeetCode:** [https://leetcode.com/problems/swim-in-rising-water](https://leetcode.com/problems/swim-in-rising-water)
**Companies:** Amazon, De Shaw, Doordash, Google, Meta, Microsoft, Uber, Weride

---

## 1. Problem Description

Given an n×n grid where `grid[i][j]` represents elevation, find the minimum time `t` such that you can swim from `(0,0)` to `(n-1,n-1)`. At time `t`, you can be at any cell with elevation ≤ t.

---

## 2. Approach: Min-Heap (Modified Dijkstra) — O(n² log n) ✅

```
FUNCTION swimInWater(grid):
    n = len(grid)
    visited = n×n boolean matrix
    heap = [(grid[0][0], 0, 0)]     // (max elevation on path, r, c)
    visited[0][0] = true

    WHILE heap:
        (maxElev, r, c) = heap.POP_MIN()

        IF r == n-1 AND c == n-1:
            RETURN maxElev

        FOR (dr, dc) IN directions:
            nr, nc = r+dr, c+dc
            IF in bounds AND NOT visited[nr][nc]:
                visited[nr][nc] = true
                newMax = MAX(maxElev, grid[nr][nc])
                heap.PUSH((newMax, nr, nc))

    RETURN -1
```

### Alternative: Binary Search + BFS

Binary search on time `t`, BFS to check if path exists with all elevations ≤ t.

| Approach | Time | Space |
|----------|------|-------|
| **Min-Heap** | **O(n² log n)** | **O(n²)** |
| Binary Search + BFS | O(n² log n) | O(n²) |

---

## Key Takeaway

> "Minimize the maximum value along any path" = modified Dijkstra where edge weight is the max elevation. The min-heap always explores the path with the smallest maximum elevation first.
