# 782. Transform to Chessboard

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/transform-to-chessboard](https://leetcode.com/problems/transform-to-chessboard)
**Companies:** Citadel, Google

---

## Problem Description

You are given an `n x n` binary grid `board`. In each move, you can swap any two rows with each other, or any two columns with each other.

Return *the minimum number of moves to transform the board into a **chessboard board***. If the task is impossible, return `-1`.

A **chessboard board** is a board where no `0`'s and no `1`'s are 4-directionally adjacent.

**Constraints:**
- `n == board.length`
- `n == board[i].length`
- `2 <= n <= 30`
- `board[i][j]` is either `0` or `1`.

## Examples

**Example 1:**
```
Input: board = [[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]]
Output: 2
Explanation: One potential sequence of moves is shown.
The first move swaps the first and second column.
The second move swaps the second and third row.
```

**Example 2:**
```
Input: board = [[0,1],[1,0]]
Output: 0
Explanation: Also note that the board with 0 in the top left corner, is also a valid chessboard.
```

**Example 3:**
```
Input: board = [[1,0],[1,0]]
Output: -1
Explanation: No matter what sequence of moves you make, you cannot end with a valid chessboard.
```

## Approach
A valid chessboard must have exactly two distinct row patterns that are bitwise inverses of each other, and the same holds for columns. Count how many rows match the first row pattern; the rest must match its inverse. If the counts differ by more than one (for odd `n`) or are not equal (for even `n`), transformation is impossible. The minimum swaps for rows (and similarly columns) equal the number of mismatched positions divided by 2, which can be computed via counting how many rows are in the correct parity position.

**Pseudocode**
```text
FUNCTION movesToChessboard(board):
    SET n ← LENGTH(board)
    // helper to compute swaps for either rows or columns
    FUNCTION swaps(lineArray):
        SET pattern1 ← lineArray[0]
        SET pattern2 ← INVERT(pattern1)
        SET countPattern1 ← 0
        FOR line IN lineArray:
            IF line = pattern1:
                SET countPattern1 ← countPattern1 + 1
            ELSE IF line ≠ pattern2:
                RETURN -1   // invalid pattern
        SET countPattern2 ← n - countPattern1
        // check feasibility
        IF n MOD 2 = 0:
            IF countPattern1 ≠ countPattern2:
                RETURN -1
        ELSE:
            IF ABS(countPattern1 - countPattern2) > 1:
                RETURN -1
        // compute swaps needed to align pattern1 to correct positions
        SET mismatches ← 0
        FOR i ← 0 TO n-1:
            IF lineArray[i] = pattern1 AND i MOD 2 = 1:
                SET mismatches ← mismatches + 1
            IF lineArray[i] = pattern2 AND i MOD 2 = 0:
                SET mismatches ← mismatches + 1
        IF n MOD 2 = 0:
            RETURN MIN(mismatches, n - mismatches) / 2
        ELSE:
            // for odd n, mismatches must be even; choose the parity that matches majority
            RETURN mismatches / 2
    END FUNCTION

    // extract rows and columns as binary strings
    SET rows ← [JOIN(row) FOR row IN board]
    SET cols ← [JOIN(column) FOR column IN TRANSPOSE(board)]
    SET rowSwaps ← swaps(rows)
    IF rowSwaps = -1: RETURN -1
    SET colSwaps ← swaps(cols)
    IF colSwaps = -1: RETURN -1
    RETURN rowSwaps + colSwaps
```

## Walkthrough
For the first example, rows are `[0110,0110,1001,1001]`. Pattern1 = `0110`, pattern2 = `1001`. Counts are equal (2 each). Mismatches for rows = 1 (row index 1 should be pattern2). Swaps rows = 1. Same for columns, total moves = 2.

## Complexity Analysis
- Time: O(n²) to read rows and columns and compute swaps.
- Space: O(n) for storing row and column patterns.

## Follow-Up Questions
1. How would you adapt the algorithm if swaps could only be performed on adjacent rows/columns?
2. Can the solution be extended to non-binary boards where cells have more than two values?
3. What is the minimum number of swaps if you are allowed to flip individual cells instead of swapping rows/columns?

## Key Takeaway
Transformability hinges on having exactly two complementary row/column patterns; counting mismatches against the ideal alternating order yields the minimal swap count.
