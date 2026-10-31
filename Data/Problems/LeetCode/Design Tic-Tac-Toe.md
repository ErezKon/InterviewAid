# 348. Design Tic-Tac-Toe

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-tic-tac-toe](https://leetcode.com/problems/design-tic-tac-toe)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, Chewy, Citadel, Databricks, Google, Meta, Microsoft, Tesla, Tiktok, Waymo, Wise

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Assume the following rules are for the tic-tac-toe game on an `n x n` board between two players:

- A move is guaranteed to be valid and is placed on an empty block.
- Once a winning condition is reached, no more moves are allowed.
- A player who succeeds in placing `n` of their marks in a horizontal, vertical, or diagonal row wins the game.

Implement the `TicTacToe` class:

- `TicTacToe(int n)` Initializes the object the size of the board `n`.
- `int move(int row, int col, int player)` Indicates that the player with id `player` plays at the cell `(row, col)` of the board. The move is guaranteed to be a valid move, and the two players alternate in making moves. Return

- `0` if there is **no winner** after the move,
- `1` if **player 1** is the winner after the move, or
- `2` if **player 2** is the winner after the move.

**Follow-up:** Could you do better than `O(n^2)` per `move()` operation?

**Constraints:**
- `2 <= n <= 100`
- player is `1` or `2`.
- `0 <= row, col < n`
- `(row, col)` are **unique** for each different call to `move`.
- At most `n^2` calls will be made to `move`.

## Examples

**Example 1:**
```
Input
["TicTacToe", "move", "move", "move", "move", "move", "move", "move"]
[[3], [0, 0, 1], [0, 2, 2], [2, 2, 1], [1, 1, 2], [2, 0, 1], [1, 0, 2], [2, 1, 1]]
Output:
[null, 0, 0, 0, 0, 0, 0, 1]
Explanation:
TicTacToe ticTacToe = new TicTacToe(3);
Assume that player 1 is "X" and player 2 is "O" in the board.
ticTacToe.move(0, 0, 1); // return 0 (no one wins)
|X| | |
| | | |    // Player 1 makes a move at (0, 0).
| | | |
ticTacToe.move(0, 2, 2); // return 0 (no one wins)
|X| |O|
| | | |    // Player 2 makes a move at (0, 2).
| | | |
ticTacToe.move(2, 2, 1); // return 0 (no one wins)
|X| |O|
| | | |    // Player 1 makes a move at (2, 2).
| | |X|
ticTacToe.move(1, 1, 2); // return 0 (no one wins)
|X| |O|
| |O| |    // Player 2 makes a move at (1, 1).
| | |X|
ticTacToe.move(2, 0, 1); // return 0 (no one wins)
|X| |O|
| |O| |    // Player 1 makes a move at (2, 0).
|X| |X|
ticTacToe.move(1, 0, 2); // return 0 (no one wins)
|X| |O|
|O|O| |    // Player 2 makes a move at (1, 0).
|X| |X|
ticTacToe.move(2, 1, 1); // return 1 (player 1 wins)
|X| |O|
|O|O| |    // Player 1 makes a move at (2, 1).
|X|X|X|
```

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

- Each `move` updates constant-time counters and checks four conditions: **O(1)** time.
- Storage: four arrays/counters of size *n*: **O(n)** space.

## Follow-Up Questions

- How would you modify the design to support undo operations?
- Can you extend it to detect a draw when the board is full?
- What changes are needed for a variable-size board where *n* can be up to 10⁴?

---

## Key Takeaway

> **Encode players as +1/-1 and maintain row, column, diagonal, and anti-diagonal sums. A sum reaching ±n indicates a winning line, giving O(1) per move and O(n) space without storing the full board.**