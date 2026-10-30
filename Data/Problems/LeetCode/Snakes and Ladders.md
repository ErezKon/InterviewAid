# 909. Snakes and Ladders

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/snakes-and-ladders](https://leetcode.com/problems/snakes-and-ladders)
**Companies:** Amazon, Anduril, Apple, Bloomberg, Cisco, Goldman Sachs, Google, Meta, Microsoft, Tesla, Tiktok, Zomato

---

## Problem Description

You are given an `n x n` integer matrix `board` where the cells are labeled from `1` to `n²` in a [**Boustrophedon style**](https://en.wikipedia.org/wiki/Boustrophedon) starting from the bottom left of the board (i.e. `board[n - 1][0]`) and alternating direction each row.

You start on square `1` of the board. In each move, starting from square `curr`, do the following:

- Choose a destination square `next` with a label in the range `[curr + 1, min(curr + 6, n²)]`.
  - This choice simulates the result of a standard **6-sided die roll**: i.e., there are always at most 6 destinations, regardless of the size of the board.
- If `next` has a snake or ladder, you **must** move to the destination of that snake or ladder. Otherwise, you move to `next`.
- The game ends when you reach the square `n²`.

A board square on row `r` and column `c` has a snake or ladder if `board[r][c] != -1`. The destination of that snake or ladder is `board[r][c]`. Squares `1` and `n²` are not the starting points of any snake or ladder.

Note that you only take a snake or ladder at most once per dice roll. If the destination to a snake or ladder is the start of another snake or ladder, you do **not** follow the subsequent snake or ladder.

- For example, suppose the board is `[[-1,4],[-1,3]]`, and on the first move, your destination square is `2`. You follow the ladder to square `3`, but do **not** follow the subsequent ladder to `4`.

Return *the least number of dice rolls required to reach the square* `n²`. *If it is not possible to reach the square, return* `-1`.

**Constraints:**
- `n == board.length == board[i].length`
- `2 <= n <= 20`
- `board[i][j]` is either `-1` or in the range `[1, n²]`.
- The squares labeled `1` and `n²` are not the starting points of any snake or ladder.

### Examples

```
Example 1:
  Input: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
  Output: 4
  Explanation:
    In the beginning, you start at square 1 (at row 5, column 0).
    You decide to move to square 2 and must take the ladder to square 15.
    You then decide to move to square 17 and must take the snake to square 13.
    You then decide to move to square 14 and must take the ladder to square 35.
    You then decide to move to square 36, ending the game.
    This is the lowest possible number of moves to reach the last square, so return 4.
```

```
Example 2:
  Input: board = [[-1,-1],[-1,3]]
  Output: 1
```

## Approach: BFS — O(n²) ✅

**Key Insight:** BFS from square 1 to square n². For each position, try dice rolls 1–6. If destination has a snake/ladder, follow it.

```
FUNCTION snakesAndLadders(board):
    n = len(board)
    // Convert board to 1D array (handle boustrophedon order)
    target = n * n

    visited = set()
    queue = [(1, 0)]     // (square, moves)
    visited.ADD(1)

    WHILE queue:
        (sq, moves) = queue.DEQUEUE()
        FOR dice ← 1 TO 6:
            next = sq + dice
            IF next > target: CONTINUE
            // Check for snake/ladder
            (r, c) = squareToRC(next, n)
            IF board[r][c] != -1:
                next = board[r][c]
            IF next == target: RETURN moves + 1
            IF next NOT IN visited:
                visited.ADD(next)
                queue.ENQUEUE((next, moves + 1))

    RETURN -1
```

### Complexity

| | |
|---|---|
| **Time** | O(n²) |
| **Space** | O(n²) |
