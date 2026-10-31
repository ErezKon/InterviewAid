# 3567. Minimum Absolute Difference in Sliding Submatrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-difference-in-sliding-submatrix](https://leetcode.com/problems/minimum-absolute-difference-in-sliding-submatrix)
**Companies:** Amazon, Google

---

## Problem Description

You are given an `m x n` integer matrix `grid` and an integer `k`.

For every contiguous `k x k` **submatrix** of `grid`, compute the **minimum absolute** difference between any two **distinct** values within that **submatrix**.

Return a 2D array `ans` of size `(m - k + 1) x (n - k + 1)`, where `ans[i][j]` is the minimum absolute difference in the submatrix whose top-left corner is `(i, j)` in `grid`.

**Note**: If all elements in the submatrix have the same value, the answer will be 0.

A submatrix `(x1, y1, x2, y2)` is a matrix that is formed by choosing all cells `matrix[x][y]` where `x1 <= x <= x2` and `y1 <= y <= y2`.

**Constraints:**
- `1 <= m == grid.length <= 30`
- `1 <= n == grid[i].length <= 30`
- `-10^5 <= grid[i][j] <= 10^5`
- `1 <= k <= min(m, n)`

---

## Examples

```
Example 1:
  Input: grid = [[1,8],[3,-2]], k = 2
  Output: [[2]]
  Explanation:
  - There is only one possible k x k submatrix: [[1, 8], [3, -2]].
  - Distinct values in the submatrix are [1, 8, 3, -2].
  - The minimum absolute difference in the submatrix is |1 - 3| = 2. Thus, the answer is [[2]].
```

```
Example 2:
  Input: grid = [[3,-1]], k = 1
  Output: [[0,0]]
  Explanation:
  - Both k x k submatrix has only one distinct element.
  - Thus, the answer is [[0, 0]].
```

```
Example 3:
  Input: grid = [[1,-2,3],[2,3,5]], k = 2
  Output: [[1,2]]
  Explanation:
  - There are two possible k x k submatrix:
    - Starting at (0, 0): [[1, -2], [2, 3]].
      - Distinct values in the submatrix are [1, -2, 2, 3].
      - The minimum absolute difference in the submatrix is |1 - 2| = 1.
    - Starting at (0, 1): [[-2, 3], [3, 5]].
      - Distinct values in the submatrix are [-2, 3, 5].
      - The minimum absolute difference in the submatrix is |3 - 5| = 2.
  - Thus, the answer is [[1, 2]].
```

---

## Approach

**Algorithm:** Brute-force sliding window with sorting per submatrix.

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

For the first window of Example 1 (`[[1,3],[4,6]]`):
1. Collected values → `[1,3,4,6]`
2. Sorted → `[1,3,4,6]`
3. Adjacent diffs: `2,1,2` → minimum `1`.
The same process repeats for each window.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute-force per window | O((m-k+1)(n-k+1)·k²·log(k²)) | O(k²) |
---

## Follow-Up Questions

1. How can you reduce the time using a sliding-window multiset to maintain sorted elements while moving the window?
2. What is the complexity if you pre-process rows with balanced BSTs and merge them column-wise?
3. Can the solution be adapted for non-square windows (`k×l`)?
---

## Key Takeaway

> Sorting the elements of each submatrix turns the problem into a simple adjacent-difference scan; for small `k` this brute-force method is sufficient.
