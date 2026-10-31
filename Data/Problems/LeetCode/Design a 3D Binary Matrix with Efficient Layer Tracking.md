# 3391. Design a 3D Binary Matrix with Efficient Layer Tracking

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-3d-binary-matrix-with-efficient-layer-tracking](https://leetcode.com/problems/design-a-3d-binary-matrix-with-efficient-layer-tracking)
**Companies:** Amdocs

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. The existing Approach/Walkthrough below solve a different problem (largest all-ones submatrix) and do not match this statement.*

You are given a `n x n x n` **binary** 3D array `matrix`.

Implement the `Matrix3D` class:

- `Matrix3D(int n)` Initializes the object with the 3D binary array `matrix`, where **all** elements are initially set to 0.
- `void setCell(int x, int y, int z)` Sets the value at `matrix[x][y][z]` to 1.
- `void unsetCell(int x, int y, int z)` Sets the value at `matrix[x][y][z]` to 0.
- `int largestMatrix()` Returns the index `x` where `matrix[x]` contains the most number of 1's. If there are multiple such indices, return the **largest** `x`.

**Constraints:**
- `1 <= n <= 100`
- `0 <= x, y, z < n`
- At most `10^5` calls are made in total to `setCell` and `unsetCell`.
- At most `10^4` calls are made to `largestMatrix`.

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
        // Compute largest all-ones submatrix in layer x using histogram technique
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
Input: ["Matrix3D", "setCell", "largestMatrix", "setCell", "largestMatrix", "setCell", "largestMatrix"]
[[3], [0, 0, 0], [], [1, 1, 2], [], [0, 0, 1], []]
Output: [null, null, 0, null, 1, null, 0]
Explanation:
Matrix3D matrix3D = new Matrix3D(3); // Initializes a 3 x 3 x 3 3D array matrix, filled with all 0's.
matrix3D.setCell(0, 0, 0); // Sets matrix[0][0][0] to 1.
matrix3D.largestMatrix(); // Returns 0. matrix[0] has the most number of 1's.
matrix3D.setCell(1, 1, 2); // Sets matrix[1][1][2] to 1.
matrix3D.largestMatrix(); // Returns 1. matrix[0] and matrix[1] tie with the most number of 1's, but index 1 is bigger.
matrix3D.setCell(0, 0, 1); // Sets matrix[0][0][1] to 1.
matrix3D.largestMatrix(); // Returns 0. matrix[0] has the most number of 1's.
```

**Example 2:**
```
Input: ["Matrix3D", "setCell", "largestMatrix", "unsetCell", "largestMatrix"]
[[4], [2, 1, 1], [], [2, 1, 1], []]
Output: [null, null, 2, null, 3]
Explanation:
Matrix3D matrix3D = new Matrix3D(4); // Initializes a 4 x 4 x 4 3D array matrix, filled with all 0's.
matrix3D.setCell(2, 1, 1); // Sets matrix[2][1][1] to 1.
matrix3D.largestMatrix(); // Returns 2. matrix[2] has the most number of 1's.
matrix3D.unsetCell(2, 1, 1); // Sets matrix[2][1][1] to 0.
matrix3D.largestMatrix(); // Returns 3. All indices from 0 to 3 tie with the same number of 1's, but index 3 is the biggest.
```

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

- **Time:** `setCell` / `unsetCell` O(1). `largestMatrix` O(rows × cols) per query using the largest-rectangle-in-histogram algorithm.
- **Space:** O(rows × cols × layers) for the matrix plus O(cols) auxiliary space for heights.

---

## Follow-Up Questions

1. How would you support queries for the largest sub-matrix across *all* layers efficiently?
2. Can you extend the design to handle dynamic resizing of the matrix?
3. What if the matrix stores integers and you need the largest sum sub-matrix?

---

## Key Takeaway

> **3D matrix design: maintain per-layer metadata and use a histogram-based algorithm to compute the largest all-ones submatrix efficiently.**