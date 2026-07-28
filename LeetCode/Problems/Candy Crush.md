# 723. Candy Crush

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/candy-crush](https://leetcode.com/problems/candy-crush)
**Companies:** Bloomberg, Braze, Capital One, Google, Meta, Pinterest, Roblox, Rubrik, Tiktok, Uber, Visa

---

## Problem Description
Given an `m x n` board of integers representing candy types, repeatedly crush any group of three or more identical candies that are adjacent horizontally or vertically. After crushing, candies above fall down to fill empty spaces, and empty cells are filled with zeros. Continue until no more crushes are possible and return the final board state.

## Examples
- Input:
  ```
  board = [[110,5,112,113,114],
           [210,211,5,213,214],
           [310,311,3,313,314],
           [410,411,412,5,414],
           [5,1,512,3,3],
           [610,4,1,613,614],
           [710,1,2,713,714],
           [810,1,2,1,1],
           [1,1,2,2,2],
           [4,1,4,4,1014]]
  ```
  Output: Final board after all possible crushes (example omitted for brevity).
- Input: `board = [[1,1,1],[2,2,2],[3,3,3]]` → all rows crush, board becomes all zeros.

## Approach: Simulation with Mark‑and‑Crush — O((m·n)²) ✅

```text
FUNCTION candyCrush(board):
    m ← LENGTH(board)
    n ← LENGTH(board[0])
    WHILE true:
        toCrush ← SET()
        // Mark horizontal triples
        FOR r FROM 0 TO m-1:
            FOR c FROM 0 TO n-3:
                val ← board[r][c]
                IF val != 0 AND val == board[r][c+1] AND val == board[r][c+2]:
                    toCrush.ADD((r,c))
                    toCrush.ADD((r,c+1))
                    toCrush.ADD((r,c+2))
        // Mark vertical triples
        FOR c FROM 0 TO n-1:
            FOR r FROM 0 TO m-3:
                val ← board[r][c]
                IF val != 0 AND val == board[r+1][c] AND val == board[r+2][c]:
                    toCrush.ADD((r,c))
                    toCrush.ADD((r+1,c))
                    toCrush.ADD((r+2,c))
        IF toCrush IS EMPTY:
            BREAK
        // Crush marked cells
        FOR (r,c) IN toCrush:
            board[r][c] ← 0
        // Apply gravity column by column
        FOR c FROM 0 TO n-1:
            writeRow ← m-1
            FOR r FROM m-1 DOWNTO 0:
                IF board[r][c] != 0:
                    board[writeRow][c] ← board[r][c]
                    writeRow ← writeRow - 1
            // Fill remaining cells with 0
            FOR r FROM writeRow DOWNTO 0:
                board[r][c] ← 0
    RETURN board
```

## Walkthrough (simple 3x3 example)
1. Initial board `[[1,1,1],[2,2,2],[3,3,3]]`.
2. Mark all cells (each row forms a horizontal triple).
3. Set all marked cells to `0` → board becomes all zeros.
4. Gravity step does nothing; loop ends.

## Complexity Analysis
- **Time:** Each iteration scans the board O(m·n) and may repeat up to O(m·n) times in worst case, yielding O((m·n)²).
- **Space:** O(m·n) for the `toCrush` set.

## Follow‑Up Questions
1. How can the algorithm be optimized to run in O(m·n) using a queue of affected cells?
2. Can you extend the solution to handle larger crush thresholds (e.g., 4 or more) without changing complexity?
3. What data structures would allow in‑place marking without extra memory?

## Key Takeaway
Repeatedly marking and crushing groups, then applying gravity, simulates the Candy Crush mechanics until a stable board is reached.
