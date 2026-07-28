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

```text
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

---

## 3. Examples

**Example 1:**
```
Input: heightMap = [[1,4,3,1,3,2],
                    [3,2,1,3,2,4],
                    [2,3,3,2,3,1]]
Output: 4
Explanation: Water is trapped at the low‑lying cells (1,2) and (2,5) totaling 4 units.
```

**Example 2:**
```
Input: heightMap = [[3,3,3,3,3],
                    [3,2,2,2,3],
                    [3,2,1,2,3],
                    [3,2,2,2,3],
                    [3,3,3,3,3]]
Output: 10
```

---

## 4. Walkthrough

We start by pushing all border cells into the min‑heap. The smallest border height is 1 (top‑left corner). Pop it, update `maxHeight` to 1, no water added. Adjacent interior cells are examined; if they are higher than `maxHeight`, they become new boundaries; if lower, water is trapped equal to `maxHeight - height`. The heap always gives the next lowest boundary, ensuring we never underestimate water level.

---

## 5. Complexity Analysis

- **Time:** O(m × n · log(m × n)) — each cell is processed once and heap operations cost log of total cells.
- **Space:** O(m × n) for the visited matrix and heap.

---

## 6. Follow-Up Questions

1. How would you adapt the algorithm for a non‑rectangular grid or irregular terrain?
2. Can you achieve O(mn) time using a bucket‑sort style approach on heights?
3. How does this problem relate to the 1‑D version (Trapping Rain Water) in terms of algorithmic insight?

---

## Key Takeaway

> 2D trapping water generalizes to 3D with a min‑heap BFS from the border inward. The min‑heap ensures we always process the lowest boundary, which determines the water level for interior cells.
