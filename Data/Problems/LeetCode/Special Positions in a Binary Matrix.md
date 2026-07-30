# 1582. Special Positions in a Binary Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/special-positions-in-a-binary-matrix](https://leetcode.com/problems/special-positions-in-a-binary-matrix)
**Companies:** Amazon, Etsy, Google, Meta

---

## Problem Description
Given an `m × n` binary matrix `mat`, a *special* position is a cell `(r, c)` where `mat[r][c] == 1` and all other cells in row `r` and column `c` are `0`. Return the number of special positions in the matrix.

## Examples
- **Input:** `[[1,0,0],[0,0,1],[1,0,0]]`
  **Output:** `2`
  *Explanation:* Cells `(0,0)` and `(1,2)` are special.
- **Input:** `[[1,0,1],[0,1,0],[1,0,0]]`
  **Output:** `1`
  *Explanation:* Only cell `(1,1)` satisfies the condition.

## Approach
Count the number of `1`s in each row and each column. A cell is special if its row count and column count are both exactly `1`.

```text
FUNCTION numSpecial(mat):
    SET m ← number of rows in mat
    SET n ← number of columns in mat
    SET rowSum ← ARRAY of size m initialized to 0
    SET colSum ← ARRAY of size n initialized to 0
    // First pass: compute sums
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            IF mat[r][c] == 1:
                SET rowSum[r] ← rowSum[r] + 1
                SET colSum[c] ← colSum[c] + 1
    SET count ← 0
    // Second pass: identify special cells
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            IF mat[r][c] == 1 AND rowSum[r] == 1 AND colSum[c] == 1:
                SET count ← count + 1
    RETURN count
```

## Walkthrough
Consider the first example matrix.
| Cell | rowSum | colSum | Special? |
|------|--------|--------|----------|
| (0,0) | 1 | 2 | No (colSum > 1) |
| (0,1) | 1 | 0 | No (value 0) |
| (0,2) | 1 | 1 | Yes |
| (1,0) | 1 | 2 | No |
| (1,2) | 1 | 1 | Yes |
The algorithm counts the two `Yes` entries.

## Complexity Analysis
- **Time:** Two passes over the matrix → `O(m·n)`.
- **Space:** Two auxiliary arrays of size `m + n` → `O(m + n)`.

## Follow‑Up Questions
1. How would you adapt the solution for a sparse matrix representation?
2. Can the problem be solved in a single pass without extra arrays?
3. What changes are needed if the definition of a special position allows multiple `1`s per row/column but still requires uniqueness per row‑column pair?

## Key Takeaway
By precomputing row and column counts, we can identify special positions in linear time with minimal extra space.
