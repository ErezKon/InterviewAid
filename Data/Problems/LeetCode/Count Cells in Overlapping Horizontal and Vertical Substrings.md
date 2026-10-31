# 3529. Count Cells in Overlapping Horizontal and Vertical Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-cells-in-overlapping-horizontal-and-vertical-substrings](https://leetcode.com/problems/count-cells-in-overlapping-horizontal-and-vertical-substrings)
**Companies:** Google

---

## 1. Problem Description

You are given an `m x n` matrix `grid` consisting of characters and a string `pattern`.

A **horizontal substring** is a contiguous sequence of characters read from left to right. If the end of a row is reached before the substring is complete, it wraps to the first column of the next row and continues as needed. You do **not** wrap from the bottom row back to the top.

A **vertical substring** is a contiguous sequence of characters read from top to bottom. If the bottom of a column is reached before the substring is complete, it wraps to the first row of the next column and continues as needed. You do **not** wrap from the last column back to the first.

Count the number of cells in the matrix that satisfy the following condition:

- The cell must be part of **at least** one horizontal substring and **at least** one vertical substring, where **both** substrings are equal to the given `pattern`.

Return the count of these cells.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 1000`
- `1 <= m * n <= 10^5`
- `1 <= pattern.length <= m * n`
- `grid` and `pattern` consist of only lowercase English letters.

---

## 2. Key Insight

> Find all horizontal matches (row-by-row, using KMP/string matching) and mark their cells. Find all vertical matches (column-by-column). Count cells marked by both.

---

## 3. Approach: String Matching + Grid Marking — O(m × n × L) ✅

```text
FUNCTION countCells(grid, pattern):
    m, n ← dimensions of grid
    hMark ← m×n boolean matrix initialized to false
    vMark ← m×n boolean matrix initialized to false
    
    // Horizontal matches
    FOR r ← 0 TO m-1:
        rowString ← concatenate characters of grid[r]
        FOR each start index c where pattern matches rowString:
            FOR offset ← 0 TO len(pattern)-1:
                SET hMark[r][c+offset] ← true
    
    // Vertical matches
    FOR c ← 0 TO n-1:
        colString ← concatenate characters grid[0..m-1][c]
        FOR each start index r where pattern matches colString:
            FOR offset ← 0 TO len(pattern)-1:
                SET vMark[r+offset][c] ← true
    
    // Intersection count
    SET total ← 0
    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            IF hMark[r][c] AND vMark[r][c]:
                SET total ← total + 1
    RETURN total
```

---

## 4. Examples

```
Example 1:
  Input: grid = [["a","a","c","c"],["b","b","b","c"],["a","a","b","a"],["c","a","a","c"],["a","a","b","a"]], pattern = "abaca"
  Output: 1
  Explanation: The pattern "abaca" appears once as a horizontal substring and once as a vertical
  substring, intersecting at one cell.
```

```
Example 2:
  Input: grid = [["c","a","a","a"],["a","a","b","a"],["b","b","a","a"],["a","a","b","a"]], pattern = "aba"
  Output: 4
  Explanation: 4 cells are all part of at least one horizontal and one vertical substring matching
  the pattern "aba".
```

```
Example 3:
  Input: grid = [["a"]], pattern = "a"
  Output: 1
```

---

## 5. Walkthrough

Consider the first example grid and pattern `"ab"`.

1. **Horizontal pass** – Row 0 contains `"ab"` starting at column 0, marking cells (0,0) and (0,1). Row 1 contains `"ab"` starting at column 1, marking (1,1) and (1,2).
2. **Vertical pass** – Column 1 contains `"ab"` starting at row 0, marking (0,1) and (1,1). Column 2 contains `"ab"` starting at row 1, marking (1,2) and (2,2).
3. **Intersection** – Cells marked in both passes are (0,1) and (1,2). Hence the answer is 2.

---

## 6. Complexity Analysis

- **Time:** `O(m × n × L)` where *L* is the pattern length (string matching per row and column). Using KMP reduces the constant factor.
- **Space:** `O(m × n)` for the two boolean marking matrices.

---

## 7. Follow-Up Questions

1. How would you modify the algorithm to handle overlapping occurrences of the pattern within the same row or column?
2. Can you achieve `O(m × n)` time without extra `O(m × n)` space?
3. How would the solution change if the grid contained Unicode characters?

---

## Key Takeaway

> Perform independent horizontal and vertical string-matching passes, mark the covered cells, and intersect the markings to count overlapping cells.
