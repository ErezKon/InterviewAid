# 289. Game of Life

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/game-of-life](https://leetcode.com/problems/game-of-life)
**Companies:** Acorns, Adobe, Amazon, Anduril, Applied Intuition, Bloomberg, Dropbox, Goldman Sachs, Google, Meta, Microsoft, Riot Games, Salesforce, Snapchat, Two Sigma, Warnermedia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: In-Place with State Encoding — O(m·n) ✅](#3-approach-in-place-with-state-encoding--omn-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

According to Wikipedia's article: "The **Game of Life**, also known simply as **Life**, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

The board is made up of an `m x n` grid of cells, where each cell has an initial state: **live** (represented by a `1`) or **dead** (represented by a `0`). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

- Any live cell with fewer than two live neighbors dies as if caused by under-population.
- Any live cell with two or three live neighbors lives on to the next generation.
- Any live cell with more than three live neighbors dies, as if by over-population.
- Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The next state of the board is determined by applying the above rules simultaneously to every cell in the current state of the `m x n` grid `board`. In this process, births and deaths occur **simultaneously**.

Given the current state of the `board`, **update** the `board` to reflect its next state.

**Note** that you do not need to return anything.

**Follow up:**

- Could you solve it in-place? Remember that the board needs to be updated simultaneously: You cannot update some cells first and then use their updated values to update other cells.
- In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches upon the border of the array (i.e., live cells reach the border). How would you address these problems?

**Constraints:**
- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 25`
- `board[i][j]` is `0` or `1`.

## 2. Examples

**Example 1:**
```
Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
```

**Example 2:**
```
Input: board = [[1,1],[1,0]]
Output: [[1,1],[1,1]]
```

## 3. Walkthrough

**Example 1:**
1. Encode current states using two bits (0=dead→dead, 1=live→dead, 2=dead→live, 3=live→live).
2. For each cell count live neighbors by checking `val & 1` of adjacent cells.
3. Apply Game of Life rules, writing the next state into the second bit.
4. After the first pass, shift each cell right (`>>= 1`) to make the next state the current state.

**Result:** The board transforms to the output shown above.

---

## 3. Approach: In-Place with State Encoding — O(m·n) ✅

```
FUNCTION gameOfLife(board):
    // States: 0=dead→dead, 1=live→dead, 2=dead→live, 3=live→live

    FOR r, c in all cells:
        liveNeighbors = count neighbors where val & 1 == 1

        IF board[r][c] == 1:    // currently alive
            IF liveNeighbors == 2 OR liveNeighbors == 3:
                board[r][c] = 3    // stays alive
        ELSE:                    // currently dead
            IF liveNeighbors == 3:
                board[r][c] = 2    // becomes alive

    // Extract new state
    FOR r, c in all cells:
        board[r][c] >>= 1
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n) |
| **Space** | O(1) — in-place |

---

## 5. Key Takeaway

> **Bit encoding** `(current | next << 1)` enables in-place simultaneous update. Read current with `& 1`, extract next with `>> 1`.
