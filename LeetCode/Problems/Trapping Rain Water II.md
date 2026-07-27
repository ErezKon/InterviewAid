# 407. Trapping Rain Water II

**Difficulty:** 🔴 Hard
**Acceptance:** 49.0%
**LeetCode:** [https://leetcode.com/problems/trapping-rain-water-ii](https://leetcode.com/problems/trapping-rain-water-ii)
**Companies:** Amazon, Bloomberg, Bytedance, Flipkart, Google, Medianet, Meta, Microsoft, Oracle, Otterai, Qualcomm, Samsung, Twitter, Walmart Labs

---

## 1. Problem Description

Given an m×n integer matrix `heightMap` representing heights, compute how much water it can trap after raining (3D version of Trapping Rain Water).

---

## 2. Approach: Min-Heap BFS from Border — O(mn·log(mn)) ✅

Water flows outward. Start from the border (lowest constraint). Use a min-heap to always process the lowest boundary cell first.

```
FUNCTION trapRainWater(heightMap):
    m, n = dimensions
    visited = m×n boolean matrix
    heap = min-heap

    // Add all border cells to heap
    FOR border cells (r, c):
        heap.PUSH((heightMap[r][c], r, c))
        visited[r][c] = true

    water = 0
    maxHeight = 0

    WHILE heap not empty:
        (h, r, c) = heap.POP()
        maxHeight = MAX(maxHeight, h)
        water += maxHeight - h

        FOR (dr, dc) IN [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r+dr, c+dc
            IF in bounds AND NOT visited[nr][nc]:
                visited[nr][nc] = true
                heap.PUSH((heightMap[nr][nc], nr, nc))

    RETURN water
```

| Time | Space |
|------|-------|
| O(mn·log(mn)) | O(mn) |

---

## Key Takeaway

> 2D trapping water generalizes to 3D with a min-heap BFS from the border inward. The min-heap ensures we always process the lowest boundary, which determines the water level for interior cells.
