# 2397. Maximum Rows Covered by Columns

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-rows-covered-by-columns](https://leetcode.com/problems/maximum-rows-covered-by-columns)
**Companies:** Apple

---

## Problem Description
You are given a binary matrix `grid` of size `m × n`. You may select any subset of columns and flip all bits in those columns (0↔1). After flipping, a row is considered *covered* if it contains at least one `1`. Return the maximum possible number of covered rows.

Constraints: `1 ≤ m, n ≤ 60`; each `grid[i][j]` is `0` or `1`.

## Examples
| grid | Output | Explanation |
|------|--------|-------------|
| [[1,0],[0,1]] | 2 | Flip column 1 → rows become `[0,1]` and `[1,0]`, both have a `1` |
| [[0,0],[0,0]] | 0 | No column flips can create a `1` in any row |

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
