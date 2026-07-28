# 1275. Find Winner on a Tic Tac Toe Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game](https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Zoho

---

## Problem Description
Given a list of moves played on a 3×3 Tic‑Tac‑Toe board, determine the game's result. Players A and B alternate moves, starting with A. Return "A" if player A wins, "B" if player B wins, "Draw" if all nine cells are filled without a winner, or "Pending" otherwise.

## Examples
| moves | Result |
|-------|--------|
| `[[0,0],[2,0],[1,1],[2,1],[2,2]]` | "A" (A completes diagonal) |
| `[[0,0],[1,1],[0,1],[0,2],[1,0],[2,0]]` | "B" (B completes first column) |
| `[[0,0],[1,1],[2,2],[1,0],[1,2],[0,1],[2,1],[0,2],[2,0]]` | "Draw" |

## Approach
Maintain counters for each row, column, and the two diagonals. Add +1 for player A and -1 for player B. After each move, if any absolute counter reaches 3, that player wins.

```text
FUNCTION DetermineWinner(moves):
    SET rows[3] ← [0,0,0]
    SET cols[3] ← [0,0,0]
    SET diag ← 0
    SET antiDiag ← 0
    FOR i FROM 0 TO LENGTH(moves)-1:
        SET r ← moves[i][0]
        SET c ← moves[i][1]
        SET player ← 1 IF i MOD 2 = 0 ELSE -1   // A = +1, B = -1
        SET rows[r] ← rows[r] + player
        SET cols[c] ← cols[c] + player
        IF r = c: SET diag ← diag + player
        IF r + c = 2: SET antiDiag ← antiDiag + player
        IF ABS(rows[r]) = 3 OR ABS(cols[c]) = 3 OR ABS(diag) = 3 OR ABS(antiDiag) = 3:
            RETURN "A" IF player = 1 ELSE "B"
    END FOR
    RETURN "Draw" IF LENGTH(moves) = 9 ELSE "Pending"
```

## Walkthrough
| Step | Move | rows | cols | diag | antiDiag | Result |
|------|------|------|------|------|----------|--------|
| 1 | A at (0,0) | [1,0,0] | [1,0,0] | 1 | 0 | – |
| 2 | B at (2,0) | [1,0,0] | [2,0,0] | 1 | 0 | – |
| 3 | A at (1,1) | [1,1,0] | [2,0,0] | 2 | 2 | – |
| 4 | B at (2,1) | [1,1,0] | [2,0,1] | 2 | 2 | – |
| 5 | A at (2,2) | [1,1,1] | [2,0,1] | 3 | 2 | "A" wins |

## Complexity Analysis
- **Time:** O(M) where M = number of moves (≤9).
- **Space:** O(1) for the fixed-size counters.

## Follow-Up Questions
- How would you extend the solution to an N×N board?
- Can you solve it using a Union‑Find data structure?
- What changes are needed to report the winning line coordinates?

## Key Takeaway
Using simple additive counters for rows, columns, and diagonals lets you detect a Tic‑Tac‑Toe win in constant space and linear time.
