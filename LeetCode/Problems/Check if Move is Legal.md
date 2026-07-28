# 1958. Check if Move is Legal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-move-is-legal](https://leetcode.com/problems/check-if-move-is-legal)
**Companies:** Amazon

---

## 1. Problem Description

Given an 8×8 board with `'B'` (black), `'W'` (white), and `'.'` (empty), and a move at `(rMove, cMove)` with color, check if the move is **legal** in Reversi/Othello — i.e., placing the piece creates at least one "good line" (3+ cells in a direction: your color, one or more opponent, your color).

---

## 2. Examples

**Example 1:**
```
board = [
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', 'B', 'W', '.', '.', '.'],
  ['.', '.', '.', 'W', 'B', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ... (remaining rows omitted for brevity)
]
rMove = 2, cMove = 3, color = 'B'
Output: true
```
*Explanation:* Placing a black piece at (2,3) flips the white piece at (1,3) vertically.

**Example 2:**
```
board = [
  ['.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', 'W', 'W', 'W', '.', '.', '.', '.'],
  ['.', 'W', 'B', 'W', '.', '.', '.', '.'],
  ['.', 'W', 'W', 'W', '.', '.', '.', '.'],
  ...
]
rMove = 0, cMove = 0, color = 'B'
Output: false
```
*Explanation:* No direction creates a line bounded by black pieces.

---

## 3. Approach: Check All 8 Directions — O(1) ✅

```text
FUNCTION checkMove(board, rMove, cMove, color):
    dirs ← [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
    FOR dr, dc IN dirs:
        r ← rMove + dr
        c ← cMove + dc
        count ← 0
        WHILE 0 ≤ r < 8 AND 0 ≤ c < 8 AND board[r][c] ≠ '.' AND board[r][c] ≠ color:
            r ← r + dr
            c ← c + dc
            count ← count + 1
        IF count > 0 AND 0 ≤ r < 8 AND 0 ≤ c < 8 AND board[r][c] = color:
            RETURN true
    RETURN false
```

---

## 4. Walkthrough

Consider **Example 1** above.
| Step | Direction | Cells examined | Result |
|------|-----------|----------------|--------|
| 1 | Up‑Right (‑1,+1) | (1,4) = 'W' (opponent) → (0,5) = '.' (empty) | No flip |
| 2 | Up (‑1,0) | (1,3) = 'W' → (0,3) = '.' | No flip |
| 3 | Up‑Left (‑1,‑1) | (1,2) = '.' | No flip |
| 4 | Left (0,‑1) | (2,2) = 'W' → (2,1) = '.' | No flip |
| 5 | Right (0,+1) | (2,4) = '.' | No flip |
| 6 | Down‑Left (+1,‑1) | (3,2) = '.' | No flip |
| 7 | Down (+1,0) | (3,3) = '.' | No flip |
| 8 | Down‑Right (+1,+1) | (3,4) = '.' | No flip |
Only the **Up** direction finds a sequence `B → W → B`, satisfying the rule, so the function returns **true**.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(1) — constant 8 directions, each at most 7 steps | O(1) |

---

## 6. Follow‑Up Questions

1. How would you modify the algorithm to return the list of flipped positions?
2. Can you extend the solution to support boards of arbitrary size `n × n`?
3. How would you efficiently update the board after a legal move without re‑scanning all directions?

---

## Key Takeaway

> For each of 8 directions, walk through opponent pieces until you hit your own color or boundary. A valid line needs ≥1 opponent piece between two of your pieces.
