# 2174. Remove All Ones With Row and Column Flips II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips-ii](https://leetcode.com/problems/remove-all-ones-with-row-and-column-flips-ii)
**Companies:** Google

---

## Problem Description
Given a binary matrix `grid` of size `m × n`, you may perform any number of operations: choose a row or a column and flip all its bits (0 ↔ 1). Determine the minimum number of `1`s that can remain in the matrix after any sequence of flips.

## Examples
| Input grid | Minimum `1`s |
|------------|--------------|
| `[[0,1],[1,0]]` | 0 | Flip first row and first column to make all zeros. |
| `[[1,1,0],[0,1,1]]` | 2 | Optimal flips leave two `1`s. |
| `[[0]]` | 0 | Already all zeros.

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
