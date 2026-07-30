# 51. N-Queens

**Difficulty:** 🔴 Hard
**Acceptance:** 67.0%
**LeetCode:** [https://leetcode.com/problems/n-queens](https://leetcode.com/problems/n-queens)
**Companies:** Accenture, Adobe, Amazon, Bloomberg, Goldman Sachs, Google, Huawei, Ibm, Infosys, Meta, Microsoft, Oracle, Tcs, Tiktok, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Place `n` queens on an `n×n` chessboard such that no two queens attack each other. Return **all distinct board configurations**.

---

## 2. Examples

| Input | Output |
|-------|--------|
| `n = 4` | `[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]` |
| `n = 1` | `[["Q"]]` |

**Explanation:** For `n = 4` there are two valid placements; each string array represents a board where `Q` marks a queen and `.` an empty cell.

---

## 3. Approach

**Backtracking** – place queens row by row, ensuring columns and both diagonals are free. Use three sets to track occupied columns, major diagonals (`row - col`), and minor diagonals (`row + col`). When a placement reaches row `n`, record the current board.

```text
FUNCTION solveNQueens(n):
    result ← []
    cols ← empty set
    diag1 ← empty set   // row - col
    diag2 ← empty set   // row + col
    board ← array of n strings filled with '.'

    FUNCTION backtrack(row):
        IF row = n:
            result.APPEND(copy of board)
            RETURN
        FOR col FROM 0 TO n - 1:
            IF col IN cols OR (row - col) IN diag1 OR (row + col) IN diag2:
                CONTINUE
            cols.ADD(col)
            diag1.ADD(row - col)
            diag2.ADD(row + col)
            REPLACE character at board[row][col] WITH 'Q'
            backtrack(row + 1)
            REPLACE character at board[row][col] WITH '.'
            cols.REMOVE(col)
            diag1.REMOVE(row - col)
            diag2.REMOVE(row + col)

    backtrack(0)
    RETURN result
```

---

## 4. Walkthrough

Consider `n = 4`.

1. **Row 0:** try column 1 → safe, place queen.
2. **Row 1:** column 3 is safe (col 1 occupied, diagonals blocked), place queen.
3. **Row 2:** column 0 is safe, place queen.
4. **Row 3:** column 2 is safe → first complete board recorded.
5. Backtrack to explore alternatives, eventually placing queens at columns `[2,0,3,1]` for the second solution.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n!) – explores all permutations of queen placements |
| **Space** | O(n) for the three sets + O(n²) for storing each solution |

---

## 6. Follow-Up Questions

* How would you modify the algorithm to **return only the count** of solutions?
* Can you improve performance using **bitmasking** for the column and diagonal sets?
* What changes are needed if the board size exceeds typical recursion limits?

---

## 7. Key Takeaway

> **Backtracking with diagonal encoding** (`row±col`) efficiently solves N‑Queens and generalizes to many constraint‑satisfaction problems.
