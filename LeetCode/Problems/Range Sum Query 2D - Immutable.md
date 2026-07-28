# 304. Range Sum Query 2D - Immutable

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-sum-query-2d-immutable](https://leetcode.com/problems/range-sum-query-2d-immutable)
**Companies:** Amazon, Bloomberg, Doordash, Google, Meta, Microsoft, Okta, Upstart, Waymo
---

## Problem Description
Given a 2‑D matrix of integers, create a data structure that can return the sum of the elements inside any rectangular sub‑matrix defined by its upper‑left corner `(row1, col1)` and lower‑right corner `(row2, col2)`. The matrix is immutable; no updates occur after initialization.

## Examples
- Input matrix `[[3,0,1],[5,6,3],[1,2,0]]`. Query `sumRegion(0,0,2,2)` returns `21` (sum of all elements).
- Query `sumRegion(1,1,2,2)` returns `11` (elements `6,3,2,0`).

## Approach
Pre‑compute a 2‑D prefix‑sum matrix `prefix` where `prefix[i][j]` stores the sum of the sub‑matrix from `(0,0)` to `(i‑1,j‑1)`. Then any query can be answered with inclusion‑exclusion in O(1).

```text
CLASS NumMatrix:
    CONSTRUCTOR(matrix):
        SET m ← NUMBER_OF_ROWS(matrix)
        SET n ← NUMBER_OF_COLUMNS(matrix)
        SET prefix ← (m+1) × (n+1) matrix of zeros
        FOR i ← 1 TO m:
            FOR j ← 1 TO n:
                SET prefix[i][j] ← matrix[i-1][j-1]
                    + prefix[i-1][j]
                    + prefix[i][j-1]
                    - prefix[i-1][j-1]
                END SET
            END FOR
        END FOR
    FUNCTION sumRegion(row1, col1, row2, col2):
        // Convert to 1‑based indices for prefix matrix
        SET r1 ← row1 + 1
        SET c1 ← col1 + 1
        SET r2 ← row2 + 1
        SET c2 ← col2 + 1
        RETURN prefix[r2][c2]
             - prefix[r1-1][c2]
             - prefix[r2][c1-1]
             + prefix[r1-1][c1-1]
END CLASS
```

## Walkthrough
| Step | Action | Prefix matrix entry |
|------|--------|---------------------|
|Init|Compute `prefix[1][1]` = `3`|3|
|...|Fill entire table|...|
|Query `(1,1,2,2)`|Use inclusion‑exclusion formula|`11`|

## Complexity Analysis
- Preprocessing time: O(m × n)
- Query time: O(1)
- Space: O(m × n) for the prefix matrix.

## Follow‑Up Questions
1. How would you support updates to the matrix?
2. Can you reduce space using a Fenwick Tree (BIT) for 2‑D?
3. Extend to handle large sparse matrices efficiently.

## Key Takeaway
A 2‑D prefix‑sum transforms immutable range‑sum queries into constant‑time operations after a linear‑time preprocessing step.
