# 2128. Remove All Ones With Row and Column Flips

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips](https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips)
**Companies:** Google

---

## Problem Description
Given a binary matrix, you may perform any number of operations. In one operation you can choose an entire row or an entire column and flip every bit in it (0 becomes 1, 1 becomes 0). Return the minimum number of operations required to turn every cell containing a `1` into `0`. If it is impossible, return `-1`.

## Examples
**Example 1**
```
Input: matrix = [[0,1],[1,0]]
Output: 2
Explanation: Flip the first row (→ [[1,0],[1,0]]) then flip the first column (→ [[0,0],[0,0]]).
```
**Example 2**
```
Input: matrix = [[1,1],[1,1]]
Output: 1
Explanation: Flipping any row or column turns all 1s to 0s.
```

## Approach
The operation is equivalent to toggling bits in a row or column, which can be represented as XOR with a vector of all 1s. The problem reduces to solving a system of linear equations over GF(2). The minimum number of flips corresponds to the smallest set of rows/columns whose XOR equals the current matrix.

```text
FUNCTION minFlips(matrix):
    // Convert each row to a bitmask
    rows ← [bitmask of each row]
    // Build linear system: rows ⊕ columns = target (all zeros)
    // Perform Gaussian elimination over GF(2)
    rank, solutionSet ← GAUSS_ELIMINATION(rows)
    IF no solution: RETURN -1
    RETURN size of smallest solution in solutionSet
```

## Walkthrough
Consider the first example `[[0,1],[1,0]]`.
| Step | Row masks | Operation | Resulting matrix |
|------|-----------|-----------|------------------|
| 0    | 01,10     | —         | 0 1 / 1 0 |
| 1    | Flip row 0 → 10,10 | Row 0 flipped | 1 0 / 1 0 |
| 2    | Flip column 0 → 00,00 | Column 0 flipped | 0 0 / 0 0 |
The two flips achieve the goal, which is minimal.

## Complexity Analysis
Time: `O(m * n * min(m, n))` for Gaussian elimination on an `m×n` matrix.
Space: `O(m * n)` to store the matrix and auxiliary structures.

## Follow-Up Questions
1. How would the solution change if flips were allowed only on rows (or only on columns)?
2. Can you extend the approach to handle weighted flips where each operation has a cost?
3. What is the complexity if the matrix size is extremely large and must be processed in a streaming fashion?

## Key Takeaway
Flipping rows and columns can be modeled as a linear system over GF(2); solving it with Gaussian elimination yields the minimal number of operations.
