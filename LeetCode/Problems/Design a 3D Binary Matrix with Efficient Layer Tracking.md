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
        RETURN layerCounts[x]  // or compute max submatrix per problem spec
```

---

## Key Takeaway

> **3D matrix design: maintain per-layer metadata for efficient queries. Use counters or cached results per layer to avoid recomputation.**
