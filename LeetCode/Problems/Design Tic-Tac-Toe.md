# 348. Design Tic-Tac-Toe

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-tic-tac-toe](https://leetcode.com/problems/design-tic-tac-toe)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, Chewy, Citadel, Databricks, Google, Meta, Microsoft, Tesla, Tiktok, Waymo, Wise

---

## Problem Description

Design a Tic-Tac-Toe game on an `n × n` board. `move(row, col, player)` returns the winner (1 or 2) or 0 if no winner yet.

---

## Approach: Row/Col/Diag Counters — O(1) per move ✅

```
CLASS TicTacToe:
    CONSTRUCTOR(n):
        rows = [0] * n
        cols = [0] * n
        diag = 0
        antiDiag = 0
        self.n = n

    FUNCTION move(row, col, player):
        val = 1 IF player == 1 ELSE -1

        rows[row] += val
        cols[col] += val
        IF row == col: diag += val
        IF row + col == n - 1: antiDiag += val

        IF ABS(rows[row]) == n OR ABS(cols[col]) == n OR
           ABS(diag) == n OR ABS(antiDiag) == n:
            RETURN player

        RETURN 0
```

---

## Key Takeaway

> **Encode players as +1/-1. Track row, col, diagonal, and anti-diagonal sums. A sum reaching ±n means that player filled the line. O(1) per move, O(n) space — no need to store the board.**
