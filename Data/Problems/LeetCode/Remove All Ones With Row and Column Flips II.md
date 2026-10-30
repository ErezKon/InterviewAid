# 2174. Remove All Ones With Row and Column Flips II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips-ii](https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips-ii)
**Companies:** Google

---

## Problem Description
You are given a **0-indexed** `m x n` **binary** matrix `grid`.

In one operation, you can choose any `i` and `j` that meet the following conditions:

- `0 <= i < m`
- `0 <= j < n`
- `grid[i][j] == 1`

and change the values of **all** cells in row `i` and column `j` to zero.

Return *the **minimum** number of operations needed to remove all* `1`*'s from* `grid`*.*

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 15`
- `1 <= m * n <= 15`
- `grid[i][j]` is either `0` or `1`.

## Examples

```
Example 1:
  Input: grid = [[1,1,1],[1,1,1],[0,1,0]]
  Output: 2
  Explanation:
    In the first operation, change all cell values of row 1 and column 1 to zero.
    In the second operation, change all cell values of row 0 and column 0 to zero.
```

```
Example 2:
  Input: grid = [[0,1,0],[1,0,1],[0,1,0]]
  Output: 2
  Explanation:
    In the first operation, change all cell values of row 1 and column 0 to zero.
    In the second operation, change all cell values of row 2 and column 1 to zero.
    Note that we cannot perform an operation using row 1 and column 1 because grid[1][1] != 1.
```

```
Example 3:
  Input: grid = [[0,0],[0,0]]
  Output: 0
  Explanation: There are no 1's to remove so return 0.
```

## Approach
**Greedy Row Normalization + Column Count** – First, for each row, if its first element is `1`, flip the entire row so that the first column becomes all zeros. After this normalization, each column can be independently decided: choose to flip it if it reduces the number of `1`s in that column.

## Walkthrough
For `[[0,1],[1,0]]`:
1. Row 0 starts with `0` → keep.
2. Row 1 starts with `1` → flip row 1 → becomes `[0,1]`.
3. Matrix now `[[0,1],[0,1]]`. Column 1 has two `1`s; flipping column 1 yields all zeros.
Result: 0 ones.

## Complexity Analysis
- **Time:** O(m·n) – one pass to normalize rows, another to count column `1`s.
- **Space:** O(1) extra beyond the input matrix.

## Follow‑Up Questions
- How would the solution change if flips were limited to at most `k` rows/columns?
- What if the cost of flipping a row differs from flipping a column?
- Can you extend the approach to ternary matrices (0,1,2)?

## Key Takeaway
Normalize rows so the first column is all zeros, then independently flip columns that have more `1`s than `0`s to achieve the minimal count.
