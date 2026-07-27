# 51. N-Queens

**Difficulty:** 🔴 Hard
**Acceptance:** 67.0%
**LeetCode:** [https://leetcode.com/problems/n-queens](https://leetcode.com/problems/n-queens)
**Companies:** Accenture, Adobe, Amazon, Bloomberg, Goldman Sachs, Google, Huawei, Ibm, Infosys, Meta, Microsoft, Oracle, Tcs, Tiktok, Zoho

---

## 1. Problem Description

Place `n` queens on an `n×n` chessboard such that no two queens attack each other. Return all distinct solutions.

---

## 2. Approach: Backtracking — O(n!) ✅

Place queens row by row. Track which columns and diagonals are attacked.

```
FUNCTION solveNQueens(n):
    result = []
    cols = set()
    diag1 = set()    // row - col
    diag2 = set()    // row + col
    board = n×n grid of '.'

    FUNCTION backtrack(row):
        IF row == n:
            result.ADD(board as strings)
            RETURN

        FOR col ← 0 TO n - 1:
            IF col IN cols OR (row-col) IN diag1 OR (row+col) IN diag2:
                CONTINUE

            cols.ADD(col)
            diag1.ADD(row - col)
            diag2.ADD(row + col)
            board[row][col] = 'Q'

            backtrack(row + 1)

            board[row][col] = '.'
            cols.REMOVE(col)
            diag1.REMOVE(row - col)
            diag2.REMOVE(row + col)

    backtrack(0)
    RETURN result
```

### Diagonal Trick

- `row - col` is constant along `/` diagonals.
- `row + col` is constant along `\` diagonals.

| Time | Space |
|------|-------|
| O(n!) | O(n²) for solutions |

---

## Key Takeaway

> N-Queens showcases backtracking with efficient conflict detection. The diagonal encoding (`row±col`) avoids O(n) scan per placement. This pattern generalizes to any constraint satisfaction problem.
