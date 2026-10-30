# 3552. Grid Teleportation Traversal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/grid-teleportation-traversal](https://leetcode.com/problems/grid-teleportation-traversal)
**Companies:** Amazon, Meta, Visa
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: 0-1 BFS ✅](#3-approach-0-1-bfs-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given a 2D character grid `matrix` of size `m x n`, represented as an array of strings, where `matrix[i][j]` represents the cell at the intersection of the `i`th row and `j`th column. Each cell is one of the following:

- `'.'` representing an empty cell.
- `'#'` representing an obstacle.
- An uppercase letter (`'A'`-`'Z'`) representing a teleportation portal.

You start at the top-left cell `(0, 0)`, and your goal is to reach the bottom-right cell `(m - 1, n - 1)`. You can move from the current cell to any adjacent cell (up, down, left, right) as long as the destination cell is within the grid bounds and is not an obstacle.

If you step on a cell containing a portal letter and you haven't used that portal letter before, you may instantly teleport to any other cell in the grid with the same letter. This teleportation does not count as a move, but each portal letter can be used **at most** once during your journey.

Return the **minimum** number of moves required to reach the bottom-right cell. If it is not possible to reach the destination, return `-1`.

**Constraints:**
- `1 <= m == matrix.length <= 10^3`
- `1 <= n == matrix[i].length <= 10^3`
- `matrix[i][j]` is either `'#'`, `'.'`, or an uppercase English letter.
- `matrix[0][0]` is not an obstacle.

---

## 2. Key Insight

> Model the grid as a graph: edges to the four neighbours have weight 1, edges between cells with the same letter have weight 0. A 0‑1 BFS (deque) yields the optimal distance.

---

## 3. Approach: 0-1 BFS ✅

```text
FUNCTION gridTeleportation(grid):
    rows ← number of rows in grid
    cols ← number of columns in grid
    // Group cells by their letter
    letterGroups ← MAP from char → LIST of (r,c)
    FOR r FROM 0 TO rows-1:
        FOR c FROM 0 TO cols-1:
            letterGroups[grid[r][c]].ADD((r,c))

    dist ← MATRIX rows×cols initialized to INFINITY
    deque ← DEQUE()
    dist[0][0] ← 0
    deque.PUSH_FRONT((0,0))

    WHILE deque NOT EMPTY:
        (r,c) ← deque.POP_FRONT()
        cur ← dist[r][c]
        // 0‑cost teleport edges
        FOR (tr,tc) IN letterGroups[grid[r][c]]:
            IF dist[tr][tc] > cur:
                dist[tr][tc] ← cur
                deque.PUSH_FRONT((tr,tc))
        // Clear group to avoid revisiting
        letterGroups[grid[r][c]].CLEAR()
        // 1‑cost adjacent moves
        FOR (dr,dc) IN [(1,0),(-1,0),(0,1),(0,-1)]:
            nr ← r + dr
            nc ← c + dc
            IF 0 ≤ nr < rows AND 0 ≤ nc < cols:
                IF dist[nr][nc] > cur + 1:
                    dist[nr][nc] ← cur + 1
                    deque.PUSH_BACK((nr,nc))

    RETURN dist[rows-1][cols-1]
```

---

## 4. Examples

```
Example 1:
  Input: matrix = ["A..",".A.","..."]
  Output: 2
  Explanation:
  - Before the first move, teleport from (0, 0) to (1, 1).
  - In the first move, move from (1, 1) to (1, 2).
  - In the second move, move from (1, 2) to (2, 2).
```
```
Example 2:
  Input: matrix = [".#...",".#.#.",".#.#.","...#."]
  Output: 13
  Explanation: There are no portals; the only path goes down the first column, along the bottom row to
  column 2, up column 2, along the top row to column 4, and down column 4 (13 moves).

    . # . . .
    . # . # .
    . # . # .
    . . . # .
```

---

## 5. Walkthrough

1. Start at (0,0) with distance 0.
2. Teleport to all other "a" cells (if any) at cost 0 and push them to the front of the deque.
3. Pop the next cell; explore its neighbours with cost 1, pushing them to the back.
4. Repeat until the bottom‑right cell is dequeued; its distance is the answer.

---

## 6. Complexity Analysis

- **Time:** O(R·C) – each cell is processed once; teleport edges are considered only the first time a letter is visited.
- **Space:** O(R·C) for the distance matrix and the letter groups.

---

## 7. Follow-Up Questions

1. How would the solution change if teleportation had a cost of k instead of 0?
2. Can the algorithm be adapted for weighted edges between adjacent cells?
3. What if teleportation is allowed only a limited number of times?

---

## 8. Key Takeaway

> Model free teleportation as 0‑weight edges and use **0‑1 BFS** with a deque to obtain the shortest path in linear time.
