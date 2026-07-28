# 1895. Largest Magic Square

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-magic-square](https://leetcode.com/problems/largest-magic-square)
**Companies:** Amazon, Google, Wayfair

---

## 1. Problem Description

Find the largest `k × k` subgrid that is a **magic square** (all rows, columns, and both diagonals sum to the same value).

---

## 2. Examples

**Example 1:**
```
Input: grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
Output: 3
Explanation: The 3×3 subgrid starting at (0,0) is a magic square.
```

**Example 2:**
```
Input: grid = [[5,1,3],[1,5,1],[3,1,5]]
Output: 3
Explanation: The whole grid is a magic square.
```

---

## 3. Approach: Prefix Sums + Brute Force — O(m·n·min(m,n)²) ✅

```text
FUNCTION largestMagicSquare(grid):
    m ← NUMBER OF ROWS(grid)
    n ← NUMBER OF COLUMNS(grid)
    // Precompute prefix sums for rows and columns
    rowPre ← MATRIX(m, n+1) FILLED WITH 0
    colPre ← MATRIX(m+1, n) FILLED WITH 0
    FOR i ← 0 TO m-1:
        FOR j ← 0 TO n-1:
            rowPre[i][j+1] ← rowPre[i][j] + grid[i][j]
            colPre[i+1][j] ← colPre[i][j] + grid[i][j]

    FOR k ← MIN(m, n) DOWN TO 2:
        FOR r ← 0 TO m - k:
            FOR c ← 0 TO n - k:
                target ← rowSum(r, c, k)
                IF allRowsColsDiagsEqual(grid, r, c, k, target):
                    RETURN k
    RETURN 1

FUNCTION rowSum(r, c, k):
    RETURN rowPre[r][c+k] - rowPre[r][c]

FUNCTION colSum(r, c, k):
    RETURN colPre[r+k][c] - colPre[r][c]

FUNCTION allRowsColsDiagsEqual(grid, r, c, k, target):
    // check rows
    FOR i ← r TO r + k - 1:
        IF rowSum(i, c, k) != target: RETURN FALSE
    // check columns
    FOR j ← c TO c + k - 1:
        IF colSum(r, j, k) != target: RETURN FALSE
    // main diagonal
    diag1 ← 0
    FOR d ← 0 TO k-1:
        diag1 ← diag1 + grid[r+d][c+d]
    IF diag1 != target: RETURN FALSE
    // anti‑diagonal
    diag2 ← 0
    FOR d ← 0 TO k-1:
        diag2 ← diag2 + grid[r+d][c+k-1-d]
    IF diag2 != target: RETURN FALSE
    RETURN TRUE
```

---

## 4. Walkthrough

Take the first example grid. The algorithm starts with `k = 4` (the smaller dimension) and checks every 4×4 subgrid – none satisfy the magic‑square condition. It then tries `k = 3`. For the subgrid with top‑left corner `(0,0)`, row sums are `12,8,12`; column sums are `10,7,15`; they do not match, so it moves on. When it reaches the subgrid starting at `(0,1)`, all three rows, three columns, and both diagonals sum to `12`, so the function returns `3`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(m·n·min(m,n)²) – brute‑force over all sizes and positions with O(1) sum queries | O(m·n) for prefix‑sum tables |

---

## 6. Follow‑Up Questions

* How would you modify the algorithm to return the coordinates of the largest magic square?
* Can you improve the time complexity using more advanced mathematical properties of magic squares?
* How would you handle non‑square grids where the number of rows differs from columns?

---

## Key Takeaway

> Prefix sums give O(1) row/column sum queries; checking subgrids from largest to smallest yields the size of the biggest magic square efficiently.
