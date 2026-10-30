# 999. Available Captures for Rook

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/available-captures-for-rook](https://leetcode.com/problems/available-captures-for-rook)
**Companies:** Google, Square

---

## 1. Problem Description

You are given an `8 x 8` **matrix** representing a chessboard. There is **exactly one** white rook represented by `'R'`, some number of white bishops `'B'`, and some number of black pawns `'p'`. Empty squares are represented by `'.'`.

A rook can move any number of squares horizontally or vertically (up, down, left, right) until it reaches another piece *or* the edge of the board. A rook is **attacking** a pawn if it can move to the pawn's square in one move.

Note: A rook cannot move through other pieces, such as bishops or pawns. This means a rook cannot attack a pawn if there is another piece blocking the path.

Return the **number of pawns** the white rook is **attacking**.

**Constraints:**
- `board.length == 8`
- `board[i].length == 8`
- `board[i][j]` is either `'R'`, `'.'`, `'B'`, or `'p'`
- There is exactly one cell with `board[i][j] == 'R'`

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

```
Example 1:
  Input: board = [[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","R",".",".",".","p"],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]
  Output: 3
  Explanation: In this example, the rook is attacking all the pawns.

Example 2:
  Input: board = [[".",".",".",".",".",".","."],[".","p","p","p","p","p",".","."],[".","p","p","B","p","p",".","."],[".","p","B","R","B","p",".","."],[".","p","p","B","p","p",".","."],[".","p","p","p","p","p",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]
  Output: 0
  Explanation: The bishops are blocking the rook from attacking any of the pawns.

Example 3:
  Input: board = [[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","p",".",".",".","."],["p","p",".","R",".","p","B","."],[".",".",".",".",".",".",".","."],[".",".",".","B",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."]]
  Output: 3
  Explanation: The rook is attacking the pawns at positions b5, d6, and f5.
```

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
