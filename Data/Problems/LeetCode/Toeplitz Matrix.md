# 766. Toeplitz Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/toeplitz-matrix](https://leetcode.com/problems/toeplitz-matrix)
**Companies:** Bloomberg, Google, Meta, Tcs, Wipro

---

## Problem Description

Given an `m x n` `matrix`, return *`true` if the matrix is Toeplitz. Otherwise, return `false`.*

A matrix is **Toeplitz** if every diagonal from top-left to bottom-right has the same elements.

**Constraints:**
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 20`
- `0 <= matrix[i][j] <= 99`

**Follow up:**
- What if the `matrix` is stored on disk, and the memory is limited such that you can only load at most one row of the matrix into the memory at once?
- What if the `matrix` is so large that you can only load up a partial row into the memory at once?

## Examples

**Example 1:**
```
Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
Output: true
Explanation:
In the above grid, the diagonals are:
"[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".
In each diagonal all elements are the same, so the answer is True.
```

**Example 2:**
```
Input: matrix = [[1,2],[2,2]]
Output: false
Explanation:
The diagonal "[1, 2]" has different elements.
```

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
