# Matrix Rotation & Transformation Patterns

Related: #48 Rotate Image, #54 Spiral Matrix, #73 Set Matrix Zeroes, #289 Game of Life

---

## Rotation Formulas

| Operation | Formula |
|-----------|---------|
| **90° clockwise** | Transpose + Reverse rows |
| **90° counter-clockwise** | Transpose + Reverse columns |
| **180°** | Reverse rows + Reverse columns |
| **Transpose** | `swap(matrix[i][j], matrix[j][i])` |

### 90° Clockwise Template

```
// Step 1: Transpose
FOR i ← 0 TO n-1:
    FOR j ← i+1 TO n-1:
        SWAP(matrix[i][j], matrix[j][i])

// Step 2: Reverse each row
FOR row IN matrix:
    REVERSE(row)
```
