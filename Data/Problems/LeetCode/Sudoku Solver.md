# 37. Sudoku Solver

**Difficulty:** 🔴 Hard
**Acceptance:** 62.0%
**LeetCode:** [https://leetcode.com/problems/sudoku-solver](https://leetcode.com/problems/sudoku-solver)
**Companies:** Amazon, Apple, Bloomberg, Citadel, Confluent, Doordash, Ebay, Goldman Sachs, Google, Intuit, Meta, Microsoft, Oracle, Riot Games, Snapchat, Uber, Zoho

---

## 1. Problem Description

Given a partially filled 9×9 Sudoku board, fill the empty cells (denoted by `'.'`) so that each row, each column, and each of the nine 3×3 sub‑grids contain all digits from `1` to `9`. The puzzle is guaranteed to have a unique solution.

---

## 2. Approach: Backtracking with Constraint Propagation — O(9^empty) ✅

```text
FUNCTION solveSudoku(board):
    solve(board)

FUNCTION solve(board):
    FOR row ← 0 TO 8:
        FOR col ← 0 TO 8:
            IF board[row][col] == '.':
                FOR digit ← '1' TO '9':
                    IF isValid(board, row, col, digit):
                        board[row][col] ← digit
                        IF solve(board):
                            RETURN true
                        board[row][col] ← '.'    // backtrack
                RETURN false                  // no digit fits
    RETURN true    // board completely filled

FUNCTION isValid(board, row, col, digit):
    // Row and column checks
    FOR i ← 0 TO 8:
        IF board[row][i] == digit: RETURN false
        IF board[i][col] == digit: RETURN false
    // 3×3 sub‑grid check
    startRow ← 3 * (row / 3)
    startCol ← 3 * (col / 3)
    FOR i ← 0 TO 2:
        FOR j ← 0 TO 2:
            IF board[startRow + i][startCol + j] == digit:
                RETURN false
    RETURN true
```

---

## 3. Examples

| Input board (partial) | Solved board |
|-----------------------|--------------|
| `[["5","3",".",...]]` | `[["5","3","4",...]]` |
| (other typical puzzle) | (completed grid) |

---

## 4. Walkthrough

Consider the first empty cell at `(0,2)`. Try digits `1`‑`9`:

1. `1` fails row check.
2. `2` fails column check.
3. `4` passes all three checks → place `4`.
4. Recurse to next empty cell. If later a conflict occurs, backtrack and try the next digit for `(0,2)`.
5. The recursion explores the search tree until the board is fully filled.

---

## 5. Complexity Analysis

- **Time:** O(9^E) where `E` is the number of empty cells (worst‑case exponential). Pruning via `isValid` dramatically reduces the search space.
- **Space:** O(E) recursion stack, plus O(1) extra board storage.

---

## 6. Follow-Up Questions

- How can bit‑mask representations of rows, columns, and boxes speed up `isValid` checks?
- Can constraint propagation (e.g., naked singles, hidden singles) be combined with backtracking for faster solving?
- How would you adapt the algorithm to solve larger Sudoku variants (16×16, irregular regions)?

---

## Key Takeaway

> Sudoku solving is a classic backtracking problem: try a digit, validate constraints, recurse, and backtrack on failure. Efficient validity checks are key to practical performance.
