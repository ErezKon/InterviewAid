# 2536. Increment Submatrices by One

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/increment-submatrices-by-one](https://leetcode.com/problems/increment-submatrices-by-one)

**Companies:** Adobe, Google, Meta
---

## 1. Problem Description

You are given a positive integer `n`, indicating that we initially have an `n x n` **0-indexed** integer matrix `mat` filled with zeroes.

You are also given a 2D integer array `query`. For each `query[i] = [row1_i, col1_i, row2_i, col2_i]`, you should do the following operation:

- Add `1` to **every element** in the submatrix with the **top left** corner `(row1_i, col1_i)` and the **bottom right** corner `(row2_i, col2_i)`. That is, add `1` to `mat[x][y]` for all `row1_i <= x <= row2_i` and `col1_i <= y <= col2_i`.

Return* the matrix* `mat`* after performing every query.*

**Constraints:**
- `1 <= n <= 500`
- `1 <= queries.length <= 10^4`
- `0 <= row1_i <= row2_i < n`
- `0 <= col1_i <= col2_i < n`

## 2. Examples

**Example 1:**
```
Input: n = 3, queries = [[1,1,2,2],[0,0,1,1]]
Output: [[1,1,0],[1,2,1],[0,1,1]]
Explanation: The diagram above shows the initial matrix, the matrix after the first query, and the matrix after the second query.
- In the first query, we add 1 to every element in the submatrix with the top left corner (1, 1) and bottom right corner (2, 2).
- In the second query, we add 1 to every element in the submatrix with the top left corner (0, 0) and bottom right corner (1, 1).
```

**Example 2:**
```
Input: n = 2, queries = [[0,0,1,1]]
Output: [[1,1],[1,1]]
Explanation: The diagram above shows the initial matrix and the matrix after the first query.
- In the first query we add 1 to every element in the matrix.
```

## 3. Approach: 2D Difference Array — O(n² + q) ✅

```text
FUNCTION rangeAddQueries(n, queries):
    // diff holds incremental changes
    SET diff ← n×n matrix of zeros
    FOR each [r1, c1, r2, c2] IN queries DO
        SET diff[r1][c1] ← diff[r1][c1] + 1
        IF c2 + 1 < n: SET diff[r1][c2+1] ← diff[r1][c2+1] - 1
        IF r2 + 1 < n: SET diff[r2+1][c1] ← diff[r2+1][c1] - 1
        IF r2 + 1 < n AND c2 + 1 < n: SET diff[r2+1][c2+1] ← diff[r2+1][c2+1] + 1
    // Convert diff to final matrix via 2‑D prefix sums
    FOR r ← 0 TO n-1 DO
        FOR c ← 1 TO n-1 DO
            SET diff[r][c] ← diff[r][c] + diff[r][c-1]
    FOR c ← 0 TO n-1 DO
        FOR r ← 1 TO n-1 DO
            SET diff[r][c] ← diff[r][c] + diff[r-1][c]
    RETURN diff
```

## 4. Walkthrough

| Step | Action | diff matrix (partial) |
|------|--------|-----------------------|
| 1 | Initialize 3×3 zeros | all 0 |
| 2 | Apply query [0,0,1,1] | increment corners, decrement edges |
| 3 | Apply query [1,1,2,2] | update overlapping region |
| 4 | Row‑wise prefix sum | each row accumulates left values |
| 5 | Column‑wise prefix sum | each column accumulates top values |
| 6 | Final matrix returned | [[1,1,0],[1,2,1],[0,1,1]] |

## 5. Complexity Analysis

- **Time:** O(n² + q) – O(1) per query to update diff, plus two passes over the n×n matrix.
- **Space:** O(n²) for the auxiliary diff matrix (can be done in‑place).

## 6. Follow-Up Questions

- How would you modify the solution to support decrement operations?
- Can the approach be extended to 3‑D matrices?
- What if queries are streamed online and you need to answer intermediate matrix states?

## Key Takeaway

> **2D difference array** + prefix sum. Apply O(1) per query, recover in O(n²). Classic range update technique.
