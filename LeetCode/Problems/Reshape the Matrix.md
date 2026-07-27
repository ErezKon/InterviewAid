# 566. Reshape the Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reshape-the-matrix](https://leetcode.com/problems/reshape-the-matrix)
**Companies:** Amazon, Google, Mathworks, Meta, Tcs

---

## Problem Description

Given an `m × n` matrix `mat` and two integers `r` and `c`, reshape `mat` into a new `r × c` matrix filled with all elements row by row from `mat`. If reshape is impossible (element count differs), return the original matrix.

**Constraints:**
- `1 <= m, n <= 100`
- `1 <= r, c <= 300`

---

## Examples

**Example 1:**
- **Input:** `mat = [[1,2],[3,4]], r = 1, c = 4`
- **Output:** `[[1,2,3,4]]`

**Example 2:**
- **Input:** `mat = [[1,2],[3,4]], r = 2, c = 4`
- **Output:** `[[1,2],[3,4]]` (impossible — 4 ≠ 8)

---

## Key Insight

> Map each linear index `i` (0 to m·n−1) to source `mat[i/n][i%n]` and target `result[i/c][i%c]` using integer division and modulo.

---

## Approach

```
FUNCTION matrixReshape(mat, r, c):
    m, n = len(mat), len(mat[0])
    IF m * n != r * c: RETURN mat
    result = [[0] * c for _ in range(r)]
    FOR i ← 0 TO m * n - 1:
        result[i // c][i % c] = mat[i // n][i % n]
    RETURN result
```

---

## Walkthrough

`mat = [[1,2],[3,4]], r = 1, c = 4`

| i | Source (i/2, i%2) | Value | Target (i/4, i%4) |
|---|-------------------|-------|--------------------|
| 0 | (0,0)            | 1     | (0,0)              |
| 1 | (0,1)            | 2     | (0,1)              |
| 2 | (1,0)            | 3     | (0,2)              |
| 3 | (1,1)            | 4     | (0,3)              |

Result: `[[1,2,3,4]]` ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(m·n) — visit every element once |
| Space  | O(m·n) — new matrix (or O(1) extra if done in-place with same dimensions) |

---

## Key Takeaway

> Any 2D index can be flattened to a 1D index and back using division/modulo — the fundamental technique for matrix reshaping and traversal problems.
