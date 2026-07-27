# 999. Available Captures for Rook

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/available-captures-for-rook](https://leetcode.com/problems/available-captures-for-rook)
**Companies:** Google, Square

---

## 1. Problem Description

Given an 8×8 chessboard with one white rook `'R'`, bishops `'B'`, and black pawns `'p'`, return the number of pawns the rook can **capture** (moving horizontally/vertically, blocked by bishops).

---

## 2. Approach: Four-Direction Scan — O(1) ✅

```
FUNCTION numRookCaptures(board):
    // Find the rook
    FOR r, c IN all cells:
        IF board[r][c] == 'R': break
    
    count = 0
    FOR dr, dc IN [(0,1),(0,-1),(1,0),(-1,0)]:
        nr, nc = r + dr, c + dc
        WHILE 0 ≤ nr < 8 AND 0 ≤ nc < 8:
            IF board[nr][nc] == 'B': BREAK    // blocked
            IF board[nr][nc] == 'p': count += 1; BREAK
            nr += dr; nc += dc
    RETURN count
```

| Time | Space |
|------|-------|
| O(1) — board is 8×8 | O(1) |

---

## Key Takeaway

> Simple simulation: scan in 4 directions from the rook, stop at first piece encountered. Board is fixed size, so everything is O(1).
