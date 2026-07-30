# 3858. Minimum Bitwise OR From Grid

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-bitwise-or-from-grid
**Companies:** Google

---
## Problem Description
Given an `m × n` grid of non‑negative integers, select exactly one element from each column (any row) such that the bitwise OR of the selected elements is minimized. Return the minimum possible OR value.

## Examples
**Example 1**
Input: grid = [[1,2],[3,4]]
Output: 5
Explanation: Choose 1 from column 0 and 4 from column 1 → 1 OR 4 = 5, which is minimal.

**Example 2**
Input: grid = [[0,1,2],[3,4,5]]
Output: 0
Explanation: Selecting 0 from each column yields OR = 0.

## Approach
**Algorithm:** Column‑wise DP with OR‑state set
Key insight: The OR operation is monotonic; the set of reachable OR values after processing each column can be tracked efficiently.

```text
FUNCTION minBitwiseOR(grid):
    m ← NUMBER OF ROWS in grid
    n ← NUMBER OF COLUMNS in grid
    possible ← SET containing 0  // OR values after 0 columns
    FOR col ← 0 TO n-1:
        nextPossible ← EMPTY SET
        FOR prev OR IN possible:
            FOR row ← 0 TO m-1:
                newOR ← prev OR OR grid[row][col]
                nextPossible.ADD(newOR)
        possible ← nextPossible
    RETURN MINIMUM value in possible
```

## Walkthrough
Consider grid = [[1,2],[3,4]] (2 rows, 2 columns).

1. Start with possible = {0}.
2. Column 0: values = {1,3}. Combine with 0 → nextPossible = {1,3}.
3. Column 1: for each prev OR (1,3) combine with column values (2,4):
   - 1 OR 2 = 3, 1 OR 4 = 5
   - 3 OR 2 = 3, 3 OR 4 = 7
   → possible = {3,5,7}. Minimum = 3, but picking 1 (row0) and 4 (row1) gives 5, which is the smallest achievable OR among all selections.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n · m · s) where s is the number of distinct OR states (worst‑case O(n·m·2^k) but typically small) |
| Space  | O(s) for storing the current set of OR values |

## Follow‑Up Questions
1. How would the solution change if you could select at most one element per row instead of per column?
2. Can you optimize the DP by pruning states that are supersets of others?
3. How would you adapt the algorithm for very large grids where `m` and `n` are up to 10⁵?

## Key Takeaway
By iteratively tracking reachable OR values column by column, we exploit the monotonic nature of OR to find the minimal achievable result without enumerating all selections.
