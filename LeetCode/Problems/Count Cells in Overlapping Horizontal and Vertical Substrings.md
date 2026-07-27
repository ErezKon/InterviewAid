# 3529. Count Cells in Overlapping Horizontal and Vertical Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-cells-in-overlapping-horizontal-and-vertical-substrings](https://leetcode.com/problems/count-cells-in-overlapping-horizontal-and-vertical-substrings)
**Companies:** Google

---

## 1. Problem Description

Given a grid and a pattern string, find all horizontal and vertical occurrences of the pattern. Count grid cells that are covered by both a horizontal and a vertical occurrence.

---

## 2. Key Insight

> Find all horizontal matches (row-by-row, using KMP/string matching) and mark their cells. Find all vertical matches (column-by-column). Count cells marked by both.

---

## 3. Approach: String Matching + Grid Marking — O(m × n × L) ✅

```
FUNCTION countCells(grid, pattern):
    m, n = dimensions
    hMark = m×n boolean grid (false)
    vMark = m×n boolean grid (false)
    
    // Horizontal: match pattern in each row
    FOR r FROM 0 TO m-1:
        row = "".JOIN(grid[r])
        FOR each occurrence of pattern starting at col c:
            mark hMark[r][c..c+len(pattern)-1] = true
    
    // Vertical: match pattern in each column
    FOR c FROM 0 TO n-1:
        col = "".JOIN(grid[r][c] for r in range(m))
        FOR each occurrence of pattern starting at row r:
            mark vMark[r..r+len(pattern)-1][c] = true
    
    // Count cells marked in both
    count = 0
    FOR r, c: IF hMark[r][c] AND vMark[r][c]: count += 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(m × n × L) | O(m × n) |

---

## Key Takeaway

> Two independent string matching passes (horizontal and vertical), then intersect the marked cells. Use KMP for efficient pattern matching in each row/column.
