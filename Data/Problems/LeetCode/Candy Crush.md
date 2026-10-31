# 723. Candy Crush

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/candy-crush](https://leetcode.com/problems/candy-crush)
**Companies:** Bloomberg, Braze, Capital One, Google, Meta, Pinterest, Roblox, Rubrik, Tiktok, Uber, Visa

---

## Problem Description
This question is about implementing a basic elimination algorithm for Candy Crush.

Given an `m x n` integer array `board` representing the grid of candy where `board[i][j]` represents the type of candy. A value of `board[i][j] == 0` represents that the cell is empty.

The given board represents the state of the game following the player's move. Now, you need to restore the board to a *stable state* by crushing candies according to the following rules:

- If three or more candies of the same type are adjacent vertically or horizontally, crush them all at the same time - these positions become empty.
- After crushing all candies simultaneously, if an empty space on the board has candies on top of itself, then these candies will drop until they hit a candy or bottom at the same time. No new candies will drop outside the top boundary.
- After the above steps, there may exist more candies that can be crushed. If so, you need to repeat the above steps.
- If there does not exist more candies that can be crushed (i.e., the board is stable), then return the current board.

You need to perform the above rules until the board becomes stable, then return *the stable board*.

**Constraints:**
- `m == board.length`
- `n == board[i].length`
- `3 <= m, n <= 50`
- `1 <= board[i][j] <= 2000`

## Examples
```
Example 1:
  Input: board = [[110,5,112,113,114],[210,211,5,213,214],[310,311,3,313,314],[410,411,412,5,414],[5,1,512,3,3],[610,4,1,613,614],[710,1,2,713,714],[810,1,2,1,1],[1,1,2,2,2],[4,1,4,4,1014]]
  Output: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[110,0,0,0,114],[210,0,0,0,214],[310,0,0,113,314],[410,0,0,213,414],[610,211,112,313,614],[710,311,412,613,714],[810,411,512,713,1014]]
```

```
Example 2:
  Input: board = [[1,3,5,5,2],[3,4,3,3,1],[3,2,4,5,2],[2,4,4,5,5],[1,4,4,1,1]]
  Output: [[1,3,0,0,0],[3,4,0,5,2],[3,2,0,3,1],[2,4,0,5,2],[1,4,3,1,1]]
```

## Approach: Simulation with Mark-and-Crush — O((m·n)²) ✅

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

## Follow-Up Questions
1. How can the algorithm be optimized to run in O(m·n) using a queue of affected cells?
2. Can you extend the solution to handle larger crush thresholds (e.g., 4 or more) without changing complexity?
3. What data structures would allow in-place marking without extra memory?

## Key Takeaway
Repeatedly marking and crushing groups, then applying gravity, simulates the Candy Crush mechanics until a stable board is reached.
