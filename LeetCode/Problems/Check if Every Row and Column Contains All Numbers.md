# 2133. Check if Every Row and Column Contains All Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-every-row-and-column-contains-all-numbers](https://leetcode.com/problems/check-if-every-row-and-column-contains-all-numbers)
**Companies:** Indeed, Instacart, Karat, Zoho

---

## Problem Description
Given an `n x n` matrix where each row and column contains integers from `1` to `n`, determine whether every row and every column contains all numbers exactly once (i.e., each row and column is a permutation of `1..n`). Return `true` if the condition holds, otherwise `false`.

## Examples
- Input: `[[1,2,3],[3,1,2],[2,3,1]]` → Output: `true` (each row and column has 1,2,3)
- Input: `[[1,1,1],[1,2,3],[1,2,3]]` → Output: `false` (first row repeats `1` and columns miss numbers)

## Approach
**Algorithm:** Validate rows and columns using sets
1. For each row, check that the size of the set of its elements equals `n`.
2. For each column index `c`, collect `matrix[r][c]` for all rows `r` and verify the set size is `n`.
3. If any check fails, return `false`; otherwise return `true`.

```text
FUNCTION isValidLatinSquare(matrix):
    SET n ← LENGTH(matrix)
    // Validate rows
    FOR row IN matrix:
        IF LENGTH(SET(row)) ≠ n: RETURN false
    // Validate columns
    FOR c ← 0 TO n - 1:
        SET colSet ← EMPTY SET
        FOR r ← 0 TO n - 1:
            APPEND matrix[r][c] TO colSet
        IF LENGTH(colSet) ≠ n: RETURN false
    RETURN true
```

## Walkthrough
Consider `[[1,2,3],[3,1,2],[2,3,1]]`:
- Row checks: each row set size = 3 → pass.
- Column 0 values: `1,3,2` → set size 3.
- Column 1 values: `2,1,3` → set size 3.
- Column 2 values: `3,2,1` → set size 3.
All checks pass → return `true`.

## Complexity Analysis
- **Time:** O(n²) – we scan every element twice (once for rows, once for columns).
- **Space:** O(n) – auxiliary set for a single row or column.

## Follow-Up Questions
1. How would you modify the solution to handle non‑square matrices?
2. Can you detect the first row or column that violates the condition?
3. What if the matrix is extremely large and cannot fit in memory?

## Key Takeaway
Using a set to verify uniqueness in each row and column provides a straightforward O(n²) solution for checking Latin‑square validity.
