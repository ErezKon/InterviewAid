# 3240. Minimum Number of Flips to Make Binary Grid Palindromic II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-flips-to-make-binary-grid-palindromic-ii](https://leetcode.com/problems/minimum-number-of-flips-to-make-binary-grid-palindromic-ii)
**Companies:** Google

---

## Problem Description

Given an `m × n` binary grid, you may flip any cell (change `0` to `1` or `1` to `0`). A grid is *palindromic* if each row reads the same forwards and backwards and each column reads the same top‑to‑bottom and bottom‑to‑top. Return the minimum number of flips required to make the grid palindromic.

---

## Examples

**Example 1:**
```
Input: grid = [[0,1,0],[1,0,1],[0,1,0]]
Output: 0
Explanation: The grid is already palindromic in both rows and columns.
```

**Example 2:**
```
Input: grid = [[0,0,1],[1,0,0],[0,1,1]]
Output: 2
Explanation: Flip cells (0,2) and (2,0) to obtain a palindromic grid.
```

---

## Approach

**Greedy – O(m·n)**

Each cell belongs to a group of up to four symmetric positions: `(i,j)`, `(i,n‑1‑j)`, `(m‑1‑i,j)`, `(m‑1‑i,n‑1‑j)`. All cells in a group must share the same value. The cheapest way is to flip the minority bits in the group.

```text
FUNCTION minFlips(grid):
    m ← ROW_COUNT(grid)
    n ← COL_COUNT(grid)
    flips ← 0
    FOR i ← 0 TO FLOOR((m-1)/2) DO
        FOR j ← 0 TO FLOOR((n-1)/2) DO
            // collect the four symmetric cells
            vals ← [grid[i][j], grid[i][n-1-j], grid[m-1-i][j], grid[m-1-i][n-1-j]]
            // count zeros and ones
            zeros ← COUNT(v IN vals WHERE v = 0)
            ones  ← COUNT(v IN vals WHERE v = 1)
            flips ← flips + MIN(zeros, ones)
    RETURN flips
```

---

## Walkthrough

Consider the grid from Example 2 (3×3). The symmetric groups are:
| Group cells | Values | Flips needed |
|-------------|--------|--------------|
| (0,0),(0,2),(2,0),(2,2) | 0,1,0,1 | 2 (flip two cells) |
| (0,1),(2,1) | 0,1 | 1 |
| (1,0),(1,2) | 1,0 | 1 |
Total flips = 2.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy scan | **O(m·n)** | **O(1)** |

---

## Follow-Up Questions

1. How would the algorithm change if flipping a cell also toggles its adjacent cells?
2. Can you extend the solution to return the list of flipped positions?
3. What is the complexity if the grid is extremely sparse and stored as a list of coordinates?

---

## Key Takeaway

Group symmetric cells and flip the minority bits in each group; summing these minimal flips yields the optimal answer.
