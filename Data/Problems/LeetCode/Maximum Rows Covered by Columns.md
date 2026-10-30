# 2397. Maximum Rows Covered by Columns

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-rows-covered-by-columns](https://leetcode.com/problems/maximum-rows-covered-by-columns)
**Companies:** Apple

---

## Problem Description

> *Note: the Approach below flips columns, which is not the official operation. Correct idea: encode each row as a bitmask. Enumerate every column subset `sel` with `popcount(sel) == numSelect` (n ≤ 12), count the rows with `rowMask & ~sel == 0`, and take the max.*

You are given an `m x n` binary matrix `matrix` and an integer `numSelect`.

Your goal is to select exactly `numSelect` **distinct **columns from `matrix` such that you cover as many rows as possible.

A row is considered **covered** if all the `1`'s in that row are also part of a column that you have selected. If a row does not have any `1`s, it is also considered covered.

More formally, let us consider `selected = {c_1, c_2, ...., c_numSelect}` as the set of columns selected by you. A row `i` is **covered** by `selected` if:

- For each cell where `matrix[i][j] == 1`, the column `j` is in `selected`.
- Or, no cell in row `i` has a value of `1`.

Return the **maximum** number of rows that can be **covered** by a set of `numSelect` columns.

**Constraints:**
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 12`
- `matrix[i][j]` is either `0` or `1`.
- `1 <= numSelect <= n`

## Examples

**Example 1:**
```
Input: matrix = [[0,0,0],[1,0,1],[0,1,1],[0,0,1]], numSelect = 2
Output: 3
Explanation: One possible way to cover 3 rows is shown in the diagram above.
We choose s = {0, 2}.
- Row 0 is covered because it has no occurrences of 1.
- Row 1 is covered because the columns with value 1, i.e. 0 and 2 are present in s.
- Row 2 is not covered because matrix[2][1] == 1 but 1 is not present in s.
- Row 3 is covered because matrix[2][2] == 1 and 2 is present in s.
Thus, we can cover three rows.
Note that s = {1, 2} will also cover 3 rows, but it can be shown that no more than three rows can be covered.
```

**Example 2:**
```
Input: matrix = [[1],[0]], numSelect = 1
Output: 2
Explanation: Selecting the only column will result in both rows being covered since the entire matrix is selected.
```

## Approach
**Bitmask grouping** – Rows with identical patterns become interchangeable. Flipping a set of columns toggles bits uniformly; a row becomes covered iff its pattern after XOR with the chosen mask contains a `1`. The optimal mask is the one that matches the most frequent row pattern, because rows identical to the mask become all `1`s.

### Pseudocode
```text
FUNCTION maxRowsCovered(grid):
    CREATE map patternCount
    FOR each row IN grid:
        SET mask ← 0
        FOR j ← 0 TO n-1:
            IF row[j] = 1:
                SET mask ← mask OR (1 << j)
        INCREMENT patternCount[mask]
    RETURN MAX value IN patternCount
```

## Walkthrough
For `grid = [[1,0,1],[0,1,0],[1,0,1]]`:
- Row masks: `101₂ = 5`, `010₂ = 2`, `101₂ = 5`
- Frequency: `{5:2, 2:1}` → best mask `5` covers 2 rows.

## Complexity Analysis
- **Time:** O(m·n) – one pass to build masks.
- **Space:** O(m) – hashmap of at most `2ⁿ` entries, but `n ≤ 60`.

## Follow‑Up Questions
1. How would the solution change if a row is considered covered only when all its bits are `1`?
2. What if you are allowed to flip at most `k` columns?
3. Can you extend the approach to handle ternary values (0,1,2) with a different flip operation?

## Key Takeaway
Grouping rows by their bitmask reveals that the optimal column flips correspond to the most frequent row pattern, enabling a simple O(m·n) solution.
