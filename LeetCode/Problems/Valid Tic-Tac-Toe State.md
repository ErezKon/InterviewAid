# 794. Valid Tic-Tac-Toe State

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/valid-tic-tac-toe-state](https://leetcode.com/problems/valid-tic-tac-toe-state)
**Companies:** Amazon, Microsoft, Tiktok

---

## Problem Description
Given a 3x3 Tic‑Tac‑Toe board represented as an array of three strings, determine whether the board state could occur during a valid game where players take turns placing `X` and `O`. Return `true` if the state is reachable, otherwise `false`.

## Examples
- Input: `["XOX"," X ","   "]` → Output: `false` // `X` has two more moves than `O`.
- Input: `["XOX","O O","XOX"]` → Output: `true` // valid end‑game state with a win.
- Input: `["   ","   ","   "]` → Output: `true` // empty board at start.

## Approach
Count the number of `X` and `O` on the board. The counts must satisfy `xCount == oCount` or `xCount == oCount + 1`. Then check winning lines for each player. If both players win or a player wins with an invalid count, the state is invalid.

```text
FUNCTION validTicTacToe(board):
    SET xCount ← 0
    SET oCount ← 0
    FOR row IN board:
        INCREMENT xCount BY COUNT(row, 'X')
        INCREMENT oCount BY COUNT(row, 'O')
    IF oCount > xCount OR xCount > oCount + 1:
        RETURN false
    SET xWin ← hasWin(board, 'X')
    SET oWin ← hasWin(board, 'O')
    IF xWin AND oWin:
        RETURN false
    IF xWin AND xCount == oCount:
        RETURN false
    IF oWin AND xCount > oCount:
        RETURN false
    RETURN true
```

## Walkthrough
| Step | Board | xCount | oCount | xWin | oWin | Decision |
|------|-------|--------|--------|------|------|----------|
| 1    | `["XOX"," X ","   "]` | 3 | 1 | false | false | `oCount > xCount` → false |
| 2    | `["XOX","O O","XOX"]` | 5 | 4 | true | false | counts valid and only X wins → true |
| 3    | `["   ","   ","   "]` | 0 | 0 | false | false | counts valid, no wins → true |

## Complexity Analysis
- **Time:** O(1) – board size is fixed (3×3), operations are constant.
- **Space:** O(1) – only a few counters are used.

## Follow-Up Questions
- How would you extend the validation to an N×N board?
- Can you generate all possible valid board states?
- How would you detect a win when multiple lines are completed simultaneously?

## Key Takeaway
A Tic‑Tac‑Toe board is valid only when the move counts and winning conditions are consistent with alternating turns.
