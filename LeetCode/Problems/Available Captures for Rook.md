# 999. Available Captures for Rook

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/available-captures-for-rook](https://leetcode.com/problems/available-captures-for-rook)
**Companies:** Google, Square

---

## 1. Problem Description

Given an 8×8 chessboard with one white rook `'R'`, bishops `'B'`, and black pawns `'p'`, return the number of pawns the rook can **capture** (moving horizontally/vertically, blocked by bishops).

---

## 2. Approach: Four-Direction Scan — O(1) ✅

```text
FUNCTION numRookCaptures(board):
    // Locate the rook
    FOR r FROM 0 TO 7:
        FOR c FROM 0 TO 7:
            IF board[r][c] == 'R':
                rookRow ← r; rookCol ← c; BREAK
    
    captures ← 0
    FOR dr, dc IN [(0,1),(0,-1),(1,0),(-1,0)]:
        nr ← rookRow + dr; nc ← rookCol + dc
        WHILE 0 ≤ nr < 8 AND 0 ≤ nc < 8:
            IF board[nr][nc] == 'B': BREAK   // blocked by bishop
            IF board[nr][nc] == 'p':
                captures ← captures + 1
                BREAK
            nr ← nr + dr; nc ← nc + dc
    RETURN captures
```

---

## 3. Examples

| board | captures |
|-------|----------|
| `[[".",".",".",".",".",".",".","."], [".",".",".","p",".",".",".","."], [".",".",".","R",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."]]` | 1 |
| `[[".",".",".",".",".",".",".","."], [".","p",".",".",".",".",".","."], [".",".",".","R",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."], [".",".",".",".",".",".",".","."]]` | 2 |

---

## 4. Walkthrough

For the first board example:
1. Locate `'R'` at (2,3).
2. Scan right: encounter `'.'` until board edge → no pawn.
3. Scan left: encounter `'.'` then `'p'` at (1,3) → capture count = 1, stop.
4. Scan up/down: only `'.'` → no captures.
Result = 1.

---

## 5. Complexity Analysis

- **Time:** O(1) – constant 8×8 board, four direction scans.
- **Space:** O(1) – only a few integer variables.

---

## 6. Follow‑Up Questions

- How would you modify the algorithm for an N×N board?
- What if there were multiple rooks?
- Could you extend it to handle queens with diagonal moves?

---

## Key Takeaway

> Simple simulation: scan in 4 directions from the rook, stop at the first piece encountered. Board is fixed size, so everything is O(1).
