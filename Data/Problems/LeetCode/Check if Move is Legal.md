# 1958. Check if Move is Legal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-move-is-legal](https://leetcode.com/problems/check-if-move-is-legal)
**Companies:** Amazon

---

## 1. Problem Description

You are given a **0-indexed** `8 x 8` grid `board`, where `board[r][c]` represents the cell `(r, c)` on a game board. On the board, free cells are represented by `'.'`, white cells are represented by `'W'`, and black cells are represented by `'B'`.

Each move in this game consists of choosing a free cell and changing it to the color you are playing as (either white or black). However, a move is only **legal** if, after changing it, the cell becomes the **endpoint of a good line** (horizontal, vertical, or diagonal).

A **good line** is a line of **three or more cells (including the endpoints)** where the endpoints of the line are **one color**, and the remaining cells in the middle are the **opposite color** (no cells in the line are free).

Given two integers `rMove` and `cMove` and a character `color` representing the color you are playing as (white or black), return `true` *if changing cell* `(rMove, cMove)` *to color* `color` *is a **legal** move, or* `false` *if it is not legal*.

**Constraints:**
- `board.length == board[r].length == 8`
- `0 <= rMove, cMove < 8`
- `board[rMove][cMove] == '.'`
- `color` is either `'B'` or `'W'`.

---

## 2. Examples

```
Example 1:
  Input: board = [[".",".",".","B",".",".",".","."],
                  [".",".",".","W",".",".",".","."],
                  [".",".",".","W",".",".",".","."],
                  [".",".",".","W",".",".",".","."],
                  ["W","B","B",".","W","W","W","B"],
                  [".",".",".","B",".",".",".","."],
                  [".",".",".","B",".",".",".","."],
                  [".",".",".","W",".",".",".","."]],
         rMove = 4, cMove = 3, color = "B"
  Output: true
  Explanation: There are two good lines with the chosen cell (4,3) as an endpoint:
  upward (4,3)B-(3,3)W-(2,3)W-(1,3)W-(0,3)B and rightward (4,3)B-(4,4)W-(4,5)W-(4,6)W-(4,7)B.
```

```
Example 2:
  Input: board = [[".",".",".",".",".",".",".","."],
                  [".","B",".",".","W",".",".","."],
                  [".",".","W",".",".",".",".","."],
                  [".",".",".","W","B",".",".","."],
                  [".",".",".",".",".",".",".","."],
                  [".",".",".",".","B","W",".","."],
                  [".",".",".",".",".",".","W","."],
                  [".",".",".",".",".",".",".","B"]],
         rMove = 4, cMove = 4, color = "W"
  Output: false
  Explanation: While there are good lines with the chosen cell as a middle cell, there are no good lines with the chosen cell as an endpoint.
```

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

Consider **Example 1** above.
| Step | Direction | Cells examined | Result |
|------|-----------|----------------|--------|
| 1 | Up-Right (-1,+1) | (1,4) = 'W' (opponent) → (0,5) = '.' (empty) | No flip |
| 2 | Up (-1,0) | (1,3) = 'W' → (0,3) = '.' | No flip |
| 3 | Up-Left (-1,-1) | (1,2) = '.' | No flip |
| 4 | Left (0,-1) | (2,2) = 'W' → (2,1) = '.' | No flip |
| 5 | Right (0,+1) | (2,4) = '.' | No flip |
| 6 | Down-Left (+1,-1) | (3,2) = '.' | No flip |
| 7 | Down (+1,0) | (3,3) = '.' | No flip |
| 8 | Down-Right (+1,+1) | (3,4) = '.' | No flip |
Only the **Up** direction finds a sequence `B → W → B`, satisfying the rule, so the function returns **true**.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(1) — constant 8 directions, each at most 7 steps | O(1) |

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to return the list of flipped positions?
2. Can you extend the solution to support boards of arbitrary size `n × n`?
3. How would you efficiently update the board after a legal move without re-scanning all directions?

---

## Key Takeaway

> For each of 8 directions, walk through opponent pieces until you hit your own color or boundary. A valid line needs ≥1 opponent piece between two of your pieces.
