# 2319. Check if Matrix Is X-Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-matrix-is-x-matrix](https://leetcode.com/problems/check-if-matrix-is-x-matrix)
**Companies:** Amazon, Google

---

## 1. Problem Description

A matrix is an **X-Matrix** if all diagonal elements are non-zero and all other elements are zero. Given a square matrix `grid`, check if it's an X-Matrix.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[[2,0,0],[0,3,0],[0,0,4]]` | `true` | All diagonal entries (2,3,4) are non‑zero, all off‑diagonal entries are zero. |
| `[[0,1],[1,0]]` | `false` | The main diagonal contains a zero. |
| `[[1,0,2],[0,3,0],[4,0,5]]` | `false` | Off‑diagonal element `2` at (0,2) is non‑zero.

---

## 3. Approach: Check Each Cell — O(n²) ✅

```text
FUNCTION checkXMatrix(grid):
    n ← LENGTH(grid)
    FOR i ← 0 TO n-1:
        FOR j ← 0 TO n-1:
            onDiagonal ← (i == j) OR (i + j == n - 1)
            IF onDiagonal AND grid[i][j] == 0:
                RETURN false
            IF NOT onDiagonal AND grid[i][j] != 0:
                RETURN false
    RETURN true
```

---

## 4. Walkthrough

Consider `grid = [[2,0,0],[0,3,0],[0,0,4]]`:
1. `n = 3`. Loop over each cell.
2. Cells (0,0), (1,1), (2,2) and (0,2), (2,0) are on a diagonal; all contain non‑zero values.
3. All other cells are off‑diagonal and contain `0`.
4. No rule is violated, so the function returns `true`.
If we change `grid[0][2]` to `2`, step 3 fails because an off‑diagonal cell is non‑zero, leading to `false`.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(n²) – each of the n² cells is inspected |
| Space  | O(1) – only a few counters are used |

---

## 6. Follow‑Up Questions

- How would you modify the algorithm to handle a rectangular matrix and check for a similar “cross” pattern?
- Can you solve the problem in O(n) time by only examining the two diagonals and counting non‑zero off‑diagonal elements?
- What if the matrix is extremely large and stored in a sparse format? Discuss an efficient representation.

---

## Key Takeaway

> A cell belongs to an X‑Matrix diagonal if `i == j` or `i + j == n‑1`. Verify non‑zero on diagonals and zero elsewhere.
