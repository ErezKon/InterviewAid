# 1139. Largest 1-Bordered Square

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-1-bordered-square](https://leetcode.com/problems/largest-1-bordered-square)
**Companies:** Amazon, Samsung, Uber, Zs Associates

---

## Problem Description

Given an `m × n` binary grid, return the area of the largest square whose border consists entirely of `1`s. The interior of the square may contain any values.

---

## Examples

| grid | Output |
|------|--------|
| `[[1,1,1],[1,0,1],[1,1,1]]` | 9 |
| `[[0,1,0],[1,1,1],[0,1,0]]` | 1 |
| `[[0,0,0],[0,0,0]]` | 0 |

*Explanation*: In the first grid the whole 3×3 square has a border of `1`s, area = 9.

---

## Approach

Prefix Sums — O(m·n·min(m,n)) ✅

Pre‑compute for each cell the number of consecutive `1`s to its left and above. For a candidate bottom‑right corner, a square of side `len` exists if the four edges each have at least `len` consecutive `1`s.

```text
FUNCTION largest1BorderedSquare(grid):
    m ← ROWS(grid); n ← COLS(grid)
    left ← MATRIX(m, n, 0); above ← MATRIX(m, n, 0)
    FOR r FROM 0 TO m-1:
        FOR c FROM 0 TO n-1:
            IF grid[r][c] == 1:
                left[r][c] ← 1 + (left[r][c-1] IF c>0 ELSE 0)
                above[r][c] ← 1 + (above[r-1][c] IF r>0 ELSE 0)
    FOR side FROM MIN(m,n) DOWNTO 1:
        FOR r FROM side-1 TO m-1:
            FOR c FROM side-1 TO n-1:
                IF left[r][c] >= side AND above[r][c] >= side AND
                   left[r-side+1][c] >= side AND above[r][c-side+1] >= side:
                    RETURN side * side
    RETURN 0
```

---

## Walkthrough

Grid:
```
1 1 1
1 0 1
1 1 1
```
1. Compute `left` and `above` matrices.
2. Start with `side = 3`. Bottom‑right at (2,2) has `left=3`, `above=3`, top edge `left[0][2]=3`, left edge `above[2][0]=3` → valid → return `9`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(m·n·min(m,n)) | O(m·n) |

---

## Follow‑Up Questions

1. How would you adapt the algorithm for a grid with characters where the border must be a specific character?
2. Can you improve the time complexity using binary search on side length?
3. What if the interior also must be all `1`s?

---

## Key Takeaway

> Pre‑computing runs of consecutive `1`s in two directions lets us verify any square border in O(1). Searching side lengths from large to small yields early termination.
