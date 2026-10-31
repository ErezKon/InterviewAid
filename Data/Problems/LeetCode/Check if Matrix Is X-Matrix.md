# 2319. Check if Matrix Is X-Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-matrix-is-x-matrix](https://leetcode.com/problems/check-if-matrix-is-x-matrix)
**Companies:** Amazon, Google

---

## 1. Problem Description

A square matrix is said to be an **X-Matrix** if **both** of the following conditions hold:

- All the elements in the diagonals of the matrix are **non-zero**.
- All other elements are 0.

Given a 2D integer array `grid` of size `n x n` representing a square matrix, return `true`* if *`grid`* is an X-Matrix*. Otherwise, return `false`.

**Constraints:**
- `n == grid.length == grid[i].length`
- `3 <= n <= 100`
- `0 <= grid[i][j] <= 10^5`

---

## 2. Examples

**Example 1:**
```
Input: grid = [[2,0,0,1],[0,3,1,0],[0,5,2,0],[4,0,0,2]]
Output: true
Explanation: Refer to the diagram above.
An X-Matrix should have the green elements (diagonals) be non-zero and the red elements be 0.
Thus, grid is an X-Matrix.
```

**Example 2:**
```
Input: grid = [[5,7,0],[0,3,1],[0,5,0]]
Output: false
Explanation: Refer to the diagram above.
An X-Matrix should have the green elements (diagonals) be non-zero and the red elements be 0.
Thus, grid is not an X-Matrix.
```

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
2. Cells (0,0), (1,1), (2,2) and (0,2), (2,0) are on a diagonal; all contain non-zero values.
3. All other cells are off-diagonal and contain `0`.
4. No rule is violated, so the function returns `true`.
If we change `grid[0][2]` to `2`, step 3 fails because an off-diagonal cell is non-zero, leading to `false`.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(n²) – each of the n² cells is inspected |
| Space  | O(1) – only a few counters are used |

---

## 6. Follow-Up Questions

- How would you modify the algorithm to handle a rectangular matrix and check for a similar “cross” pattern?
- Can you solve the problem in O(n) time by only examining the two diagonals and counting non-zero off-diagonal elements?
- What if the matrix is extremely large and stored in a sparse format? Discuss an efficient representation.

---

## Key Takeaway

> A cell belongs to an X-Matrix diagonal if `i == j` or `i + j == n-1`. Verify non-zero on diagonals and zero elsewhere.
