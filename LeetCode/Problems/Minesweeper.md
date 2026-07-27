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

Given a Minesweeper board and a click position, update the board according to the rules:
- If a mine `'M'` is clicked → change to `'X'` (game over).
- If an empty `'E'` is clicked → count adjacent mines. If count > 0, show the count digit. If count = 0, reveal as `'B'` and recursively reveal all adjacent unrevealed cells.

---

## Examples

```
Click on 'M' → 'X'
Click on 'E' with 2 adjacent mines → '2'
Click on 'E' with 0 adjacent mines → 'B', then flood-fill reveal neighbors
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
