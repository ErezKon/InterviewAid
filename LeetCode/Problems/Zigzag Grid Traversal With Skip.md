# 3417. Zigzag Grid Traversal With Skip

**Difficulty:** 🟢 Easy
**Companies:** Google, Meta, Tcs

---

## Problem Description
Given an `m x n` grid of integers, traverse the grid in a zigzag pattern: first row left‑to‑right, second row right‑to‑left, alternating for each subsequent row. While traversing, collect every other element (i.e., skip one element after each collected element). Return the list of collected values.

## Examples
**Example 1:**
Input:
```
grid = [[1,2,3],
        [4,5,6],
        [7,8,9]]
```
Output: `[1,3,5,7,9]`
Explanation: Row 0 left‑to‑right → collect 1, skip 2, collect 3; Row 1 right‑to‑left → collect 5, skip 4, collect 6 (but we only take every other overall, so after 3 we take 5); Row 2 left‑to‑right → collect 7, skip 8, collect 9.

**Example 2:**
Input:
```
grid = [[10,20],
        [30,40]]
```
Output: `[10,40]`
Explanation: Row 0 left‑to‑right → collect 10, skip 20; Row 1 right‑to‑left → collect 40.

## Approach
Simulate the traversal row by row, maintaining a boolean `take` that indicates whether the current element should be collected. Flip `take` after each element visited.
1. Iterate rows `i` from `0` to `m-1`.
2. Determine traversal direction: if `i` is even, iterate columns `0..n-1`; else `n-1..0`.
3. For each cell, if `take` is true, append the value to the result list.
4. Toggle `take` after processing each cell.

```text
FUNCTION zigzagSkip(grid):
    m ← NUMBER OF ROWS(grid)
    n ← NUMBER OF COLUMNS(grid[0])
    result ← []
    take ← TRUE
    FOR i FROM 0 TO m-1:
        IF i MOD 2 = 0:
            colRange ← 0 TO n-1
        ELSE:
            colRange ← n-1 TO 0
        FOR j IN colRange:
            IF take:
                result.APPEND(grid[i][j])
            take ← NOT take
    RETURN result
```

## Walkthrough
| Row | Direction | Cells visited (order) | Collected values |
|-----|-----------|-----------------------|------------------|
| 0 | L→R | 1,2,3 | 1,3 |
| 1 | R→L | 6,5,4 | 5 |
| 2 | L→R | 7,8,9 | 7,9 |
Result: `[1,3,5,7,9]`

## Complexity Analysis
Time: O(m·n) – each cell is visited once.
Space: O(k) for the output list, where k is the number of collected elements (≤ m·n).

## Follow‑Up Questions
1. How would you modify the algorithm to collect every `k`‑th element instead of every other?
2. Can you compute the result without storing the entire grid in memory (streaming rows)?
3. What if the traversal order should start from the bottom‑right corner and still zigzag?

## Key Takeaway
A simple toggle flag while iterating in alternating row directions efficiently implements zigzag traversal with skipping.
