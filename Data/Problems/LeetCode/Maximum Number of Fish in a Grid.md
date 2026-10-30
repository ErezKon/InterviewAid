# 2658. Maximum Number of Fish in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-fish-in-a-grid](https://leetcode.com/problems/maximum-number-of-fish-in-a-grid)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** 2D matrix `grid` of size `m x n`, where `(r, c)` represents:

- A **land** cell if `grid[r][c] = 0`, or
- A **water** cell containing `grid[r][c]` fish, if `grid[r][c] > 0`.

A fisher can start at any **water** cell `(r, c)` and can do the following operations any number of times:

- Catch all the fish at cell `(r, c)`, or
- Move to any adjacent **water** cell.

Return *the **maximum** number of fish the fisher can catch if he chooses his starting cell optimally, or* `0` *if no water cell exists.*

An **adjacent** cell of the cell `(r, c)`, is one of the cells `(r, c + 1)`, `(r, c - 1)`, `(r + 1, c)` or `(r - 1, c)` if it exists.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 10`
- `0 <= grid[i][j] <= 10`

---

## Examples

```
Example 1:
  Input: grid = [[0,2,1,0],
                 [4,0,0,3],
                 [1,0,0,4],
                 [0,3,2,0]]
  Output: 7
  Explanation: The fisher can start at cell (1,3) and collect 3 fish, then move to cell (2,3) and collect 4 fish.
```

```
Example 2:
  Input: grid = [[1,0,0,0],
                 [0,0,0,0],
                 [0,0,0,0],
                 [0,0,0,1]]
  Output: 1
  Explanation: The fisher can start at cells (0,0) or (3,3) and collect a single fish.
```

---

## Key Insight

> This is **connected component sum** on a grid. Use DFS/BFS from each unvisited water cell, sum up fish in the component, and track the maximum.

---

## Approach

```
FUNCTION findMaxFish(grid)
    m, n ← dimensions
    maxFish ← 0

    FUNCTION dfs(r, c)
        IF r < 0 OR r ≥ m OR c < 0 OR c ≥ n OR grid[r][c] = 0 THEN
            RETURN 0
        fish ← grid[r][c]
        grid[r][c] ← 0   // mark visited

        FOR each (nr, nc) IN [(r-1,c),(r+1,c),(r,c-1),(r,c+1)] DO
            fish ← fish + dfs(nr, nc)
        RETURN fish

    FOR each (r, c) where grid[r][c] > 0 DO
        maxFish ← MAX(maxFish, dfs(r, c))

    RETURN maxFish
END FUNCTION
```

---

## Walkthrough

```
grid = [[0,2,1,0],
        [4,0,0,3],
        [1,0,0,4],
        [0,3,2,0]]
```

Connected components (water cells):
- {(0,1),(0,2)}: 2+1 = 3
- {(1,0),(2,0)}: 4+1 = 5
- {(1,3),(2,3)}: 3+4 = **7**
- {(3,1),(3,2)}: 3+2 = 5

**Result: 7** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(m × n)** — each cell visited once |
| Space  | **O(m × n)** — recursion stack in worst case |

---

## Follow-Up Questions

1. **DFS vs BFS?**
   Both work. BFS avoids stack overflow on large grids; DFS is simpler to implement.

2. **How is this different from Number of Islands?**
   Number of Islands counts components; this sums values within each component.

3. **What if diagonal movement were allowed?**
   Add 4 more directions to the neighbor list (8-connected).

---

## Key Takeaway

> **Grid DFS for connected component sums** — same pattern as Number of Islands but accumulate values instead of just counting. Mark visited by zeroing out.
