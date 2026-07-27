# 1958. Check if Move is Legal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-move-is-legal](https://leetcode.com/problems/check-if-move-is-legal)
**Companies:** Amazon

---

## 1. Problem Description

Given an 8×8 board with `'B'` (black), `'W'` (white), and `'.'` (empty), and a move at `(rMove, cMove)` with color, check if the move is **legal** in Reversi/Othello — i.e., placing the piece creates at least one "good line" (3+ cells in a direction: your color, one or more opponent, your color).

---

## 2. Approach: Check All 8 Directions — O(1) ✅

```
FUNCTION checkMove(board, rMove, cMove, color):
    dirs = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
    FOR dr, dc IN dirs:
        r, c = rMove + dr, cMove + dc
        count = 0
        WHILE 0 <= r < 8 AND 0 <= c < 8 AND board[r][c] != '.' AND board[r][c] != color:
            r += dr; c += dc
            count += 1
        IF count > 0 AND 0 <= r < 8 AND 0 <= c < 8 AND board[r][c] == color:
            RETURN true
    RETURN false
```

| Time | Space |
|------|-------|
| O(1) — board is 8×8 | O(1) |

---

## Key Takeaway

> For each of 8 directions, walk through opponent pieces until you hit your own color or boundary. A valid line needs ≥1 opponent piece between two of your pieces.
