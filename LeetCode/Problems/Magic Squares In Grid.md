# 840. Magic Squares In Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/magic-squares-in-grid](https://leetcode.com/problems/magic-squares-in-grid)
**Companies:** Amazon, Bloomberg, Google, Infosys, Microsoft

---

## 1. Problem Description

Count 3×3 magic squares (distinct values 1-9, rows/cols/diags all sum to 15) in a grid.

---

## 2. Approach: Brute Force Check — O(m·n) ✅

```
FUNCTION numMagicSquaresInside(grid):
    count = 0
    FOR r ← 0 TO m - 3:
        FOR c ← 0 TO n - 3:
            IF isMagic(grid, r, c): count += 1
    RETURN count

FUNCTION isMagic(grid, r, c):
    vals = set()
    FOR i ← r TO r + 2:
        FOR j ← c TO c + 2:
            IF grid[i][j] < 1 OR grid[i][j] > 9: RETURN false
            vals.ADD(grid[i][j])
    IF len(vals) != 9: RETURN false
    // Check all rows, cols, diags sum to 15
    ...
```

| Time | Space |
|------|-------|
| O(m · n) | O(1) |

---

## 3. Key Takeaway

> For 3×3 magic squares with 1-9: must have all distinct values 1-9 and center must be 5. Check all 8 sums (3 rows, 3 cols, 2 diags) equal 15.
