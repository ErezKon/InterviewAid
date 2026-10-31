# 794. Valid Tic-Tac-Toe State

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/valid-tic-tac-toe-state](https://leetcode.com/problems/valid-tic-tac-toe-state)
**Companies:** Amazon, Microsoft, Tiktok

---

## Problem Description

Given a Tic-Tac-Toe board as a string array `board`, return `true` if and only if it is possible to reach this board position during the course of a valid tic-tac-toe game.

The board is a `3 x 3` array that consists of characters `' '`, `'X'`, and `'O'`. The `' '` character represents an empty square.

Here are the rules of Tic-Tac-Toe:

- Players take turns placing characters into empty squares `' '`.
- The first player always places `'X'` characters, while the second player always places `'O'` characters.
- `'X'` and `'O'` characters are always placed into empty squares, never filled ones.
- The game ends when there are three of the same (non-empty) character filling any row, column, or diagonal.
- The game also ends if all squares are non-empty.
- No more moves can be played if the game is over.

**Constraints:**
- `board.length == 3`
- `board[i].length == 3`
- `board[i][j]` is either `'X'`, `'O'`, or `' '`.

## Examples

**Example 1:**
```
Input: board = ["O  ","   ","   "]
Output: false
Explanation: The first player always plays "X".
```

**Example 2:**
```
Input: board = ["XOX"," X ","   "]
Output: false
Explanation: Players take turns making moves.
```

**Example 3:**
```
Input: board = ["XOX","O O","XOX"]
Output: true
```

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
A Tic-Tac-Toe board is valid only when the move counts and winning conditions are consistent with alternating turns.
