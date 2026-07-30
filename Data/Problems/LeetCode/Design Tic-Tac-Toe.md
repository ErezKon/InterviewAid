# 348. Design Tic-Tac-Toe

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-tic-tac-toe](https://leetcode.com/problems/design-tic-tac-toe)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, Chewy, Citadel, Databricks, Google, Meta, Microsoft, Tesla, Tiktok, Waymo, Wise

---

## Problem Description

Design a Tic-Tac-Toe game on an `n × n` board. Implement `move(row, col, player)` which records a move for `player` (1 or 2) and returns the winner (1 or 2) if that move completes a line, otherwise returns 0.

## Examples

1. Initialize with `n = 3`.
   - `move(0,0,1)` → returns 0 (no winner).
   - `move(0,2,2)` → returns 0.
   - `move(2,2,1)` → returns 0.
   - `move(1,1,2)` → returns 0.
   - `move(2,0,1)` → returns 0.
   - `move(1,0,2)` → returns 0.
   - `move(2,1,1)` → returns **1** (player 1 wins by filling the third column).

## Approach

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
        IF ABS(rows[row]) == n OR ABS(cols[col]) == n OR ABS(diag) == n OR ABS(antiDiag) == n:
            RETURN player
        RETURN 0
```

## Walkthrough

| Step | Call | Internal State (`rows`, `cols`, `diag`, `antiDiag`) | Return |
|------|------|---------------------------------------------------|--------|
| 1 | `move(0,0,1)` | rows[0]=1, cols[0]=1, diag=1 | 0 |
| 2 | `move(0,2,2)` | rows[0]=0, cols[2]=-1, antiDiag=-1 | 0 |
| 3 | `move(2,2,1)` | rows[2]=1, cols[2]=0, diag=2 | 0 |
| 4 | `move(1,1,2)` | rows[1]=-1, cols[1]=-1, diag=1, antiDiag=-2 | 0 |
| 5 | `move(2,0,1)` | rows[2]=2, cols[0]=2, antiDiag=-1 | 0 |
| 6 | `move(1,0,2)` | rows[1]=-2, cols[0]=1, antiDiag=-1 | 0 |
| 7 | `move(2,1,1)` | rows[2]=3 → **ABS=3 == n**, player 1 wins | 1 |

## Complexity Analysis

- Each `move` updates constant‑time counters and checks four conditions: **O(1)** time.
- Storage: four arrays/counters of size *n*: **O(n)** space.

## Follow-Up Questions

- How would you modify the design to support undo operations?
- Can you extend it to detect a draw when the board is full?
- What changes are needed for a variable‑size board where *n* can be up to 10⁴?

---

## Key Takeaway

> **Encode players as +1/-1 and maintain row, column, diagonal, and anti‑diagonal sums. A sum reaching ±n indicates a winning line, giving O(1) per move and O(n) space without storing the full board.**