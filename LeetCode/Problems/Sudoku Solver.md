# 37. Sudoku Solver

**Difficulty:** 🔴 Hard
**Acceptance:** 62.0%
**LeetCode:** [https://leetcode.com/problems/sudoku-solver](https://leetcode.com/problems/sudoku-solver)
**Companies:** Amazon, Apple, Bloomberg, Citadel, Confluent, Doordash, Ebay, Goldman Sachs, Google, Intuit, Meta, Microsoft, Oracle, Riot Games, Snapchat, Uber, Zoho

---

## 1. Problem Description

Write a program to solve a Sudoku puzzle by filling the empty cells. The solution is guaranteed to be unique.

---

## 2. Approach: Backtracking — O(9^empty_cells) ✅

```
FUNCTION solveSudoku(board):
    solve(board)

FUNCTION solve(board):
    FOR r ← 0 TO 8:
        FOR c ← 0 TO 8:
            IF board[r][c] == '.':
                FOR digit ← '1' TO '9':
                    IF isValid(board, r, c, digit):
                        board[r][c] = digit
                        IF solve(board):
                            RETURN true
                        board[r][c] = '.'    // backtrack
                RETURN false                  // no valid digit

    RETURN true    // all cells filled

FUNCTION isValid(board, row, col, digit):
    FOR i ← 0 TO 8:
        IF board[row][i] == digit: RETURN false      // row check
        IF board[i][col] == digit: RETURN false      // col check
        boxR = 3*(row/3) + i/3
        boxC = 3*(col/3) + i%3
        IF board[boxR][boxC] == digit: RETURN false  // box check
    RETURN true
```

### Optimization

Use bitmasks for rows, columns, and boxes to check validity in O(1) instead of O(9).

---

## Key Takeaway

> Classic constraint satisfaction backtracking. Try each digit, validate, recurse. The unique solution guarantee means we find it and stop. Bitmask optimization dramatically speeds up validity checking.
