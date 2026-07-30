# 909. Snakes and Ladders

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/snakes-and-ladders](https://leetcode.com/problems/snakes-and-ladders)
**Companies:** Amazon, Anduril, Apple, Bloomberg, Cisco, Goldman Sachs, Google, Meta, Microsoft, Tesla, Tiktok, Zomato

---

## Problem Description

Given an `n x n` board representing Snakes and Ladders (boustrophedon numbering), find the minimum number of dice rolls to reach the last square from square 1.

### Examples

- **Input:** Standard 6×6 board with snakes and ladders → **Output:** minimum moves to reach square 36

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
