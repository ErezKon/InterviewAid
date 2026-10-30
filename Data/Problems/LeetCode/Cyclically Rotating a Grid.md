# 1914. Cyclically Rotating a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cyclically-rotating-a-grid](https://leetcode.com/problems/cyclically-rotating-a-grid)
**Companies:** Amazon, Google, Meta

---

## Problem Description

You are given an `m x n` integer matrix `grid`, where `m` and `n` are both **even** integers, and an integer `k`.

The matrix is composed of several layers, which is shown in the below image, where each color is its own layer:

![img](https://assets.leetcode.com/uploads/2021/06/10/ringofgrid.png)

A cyclic rotation of the matrix is done by cyclically rotating **each layer** in the matrix. To cyclically rotate a layer once, each element in the layer will take the place of the adjacent element in the **counter-clockwise** direction. An example rotation is shown below:
![img](https://assets.leetcode.com/uploads/2021/06/22/explanation_grid.jpg)
Return *the matrix after applying *`k` *cyclic rotations to it*.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `2 <= m, n <= 50`
- Both `m` and `n` are **even** integers.
- `1 <= grid[i][j] <=^ 5000`
- `1 <= k <= 10^9`

---

## Examples

**Example 1:**
```
Input: grid = [[40,10],[30,20]], k = 1
Output: [[10,20],[40,30]]
Explanation: The figures above represent the grid at every state.
```

**Example 2:**
```
![img](https://assets.leetcode.com/uploads/2021/06/10/ringofgrid5.png) ![img](https://assets.leetcode.com/uploads/2021/06/10/ringofgrid6.png) ![img](https://assets.leetcode.com/uploads/2021/06/10/ringofgrid7.png)
Input: grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], k = 2
Output: [[3,4,8,12],[2,11,10,16],[1,7,6,15],[5,9,13,14]]
Explanation: The figures above represent the grid at every state.
```

---

## Approach

```
FUNCTION rotateGrid(grid, k):
    layers = MIN(m, n) / 2
    FOR layer ← 0 TO layers - 1:
        // Extract ring elements in order (top→right→bottom→left)
        ring = extractRing(grid, layer)
        // Effective rotation
        rot ← k MOD LENGTH(ring)
        rotated = ring[rot:] + ring[:rot]
        // Write back rotated ring
        placeRing(grid, layer, rotated)
    RETURN grid
```

---

## Walkthrough

**Example 1** – `grid = [[1,2,3],[4,5,6],[7,8,9]]`, `k = 1`

1. **Layer 0 extraction** → ring = `[1,2,3,6,9,8,7,4]`
2. **Rotate left by 1** → rotated = `[2,3,6,9,8,7,4,1]`
3. **Place back** results in:
   - top row: `2,3,6`
   - right column: `9`
   - bottom row (reversed): `8,7`
   - left column: `4`
4. Final grid:
```
[[2,3,6],
 [1,5,9],
 [4,7,8]]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) – each cell visited once |
| **Space** | O(m × n) for temporary ring storage |

---

## Key Takeaway

> **Grid ring rotation: extract each concentric layer as a 1D list, rotate with modular slicing, then write back. Handle `k % ring_length` to avoid redundant full rotations.**