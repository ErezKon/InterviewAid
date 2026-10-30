# 37. Sudoku Solver

**Difficulty:** 🔴 Hard
**Acceptance:** 62.0%
**LeetCode:** [https://leetcode.com/problems/sudoku-solver](https://leetcode.com/problems/sudoku-solver)
**Companies:** Amazon, Apple, Bloomberg, Citadel, Confluent, Doordash, Ebay, Goldman Sachs, Google, Intuit, Meta, Microsoft, Oracle, Riot Games, Snapchat, Uber, Zoho

---

## 1. Problem Description

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy **all of the following rules**:

- Each of the digits `1-9` must occur exactly once in each row.
- Each of the digits `1-9` must occur exactly once in each column.
- Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.

The `'.'` character indicates empty cells.

**Constraints:**
- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit or `'.'`.
- It is **guaranteed** that the input board has only one solution.

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

**Example 1:**
```
Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
Explanation: The input board is shown above and the only valid solution is shown below:
```

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
