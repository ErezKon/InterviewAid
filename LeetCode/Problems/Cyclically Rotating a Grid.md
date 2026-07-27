# 1914. Cyclically Rotating a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cyclically-rotating-a-grid](https://leetcode.com/problems/cyclically-rotating-a-grid)
**Companies:** Amazon, Google, Meta

---

## Problem Description

Rotate each concentric ring (layer) of an `m × n` grid counter-clockwise by `k` positions.

---

## Approach

```
FUNCTION rotateGrid(grid, k):
    layers = MIN(m, n) / 2
    FOR layer ← 0 TO layers - 1:
        // Extract ring elements in order (top→left→bottom→right)
        ring = extractRing(grid, layer)
        // Rotate by k % len(ring) positions
        rotated = ring[k % len(ring):] + ring[:k % len(ring)]
        // Place rotated elements back
        placeRing(grid, layer, rotated)
    RETURN grid
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) |
| **Space** | O(m × n) for ring storage |

---

## Key Takeaway

> **Grid ring rotation: extract each concentric layer as a 1D list, rotate with modular slicing, then write back. Handle k % ring_length to avoid redundant full rotations.**
