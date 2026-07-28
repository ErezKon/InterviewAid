# 766. Toeplitz Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/toeplitz-matrix](https://leetcode.com/problems/toeplitz-matrix)
**Companies:** Bloomberg, Google, Meta, Tcs, Wipro

---

## Problem Description
Given an `m × n` matrix, determine whether it is a Toeplitz matrix. A matrix is Toeplitz if every element is equal to the element on its top‑left diagonal (i.e., `matrix[i][j] == matrix[i-1][j-1]` for all valid `i, j`).

## Examples
| matrix | Output | Explanation |
|--------|--------|-------------|
| `[[1,2,3],[4,1,2],[5,4,1]]` | `true` | All diagonals contain the same value. |
| `[[1,2],[2,2]]` | `false` | `matrix[1][0] != matrix[0][-1]` (out of bounds) violates the rule. |

## Approach
Iterate through the matrix starting from row 1 and column 1. For each cell, compare it with its top‑left neighbor. If any mismatch is found, return false; otherwise, after the loop return true.

```text
FUNCTION isToeplitzMatrix(matrix):
    SET rows ← LENGTH(matrix)
    SET cols ← LENGTH(matrix[0])
    FOR r FROM 1 TO rows - 1:
        FOR c FROM 1 TO cols - 1:
            IF matrix[r][c] != matrix[r-1][c-1]:
                RETURN false
    RETURN true
```

## Walkthrough
For the first example matrix:
| (r,c) | value | top‑left (r-1,c-1) | match? |
|-------|-------|-------------------|-------|
| (1,1) | 1 | 1 | yes |
| (1,2) | 2 | 2 | yes |
| (2,1) | 4 | 4 | yes |
| (2,2) | 1 | 1 | yes |
All checks pass → true.

## Complexity Analysis
*Time*: O(m·n) – each cell (except first row/col) is visited once.
*Space*: O(1) – only a few counters are used.

## Follow‑Up Questions
1. How would you modify the algorithm to return the first violating diagonal?
2. Can you solve it in a single pass without explicit nested loops using diagonal indexing?
3. What is the complexity if the matrix is stored in a sparse representation?

## Key Takeaway
A straightforward scan comparing each element with its top‑left neighbor verifies the Toeplitz property in linear time.
