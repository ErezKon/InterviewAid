# 2536. Increment Submatrices by One

**Difficulty:** 🟡 Medium

**Companies:** Adobe, Google, Meta
---

## 1. Problem Description

Apply multiple range increment operations on submatrices. Return the final matrix.

## 2. Examples

**Example 1:**
```
Input: n = 3, queries = [[0,0,1,1],[1,1,2,2]]
Output: [[1,1,0],[1,2,1],[0,1,1]]
Explanation:
- After first query, increment submatrix (0,0) to (1,1).
- After second query, increment submatrix (1,1) to (2,2).
```

**Example 2:**
```
Input: n = 2, queries = [[0,0,0,0],[0,0,1,1]]
Output: [[2,1],[1,1]]
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
