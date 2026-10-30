# 867. Transpose Matrix

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/transpose-matrix](https://leetcode.com/problems/transpose-matrix)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Verkada

---

## Problem Description

Given a 2D integer array `matrix`, return *the **transpose** of* `matrix`.

The **transpose** of a matrix is the matrix flipped over its main diagonal, switching the matrix's row and column indices.

![img](https://assets.leetcode.com/uploads/2021/02/10/hint_transpose.png)

**Constraints:**
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 1000`
- `1 <= m * n <= 10^5`
- `-10^9 <= matrix[i][j] <= 10^9`

## Examples

**Example 1:**
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[1,4,7],[2,5,8],[3,6,9]]
```

**Example 2:**
```
Input: matrix = [[1,2,3],[4,5,6]]
Output: [[1,4],[2,5],[3,6]]
```

## Approach
Iterate over column indices and collect elements from each row at that column index to form a new row in the transposed matrix.

**Pseudocode**
```text
FUNCTION transpose(matrix):
    SET m ← NUMBER OF ROWS in matrix
    SET n ← NUMBER OF COLUMNS in matrix[0]
    SET result ← EMPTY LIST
    FOR c ← 0 TO n-1:
        SET newRow ← EMPTY LIST
        FOR r ← 0 TO m-1:
            APPEND matrix[r][c] TO newRow
        APPEND newRow TO result
    RETURN result
```

## Walkthrough
| Step | c (column) | newRow built from rows | result after step |
|------|------------|-----------------------|-------------------|
| 1 | 0 | [1,4,7] | [[1,4,7]] |
| 2 | 1 | [2,5,8] | [[1,4,7],[2,5,8]] |
| 3 | 2 | [3,6,9] | [[1,4,7],[2,5,8],[3,6,9]] |

## Complexity Analysis
- Time: O(m · n) – each element is visited once.
- Space: O(m · n) for the output matrix.

## Follow-Up Questions
1. How would you perform the transpose in‑place for a square matrix?
2. Can you extend the algorithm to handle sparse matrices efficiently?
3. What modifications are needed to transpose a 3‑dimensional tensor?

## Key Takeaway
Transposing a matrix is simply swapping row and column indices, which can be done by iterating over columns and collecting corresponding row elements.
