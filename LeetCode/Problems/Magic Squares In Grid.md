# 840. Magic Squares In Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/magic-squares-in-grid](https://leetcode.com/problems/magic-squares-in-grid)
**Companies:** Amazon, Bloomberg, Google, Infosys, Microsoft

---

## 1. Problem Description

Count the number of 3×3 sub-grids that form a magic square. A 3×3 magic square contains all distinct numbers from 1 to 9 and each row, column, and both diagonals sum to 15.

---

## 2. Approach: Brute Force Check — O(m·n) ✅

```text
FUNCTION numMagicSquaresInside(grid):
    m ← NUMBER OF ROWS(grid)
    n ← NUMBER OF COLUMNS(grid)
    count ← 0
    FOR r ← 0 TO m-3:
        FOR c ← 0 TO n-3:
            IF isMagic(grid, r, c):
                count ← count + 1
    RETURN count

FUNCTION isMagic(grid, r, c):
    // Verify values are 1‑9 and distinct
    vals ← SET()
    FOR i ← r TO r+2:
        FOR j ← c TO c+2:
            v ← grid[i][j]
            IF v < 1 OR v > 9: RETURN FALSE
            IF v IN vals: RETURN FALSE
            ADD v TO vals
    // Center must be 5 for a 3×3 magic square
    IF grid[r+1][c+1] ≠ 5: RETURN FALSE
    // Check sums of rows, columns, and diagonals
    FOR i ← 0 TO 2:
        IF SUM(grid[r+i][c..c+2]) ≠ 15: RETURN FALSE
        IF SUM([grid[r..r+2][c+i]]) ≠ 15: RETURN FALSE
    IF (grid[r][c] + grid[r+1][c+1] + grid[r+2][c+2]) ≠ 15: RETURN FALSE
    IF (grid[r][c+2] + grid[r+1][c+1] + grid[r+2][c]) ≠ 15: RETURN FALSE
    RETURN TRUE
```

| Time | Space |
|------|-------|
| O(m·n) | O(1) |

---

## 3. Examples

**Example 1:**
```
Input: grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
Output: 1
Explanation: The 3×3 sub-grid starting at (0,0) is a magic square.
```

**Example 2:**
```
Input: grid = [[8,1,6],[3,5,7],[4,9,2]]
Output: 1
Explanation: The whole grid itself is a 3×3 magic square.
```

---

## 4. Walkthrough

| Step | Sub‑grid Top‑Left | Action |
|------|------------------|--------|
| 1 | (0,0) | Check all 9 values are 1‑9 and distinct; center is 5.
| 2 | (0,0) | Verify each row, column, and diagonal sums to 15 → passes.
| 3 | (0,1) | Values out of range or duplicate → fails.
| … | … | Continue scanning all positions; only the first sub‑grid succeeds.

---

## 5. Complexity Analysis

- **Time Complexity:** O(m·n) – each possible 3×3 window is examined in constant time.
- **Space Complexity:** O(1) – only a few integer variables and a small set of at most 9 elements are used.

---

## Key Takeaway

> For a 3×3 magic square, the center must be 5 and the numbers 1‑9 must be distinct; checking these conditions plus the eight sums yields an O(m·n) solution.
