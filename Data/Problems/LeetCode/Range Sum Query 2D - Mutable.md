# 308. Range Sum Query 2D - Mutable

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-sum-query-2d-mutable](https://leetcode.com/problems/range-sum-query-2d-mutable)
**Companies:** Amazon, Bloomberg, Google
---

## Problem Description
Design a data structure for a mutable 2‑D integer matrix that supports updating a single element and querying the sum of a rectangular sub‑matrix defined by its upper‑left `(row1, col1)` and lower‑right `(row2, col2)` corners. Both operations should be faster than O(m·n).

## Examples
- Initialize with `matrix = [[3,0,1],[5,6,3],[1,2,0]]`. `sumRegion(0,0,2,2)` returns `21`.
- After `update(1,1,10)`, the matrix becomes `[[3,0,1],[5,10,3],[1,2,0]]`; `sumRegion(1,1,2,2)` returns `15`.

## Approach
Use a 2‑D Binary Indexed Tree (Fenwick Tree) to store prefix sums. Updating an element computes the difference and propagates it through the BIT. Querying a region uses inclusion‑exclusion of four prefix sums.

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
- Update: O(log m · log n)
- Query: O(log m · log n)
- Space: O(m·n) for the BIT and original matrix.

## Follow‑Up Questions
1. How would you adapt the structure for a 3‑D matrix?
2. Can you achieve the same operations with a 2‑D Segment Tree?
3. What optimizations are possible for sparse matrices?

## Key Takeaway
A 2‑D Fenwick Tree converts mutable range‑sum queries into logarithmic‑time operations by maintaining cumulative frequencies in a compact tree structure.
