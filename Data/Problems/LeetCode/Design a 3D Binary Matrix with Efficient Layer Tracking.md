# 3391. Design a 3D Binary Matrix with Efficient Layer Tracking

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-3d-binary-matrix-with-efficient-layer-tracking](https://leetcode.com/problems/design-a-3d-binary-matrix-with-efficient-layer-tracking)
**Companies:** Amdocs

---

## Problem Description

Design a 3D binary matrix supporting `setCell(x, y, z)`, `unsetCell(x, y, z)`, and `largestMatrix(x)` which returns the size of the largest all-ones 2D submatrix in layer `x`.

---

## Approach

```
CLASS Matrix3D:
    matrix = 3D array of zeros
    layerCounts = array tracking 1-counts per layer

    FUNCTION setCell(x, y, z):
        IF matrix[x][y][z] == 0:
            matrix[x][y][z] = 1
            layerCounts[x] += 1

    FUNCTION unsetCell(x, y, z):
        IF matrix[x][y][z] == 1:
            matrix[x][y][z] = 0
            layerCounts[x] -= 1

    FUNCTION largestMatrix(x):
        // Compute largest all‑ones submatrix in layer x using histogram technique
        SET maxArea ← 0
        SET heights ← array of zeros with length = number of columns
        FOR row FROM 0 TO rows-1:
            FOR col FROM 0 TO cols-1:
                IF matrix[x][row][col] == 1:
                    heights[col] ← heights[col] + 1
                ELSE:
                    heights[col] ← 0
            SET area ← largestRectangleInHistogram(heights)
            SET maxArea ← MAX(maxArea, area)
        RETURN maxArea
```

---

## Examples

**Example 1:**
```
setCell(0,0,0) → true
setCell(0,1,0) → true
largestMatrix(0) → 2   // 2×1 submatrix of ones
unsetCell(0,0,0) → true
largestMatrix(0) → 1
```
Explanation: After setting two cells in layer 0, the largest all‑ones submatrix has area 2. Removing one cell reduces the area to 1.

---

## Walkthrough

| Step | Operation | Matrix Layer 0 (rows × cols) | Largest Submatrix |
|------|-----------|------------------------------|-------------------|
| 1 | `setCell(0,0,0)` | `[[1,0],[0,0]]` | 1 |
| 2 | `setCell(0,1,0)` | `[[1,0],[1,0]]` | 2 (vertical 2×1) |
| 3 | `unsetCell(0,0,0)` | `[[0,0],[1,0]]` | 1 |

The histogram method recomputes heights for each row, then finds the maximal rectangle.

---

## Complexity Analysis

- **Time:** `setCell` / `unsetCell` O(1). `largestMatrix` O(rows × cols) per query using the largest‑rectangle‑in‑histogram algorithm.
- **Space:** O(rows × cols × layers) for the matrix plus O(cols) auxiliary space for heights.

---

## Follow‑Up Questions

1. How would you support queries for the largest sub‑matrix across *all* layers efficiently?
2. Can you extend the design to handle dynamic resizing of the matrix?
3. What if the matrix stores integers and you need the largest sum sub‑matrix?

---

## Key Takeaway

> **3D matrix design: maintain per‑layer metadata and use a histogram‑based algorithm to compute the largest all‑ones submatrix efficiently.**