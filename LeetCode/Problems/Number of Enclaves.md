# 1020. Number of Enclaves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-enclaves](https://leetcode.com/problems/number-of-enclaves)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Border DFS + Count — O(m·n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Count the number of land cells (`1`s) that cannot reach the border (enclosed land cells).

---

## 2. Key Insight

> Flood fill from all border land cells to remove reachable land. Remaining `1`s are enclaves.

---

## 3. Approach: Border DFS + Count — O(m·n) ✅

```text
FUNCTION numEnclaves(grid):
    SET rows ← LENGTH(grid)
    SET cols ← LENGTH(grid[0])
    // Helper DFS to mark border‑connected land as visited (set to 0)
    FUNCTION dfs(r, c):
        IF r < 0 OR r ≥ rows OR c < 0 OR c ≥ cols OR grid[r][c] = 0:
            RETURN
        SET grid[r][c] ← 0
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    // Start DFS from all border cells
    FOR r ← 0 TO rows-1:
        IF grid[r][0] = 1: dfs(r,0)
        IF grid[r][cols-1] = 1: dfs(r,cols-1)
    FOR c ← 0 TO cols-1:
        IF grid[0][c] = 1: dfs(0,c)
        IF grid[rows-1][c] = 1: dfs(rows-1,c)

    // Count remaining land cells
    SET enclaveCount ← 0
    FOR r ← 0 TO rows-1:
        FOR c ← 0 TO cols-1:
            IF grid[r][c] = 1:
                INCREMENT enclaveCount BY 1
    RETURN enclaveCount
```

---

## 4. Examples

| grid | Output | Explanation |
|------|--------|-------------|
| `[[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]` | 3 | The three `1`s in the middle cannot reach the border. |
| `[[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]` | 0 | All land cells are connected to the border, so no enclaves.

---

## 5. Walkthrough

Take the first example grid.

1. **Border DFS** visits cells `(1,0)`, `(1,3)`, `(0,*)`, `(*,0)`, etc., marking reachable land as `0`.
2. After flood fill, the grid becomes `[[0,0,0,0],[0,0,0,0],[0,1,1,0],[0,0,0,0]]`.
3. **Counting** iterates over the grid and finds three `1`s remaining, which are the enclaves.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n) |
| **Space** | O(m·n) — recursion stack (or O(m·n) for an explicit stack) |

---

## 7. Follow-Up Questions

1. How would you implement the flood fill iteratively to avoid recursion depth limits?
2. Can the algorithm be adapted to count the size of each enclave separately?
3. What changes are needed if diagonal connections also count as adjacency?

---

## 8. Key Takeaway

> **Eliminate border‑connected land, then count the remainder.** Flood‑fill from the edges turns the problem into a simple counting task.
