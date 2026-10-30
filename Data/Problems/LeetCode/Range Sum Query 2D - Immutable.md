# 304. Range Sum Query 2D - Immutable

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-sum-query-2d-immutable](https://leetcode.com/problems/range-sum-query-2d-immutable)
**Companies:** Amazon, Bloomberg, Doordash, Google, Meta, Microsoft, Okta, Upstart, Waymo
---

## Problem Description
Given a 2D matrix `matrix`, handle multiple queries of the following type:

- Calculate the **sum** of the elements of `matrix` inside the rectangle defined by its **upper left corner** `(row1, col1)` and **lower right corner** `(row2, col2)`.

Implement the `NumMatrix` class:

- `NumMatrix(int[][] matrix)` Initializes the object with the integer matrix `matrix`.
- `int sumRegion(int row1, int col1, int row2, int col2)` Returns the **sum** of the elements of `matrix` inside the rectangle defined by its **upper left corner** `(row1, col1)` and **lower right corner** `(row2, col2)`.

You must design an algorithm where `sumRegion` works on `O(1)` time complexity.

**Constraints:**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 200`
- `-10⁴ <= matrix[i][j] <= 10⁴`
- `0 <= row1 <= row2 < m`
- `0 <= col1 <= col2 < n`
- At most `10⁴` calls will be made to `sumRegion`.

## Examples

```
Example 1:
  Input: ["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
         [[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
  Output: [null, 8, 11, 12]
  Explanation:
    NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
    numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)
    numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)
    numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)
```

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
