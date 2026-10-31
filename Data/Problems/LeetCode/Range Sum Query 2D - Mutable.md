# 308. Range Sum Query 2D - Mutable

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-sum-query-2d-mutable](https://leetcode.com/problems/range-sum-query-2d-mutable)
**Companies:** Amazon, Bloomberg, Google
---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given a 2D matrix `matrix`, handle multiple queries of the following types:

- **Update** the value of a cell in `matrix`.
- Calculate the **sum** of the elements of `matrix` inside the rectangle defined by its **upper left corner** `(row1, col1)` and **lower right corner** `(row2, col2)`.

Implement the NumMatrix class:

- `NumMatrix(int[][] matrix)` Initializes the object with the integer matrix `matrix`.
- `void update(int row, int col, int val)` **Updates** the value of `matrix[row][col]` to be `val`.
- `int sumRegion(int row1, int col1, int row2, int col2)` Returns the **sum** of the elements of `matrix` inside the rectangle defined by its **upper left corner** `(row1, col1)` and **lower right corner** `(row2, col2)`.

**Constraints:**
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 200`
- `-1000 <= matrix[i][j] <= 1000`
- `0 <= row < m`
- `0 <= col < n`
- `-1000 <= val <= 1000`
- `0 <= row1 <= row2 < m`
- `0 <= col1 <= col2 < n`
- At most `5000` calls will be made to `sumRegion` and `update`.

## Examples

**Example 1:**
```
Input
["NumMatrix", "sumRegion", "update", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [3, 2, 2], [2, 1, 4, 3]]
Output:
[null, 8, null, 10]
Explanation:
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e. sum of the left red rectangle)
numMatrix.update(3, 2, 2);       // matrix changes from left image to right image
numMatrix.sumRegion(2, 1, 4, 3); // return 10 (i.e. sum of the right red rectangle)
```

## Approach
Use a 2-D Binary Indexed Tree (Fenwick Tree) to store prefix sums. Updating an element computes the difference and propagates it through the BIT. Querying a region uses inclusion-exclusion of four prefix sums.

```text
CLASS NumMatrix:
    CONSTRUCTOR(matrix):
        SET m ← NUMBER_OF_ROWS(matrix)
        SET n ← NUMBER_OF_COLUMNS(matrix)
        SET bit ← (m+1) × (n+1) matrix of zeros
        SET original ← COPY(matrix)
        FOR i ← 0 TO m-1:
            FOR j ← 0 TO n-1:
                CALL internalUpdate(i, j, original[i][j])
            END FOR
        END FOR
    FUNCTION internalUpdate(row, col, delta):
        SET i ← row + 1
        WHILE i ≤ m:
            SET j ← col + 1
            WHILE j ≤ n:
                SET bit[i][j] ← bit[i][j] + delta
                SET j ← j + (j AND -j)
            END WHILE
            SET i ← i + (i AND -i)
        END WHILE
    FUNCTION update(row, col, val):
        SET delta ← val - original[row][col]
        SET original[row][col] ← val
        CALL internalUpdate(row, col, delta)
    FUNCTION query(row, col):
        // Prefix sum from (0,0) to (row,col) inclusive
        SET sum ← 0
        SET i ← row + 1
        WHILE i > 0:
            SET j ← col + 1
            WHILE j > 0:
                SET sum ← sum + bit[i][j]
                SET j ← j - (j AND -j)
            END WHILE
            SET i ← i - (i AND -i)
        END WHILE
        RETURN sum
    FUNCTION sumRegion(row1, col1, row2, col2):
        RETURN query(row2, col2)
             - query(row1-1, col2)
             - query(row2, col1-1)
             + query(row1-1, col1-1)
END CLASS
```

## Walkthrough
| Step | Action | BIT state (partial) |
|------|--------|---------------------|
|Init|Build BIT from original matrix|prefix contributions stored in `bit`|
|update(1,1,10)|delta = 4, propagate through BIT cells covering (1,1)|updated values reflect new sum|
|sumRegion(1,1,2,2)|use four `query` calls → result `15`|

## Complexity Analysis
- Update: O(log m · log n)
- Query: O(log m · log n)
- Space: O(m·n) for the BIT and original matrix.

## Follow-Up Questions
1. How would you adapt the structure for a 3-D matrix?
2. Can you achieve the same operations with a 2-D Segment Tree?
3. What optimizations are possible for sparse matrices?

## Key Takeaway
A 2-D Fenwick Tree converts mutable range-sum queries into logarithmic-time operations by maintaining cumulative frequencies in a compact tree structure.
