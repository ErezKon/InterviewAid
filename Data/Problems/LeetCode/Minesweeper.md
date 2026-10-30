# 529. Minesweeper

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minesweeper](https://leetcode.com/problems/minesweeper)
**Companies:** Amazon, Anduril, Applied Intuition, Google, Meta, Microsoft, Nuro, Robinhood, Tiktok

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Let's play the minesweeper game (Wikipedia, online game)!

You are given an `m x n` char matrix `board` representing the game board where:

- `'M'` represents an unrevealed mine,
- `'E'` represents an unrevealed empty square,
- `'B'` represents a revealed blank square that has no adjacent mines (i.e., above, below, left, right, and all 4 diagonals),
- digit (`'1'` to `'8'`) represents how many mines are adjacent to this revealed square, and
- `'X'` represents a revealed mine.

You are also given an integer array `click` where `click = [click_r, click_c]` represents the next click position among all the unrevealed squares (`'M'` or `'E'`).

Return *the board after revealing this position according to the following rules*:

- If a mine `'M'` is revealed, then the game is over. You should change it to `'X'`.
- If an empty square `'E'` with no adjacent mines is revealed, then change it to a revealed blank `'B'` and all of its adjacent unrevealed squares should be revealed recursively.
- If an empty square `'E'` with at least one adjacent mine is revealed, then change it to a digit (`'1'` to `'8'`) representing the number of adjacent mines.
- Return the board when no more squares will be revealed.

**Constraints:**
- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 50`
- `board[i][j]` is either `'M'`, `'E'`, `'B'`, or a digit from `'1'` to `'8'`.
- `click.length == 2`
- `0 <= click_r < m`
- `0 <= click_c < n`
- `board[click_r][click_c]` is either `'M'` or `'E'`.

---

## Examples

**Example 1:**
```
Input: board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [3,0]
Output: [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
```

**Example 2:**
```
Input: board = [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]], click = [1,2]
Output: [["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
```

---

## Key Insight

> Classic **flood fill / DFS** — reveal the clicked cell, and if it has no adjacent mines, recursively reveal all 8 neighbors. Stop expanding when hitting a cell with adjacent mines (show the count) or the board boundary.

---

## Approach: BFS/DFS — O(m·n) ✅

```
FUNCTION updateBoard(board, click):
    [r, c] ← click
    IF board[r][c] = 'M' THEN
        board[r][c] ← 'X'
        RETURN board

    reveal(board, r, c)
    RETURN board

FUNCTION reveal(board, r, c):
    IF out of bounds OR board[r][c] ≠ 'E' THEN RETURN

    mines ← count adjacent mines (8 directions)
    IF mines > 0 THEN
        board[r][c] ← STR(mines)
    ELSE
        board[r][c] ← 'B'
        FOR each of 8 neighbors (nr, nc) DO
            reveal(board, nr, nc)
```

If no adjacent mines → reveal as `'B'` and recursively reveal neighbors. If adjacent mines → show count and stop.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DFS flood fill | **O(m · n)** | **O(m · n)** stack |

---

## Follow-Up Questions

1. **BFS or DFS?** Both work. BFS uses a queue and avoids deep recursion; DFS is simpler to code.
2. **Why stop at cells with adjacent mines?** These act as "borders" — they provide information but shouldn't trigger further reveals (matching the real game).
3. **How to handle multiple clicks?** Each click is independent — apply the same logic to the current board state.

---

## Key Takeaway

> **Flood fill with conditional expansion** — reveal empty cells recursively, but stop at cells adjacent to mines. A direct simulation of the Minesweeper reveal mechanic using DFS/BFS.

---
