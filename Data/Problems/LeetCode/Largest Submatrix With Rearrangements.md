# 1727. Largest Submatrix With Rearrangements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-submatrix-with-rearrangements](https://leetcode.com/problems/largest-submatrix-with-rearrangements)
**Companies:** Amazon, Bloomberg, Directi, Google, Meta, Microsoft

---

## 1. Problem Description

Given a binary matrix, you may rearrange the columns in any order. Return the area of the largest submatrix that contains only `1`s after any column rearrangement.

---

## 2. Approach: Histogram + Sort — O(m·n log n) ✅

```text
FUNCTION largestSubmatrix(matrix):
    m ← NUMBER OF ROWS(matrix)
    n ← NUMBER OF COLUMNS(matrix)

    // Build histogram heights of consecutive 1s in each column
    FOR r FROM 1 TO m-1:
        FOR c FROM 0 TO n-1:
            IF matrix[r][c] == 1:
                SET matrix[r][c] ← matrix[r][c] + matrix[r-1][c]

    SET maxArea ← 0
    FOR r FROM 0 TO m-1:
        // Sort heights of the current row in descending order
        SET sortedRow ← SORT_DESCENDING(matrix[r])
        FOR c FROM 0 TO n-1:
            // Using the c+1 tallest columns gives a rectangle of height sortedRow[c]
            SET area ← sortedRow[c] * (c + 1)
            SET maxArea ← MAX(maxArea, area)
    RETURN maxArea
```

---

## 3. Examples

| matrix | Output |
|--------|--------|
| `[[1,0,1],[0,1,0],[1,0,0]]` | 2 |
| `[[1,1,0],[1,0,1]]` | 4 |
| `[[0,0],[0,0]]` | 0 |

---

## 4. Walkthrough

Consider the matrix `[[1,0,1],[0,1,0],[1,0,0]]`.
1. **Histogram construction** – after the first pass the matrix becomes:
   - Row 0: `[1,0,1]`
   - Row 1: `[0,1,0]`
   - Row 2: `[1,0,0]` (since there is a `1` above at (0,0)).
2. **Sorting each row**:
   - Row 0 sorted → `[1,1,0]`
   - Row 1 sorted → `[1,0,0]`
   - Row 2 sorted → `[1,0,0]`
3. **Area calculation** for each row:
   - Row 0: `area = 1*1 = 1`, `area = 1*2 = 2` → max 2.
   - Row 1 & 2: maximum area = 1.
4. The largest possible all‑1s submatrix after column rearrangement has area **2**.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(m·n log n) | O(n) |

---

## 6. Follow-Up Questions

- How would the solution change if rows could also be rearranged?
- Can you achieve O(m·n) time by using counting sort instead of a general sort?
- What modifications are needed to handle matrices with values other than 0/1 (e.g., weighted cells)?

---

## Key Takeaway

> Build column‑wise histograms of consecutive 1s, sort each row to simulate column rearrangement, and compute the maximal rectangle as `height × width`.
