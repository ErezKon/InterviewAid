# 1914. Cyclically Rotating a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cyclically-rotating-a-grid](https://leetcode.com/problems/cyclically-rotating-a-grid)
**Companies:** Amazon, Google, Meta

---

## Problem Description

Rotate each concentric ring (layer) of an `m × n` grid counter-clockwise by `k` positions.

---

## Examples

| Input | Output |
|-------|--------|
| `grid = [[1,2,3],[4,5,6],[7,8,9]]`, `k = 1` | `[[2,3,6],[1,5,9],[4,7,8]]` |
| `grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]`, `k = 2` | `[[3,4,8,12],[2,11,10,16],[1,7,6,15],[5,9,13,14]]` |

*Explanation*: Each layer is extracted, rotated left by `k`, and written back.

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