# Matrix Rotation & Transformation Patterns

Related: #48 Rotate Image, #54 Spiral Matrix, #73 Set Matrix Zeroes, #289 Game of Life

---

## Problem Description
This reference summarizes common matrix rotation and transformation operations that appear in several LeetCode problems (e.g., Rotate Image, Spiral Matrix). Understanding these patterns helps design in‑place algorithms for rotating or reflecting a square matrix.

## Examples
- **90° clockwise rotation** of a 3×3 matrix transforms `[[1,2,3],[4,5,6],[7,8,9]]` into `[[7,4,1],[8,5,2],[9,6,3]]`.
- **180° rotation** swaps rows and columns twice, yielding `[[9,8,7],[6,5,4],[3,2,1]]`.

## Approach
Use a two‑step process: first transpose the matrix (swap `matrix[i][j]` with `matrix[j][i]`), then reverse rows or columns depending on the desired rotation.

```text
FUNCTION Rotate90Clockwise(matrix):
    SET n ← LENGTH(matrix)
    // Transpose
    FOR i ← 0 TO n-1:
        FOR j ← i+1 TO n-1:
            SWAP matrix[i][j] WITH matrix[j][i]
    // Reverse each row
    FOR each row IN matrix:
        REVERSE row
    RETURN matrix
```

Similar templates apply for counter‑clockwise and 180° rotations by reversing columns instead of rows or performing both reversals.

## Walkthrough
| Step | Operation | Matrix State |
|------|-----------|--------------|
| 1 | Transpose | `[[1,4,7],[2,5,8],[3,6,9]]` |
| 2 | Reverse rows | `[[7,4,1],[8,5,2],[9,6,3]]` |

## Complexity Analysis
- Time: O(n²) for an n×n matrix.
- Space: O(1) extra space (in‑place).

## Follow‑Up Questions
1. How would you rotate a non‑square (m×n) matrix by 90°?
2. Can you perform the rotation using only O(min(m,n)) extra space?
3. How to extend the pattern to rotate layers independently (e.g., spiral rotation)?

## Key Takeaway
Transposition followed by row or column reversal provides a simple in‑place method to achieve any 90° multiple rotation of a square matrix.
