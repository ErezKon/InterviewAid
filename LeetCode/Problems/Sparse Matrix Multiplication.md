# 311. Sparse Matrix Multiplication

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/sparse-matrix-multiplication
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Nuro, Oracle, Pinterest, Tiktok
---

## Problem Description
Given two matrices `mat1` (size m×k) and `mat2` (size k×n) where most elements are zero, compute their product `result = mat1 × mat2`. Return the resulting m×n matrix. Optimize by skipping zero entries to improve performance.

## Examples
**Example 1**
```
Input: mat1 = [[1,0,0],[0,0,1]], mat2 = [[7,0,0],[0,0,0],[0,0,1]]
Output: [[7,0,0],[0,0,1]]
Explanation: Only non‑zero entries contribute to the product.
```

**Example 2**
```
Input: mat1 = [[0,0],[0,0]], mat2 = [[0,0],[0,0]]
Output: [[0,0],[0,0]]
Explanation: All entries are zero, result is a zero matrix.
```

## Approach
Iterate over non‑zero elements of `mat1`; for each, multiply with the corresponding row of `mat2` and accumulate into `result`. This avoids O(m·k·n) work when many zeros exist.

```text
FUNCTION multiplySparse(mat1, mat2):
    SET m, k ← dimensions of mat1
    SET _, n ← dimensions of mat2
    INITIALIZE result[m][n] ← 0
    FOR i ← 0 TO m-1:
        FOR j ← 0 TO k-1:
            IF mat1[i][j] == 0: CONTINUE
            FOR l ← 0 TO n-1:
                IF mat2[j][l] == 0: CONTINUE
                SET result[i][l] ← result[i][l] + mat1[i][j] * mat2[j][l]
    RETURN result
```

## Walkthrough
| Step | i | j | mat1[i][j] | Updated result row |
|------|---|---|-----------|--------------------|
| 1 | 0 | 0 | 1 | result[0][0] += 1*7 → 7 |
| 2 | 1 | 2 | 1 | result[1][2] += 1*1 → 1 |
Result matches expected output.

## Complexity Analysis
- Time: `O(nnz(mat1) * n)` where `nnz(mat1)` is number of non‑zero entries in `mat1` (often far less than m·k).
- Space: `O(m·n)` for the output matrix.

## Follow‑Up Questions
1. How would you store the matrices using hash maps or coordinate lists to further reduce memory?
2. Can you extend the method to multiply more than two sparse matrices?
3. What changes are needed if the matrices are extremely large and stored on disk?

## Key Takeaway
Skipping zero entries during multiplication dramatically reduces work for sparse matrices, turning a cubic algorithm into one proportional to the number of non‑zero elements.
