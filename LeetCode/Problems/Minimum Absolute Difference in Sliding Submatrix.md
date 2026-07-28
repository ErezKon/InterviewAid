# 3567. Minimum Absolute Difference in Sliding Submatrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-in-sliding-submatrix](https://leetcode.com/problems/minimum-absolute-difference-in-sliding-submatrix)
**Companies:** Amazon, Google

---

## Problem Description

Given an `m × n` integer matrix `grid` and an integer `k`, for every possible `k × k` submatrix compute the minimum absolute difference between any two distinct elements inside that submatrix.

Return a matrix of size `(m‑k+1) × (n‑k+1)` where each entry corresponds to the answer for the submatrix with its top‑left corner at that position.

Constraints:
- `1 <= m, n <= 100`
- `1 <= k <= min(m, n)`
- `0 <= grid[i][j] <= 10^4`

---

## Examples

**Example 1:**
```
Input: grid = [[1,3,2],[4,6,5],[7,9,8]], k = 2
Output: [[1,1],[1,1]]
Explanation: Each 2×2 submatrix contains numbers with a minimum difference of 1.
```

**Example 2:**
```
Input: grid = [[5,5],[5,5]], k = 2
Output: [[0]]
Explanation: All values are equal, so the minimum difference is 0.
```

---

## Approach

**Algorithm:** Brute‑force sliding window with sorting per submatrix.

Key insight: For a fixed `k × k` window, collecting its `k²` elements, sorting them, and checking adjacent differences yields the minimum absolute difference.

Pseudocode:
```text
FUNCTION minAbsDiffSubmatrix(grid, k):
    m ← ROW_COUNT(grid)
    n ← COL_COUNT(grid)
    rows ← m - k + 1
    cols ← n - k + 1
    CREATE result[rows][cols]
    FOR r ← 0 TO rows-1 DO
        FOR c ← 0 TO cols-1 DO
            vals ← []
            // collect elements of the k×k window
            FOR i ← 0 TO k-1 DO
                FOR j ← 0 TO k-1 DO
                    APPEND grid[r+i][c+j] TO vals
            SORT vals
            minDiff ← INFINITY
            FOR i ← 1 TO LEN(vals)-1 DO
                diff ← ABS(vals[i] - vals[i-1])
                IF diff < minDiff THEN
                    minDiff ← diff
            IF minDiff = INFINITY THEN
                minDiff ← 0
            result[r][c] ← minDiff
    RETURN result
```
---

## Walkthrough

For the first window of Example 1 (`[[1,3],[4,6]]`):
1. Collected values → `[1,3,4,6]`
2. Sorted → `[1,3,4,6]`
3. Adjacent diffs: `2,1,2` → minimum `1`.
The same process repeats for each window.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute‑force per window | O((m‑k+1)(n‑k+1)·k²·log(k²)) | O(k²) |
---

## Follow‑Up Questions

1. How can you reduce the time using a sliding‑window multiset to maintain sorted elements while moving the window?
2. What is the complexity if you pre‑process rows with balanced BSTs and merge them column‑wise?
3. Can the solution be adapted for non‑square windows (`k×l`)?
---

## Key Takeaway

> Sorting the elements of each submatrix turns the problem into a simple adjacent‑difference scan; for small `k` this brute‑force method is sufficient.
