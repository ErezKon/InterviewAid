# 3552. Grid Teleportation Traversal

**Difficulty:** 🟡 Medium
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

Find the shortest path from the top‑left to the bottom‑right cell in a grid where moving to an adjacent cell costs 1, but you may teleport for free between any two cells that contain the same letter.

---

## 2. Key Insight

> Model the grid as a graph: edges to the four neighbours have weight 1, edges between cells with the same letter have weight 0. A 0‑1 BFS (deque) yields the optimal distance.

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

**Example 1:**
```
grid = [
  ["a","b","a"],
  ["c","a","d"],
  ["e","f","a"]
]
Output: 2
```
*Teleport from (0,0) to (0,2) for free, move down two steps to reach the target.

**Example 2:**
```
grid = [
  ["x","y"],
  ["y","x"]
]
Output: 1
```
*Teleport from start (0,0) to (1,1) directly because both contain "x".

---

## 5. Walkthrough

1. Start at (0,0) with distance 0.
2. Teleport to all other "a" cells (if any) at cost 0 and push them to the front of the deque.
3. Pop the next cell; explore its neighbours with cost 1, pushing them to the back.
4. Repeat until the bottom‑right cell is dequeued; its distance is the answer.

---

## 6. Complexity Analysis

- **Time:** O(R·C) – each cell is processed once; teleport edges are considered only the first time a letter is visited.
- **Space:** O(R·C) for the distance matrix and the letter groups.

---

## 7. Follow-Up Questions

1. How would the solution change if teleportation had a cost of k instead of 0?
2. Can the algorithm be adapted for weighted edges between adjacent cells?
3. What if teleportation is allowed only a limited number of times?

---

## 8. Key Takeaway

> Model free teleportation as 0‑weight edges and use **0‑1 BFS** with a deque to obtain the shortest path in linear time.
