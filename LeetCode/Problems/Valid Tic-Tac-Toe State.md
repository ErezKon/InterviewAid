# 794. Valid Tic-Tac-Toe State

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/valid-tic-tac-toe-state](https://leetcode.com/problems/valid-tic-tac-toe-state)
**Companies:** Amazon, Microsoft, Tiktok

---

```
FUNCTION validTicTacToe(board):
    xCount = SUM(row.count('X') for row in board)
    oCount = SUM(row.count('O') for row in board)
    IF oCount > xCount OR xCount > oCount + 1: RETURN false
    xWin = wins(board, 'X'); oWin = wins(board, 'O')
    IF xWin AND oWin: RETURN false
    IF xWin AND xCount == oCount: RETURN false
    IF oWin AND xCount > oCount: RETURN false
    RETURN true
```
