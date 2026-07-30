# 1992. Find All Groups of Farmland

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-all-groups-of-farmland](https://leetcode.com/problems/find-all-groups-of-farmland)
**Companies:** Citrix, Google

---

## Problem Description

Given a binary matrix where `1` = farmland and `0` = forest, farmland groups are always **rectangles**. Return the top-left and bottom-right corners of each farmland group.

---

## Key Insight

> Since farmland groups are guaranteed to be rectangles, when you find a top-left corner (cell is `1`, with `0` or boundary above and to the left), expand right and down to find the bottom-right corner. Mark visited cells.

---

## Approach: Greedy Scan — O(m × n) ✅

```text
FUNCTION findFarmland(land):
    m, n ← dimensions of land
    result ← []
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            IF land[r][c] == 1:
                // Find bottom‑right corner of this rectangle
                r2, c2 ← r, c
                WHILE r2 + 1 < m AND land[r2 + 1][c] == 1:
                    r2 ← r2 + 1
                WHILE c2 + 1 < n AND land[r][c2 + 1] == 1:
                    c2 ← c2 + 1
                result.APPEND([r, c, r2, c2])
                // Mark the entire rectangle as visited
                FOR i ← r TO r2:
                    FOR j ← c TO c2:
                        land[i][j] ← 0
    RETURN result
```

---

## Examples

| Input matrix | Output (corners) |
|--------------|------------------|
| `[[1,0,0],[0,1,1],[0,1,1]]` | `[[0,0,0,0],[1,1,2,2]]` |
| `[[1,1,0],[1,1,0],[0,0,1]]` | `[[0,0,1,1],[2,2,2,2]]` |

---

## Walkthrough

Consider the first example matrix:

1. Start at `(0,0)`, it is `1` and has no `1` above or left → top‑left corner.
2. Expand down: `(1,0)` is `0`, stop. Expand right: `(0,1)` is `0`, stop. Bottom‑right is also `(0,0)`.
3. Mark `(0,0)` visited.
4. Continue scanning, next unvisited `1` at `(1,1)`. Expand down to `(2,1)`, right to `(1,2)` and `(2,2)`. Bottom‑right becomes `(2,2)`.
5. Record both rectangles and finish.

---

## Complexity Analysis

- **Time:** O(m × n) – each cell is visited at most once.
- **Space:** O(1) extra besides the output list.

---

## Key Takeaway

> **Rectangular groups simplify the problem: find top‑left corner, expand to bottom‑right, mark visited. No need for full BFS/DFS since shapes are rectangles.**