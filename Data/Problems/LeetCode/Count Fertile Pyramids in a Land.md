# 2088. Count Fertile Pyramids in a Land

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-fertile-pyramids-in-a-land](https://leetcode.com/problems/count-fertile-pyramids-in-a-land)
**Companies:** Google

---

## 1. Problem Description

A farmer has a **rectangular grid** of land with `m` rows and `n` columns that can be divided into unit cells. Each cell is either **fertile** (represented by a `1`) or **barren** (represented by a `0`). All cells outside the grid are considered barren.

A **pyramidal plot** of land can be defined as a set of cells with the following criteria:

- The number of cells in the set has to be **greater than **`1` and all cells must be **fertile**.
- The **apex** of a pyramid is the **topmost** cell of the pyramid. The **height** of a pyramid is the number of rows it covers. Let `(r, c)` be the apex of the pyramid, and its height be `h`. Then, the plot comprises of cells `(i, j)` where `r <= i <= r + h - 1` **and** `c - (i - r) <= j <= c + (i - r)`.

An **inverse pyramidal plot** of land can be defined as a set of cells with similar criteria:

- The number of cells in the set has to be **greater than **`1` and all cells must be **fertile**.
- The **apex** of an inverse pyramid is the **bottommost** cell of the inverse pyramid. The **height** of an inverse pyramid is the number of rows it covers. Let `(r, c)` be the apex of the pyramid, and its height be `h`. Then, the plot comprises of cells `(i, j)` where `r - h + 1 <= i <= r` **and** `c - (r - i) <= j <= c + (r - i)`.

Some examples of valid and invalid pyramidal (and inverse pyramidal) plots are shown below. Black cells indicate fertile cells.
![img](https://assets.leetcode.com/uploads/2021/11/08/image.png)
Given a **0-indexed** `m x n` binary matrix `grid` representing the farmland, return *the **total number** of pyramidal and inverse pyramidal plots that can be found in* `grid`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 1000`
- `1 <= m * n <= 10^5`
- `grid[i][j]` is either `0` or `1`.

---

## 2. Approach: DP with Prefix Sums — O(m × n) ✅

```text
FUNCTION countPyramids(grid):
    m, n ← dimensions of grid
    // Helper to count pyramids in one direction
    FUNCTION countDirection(mat):
        dp ← matrix of zeros with size m × n
        total ← 0
        FOR r FROM 1 TO m-1:
            FOR c FROM 1 TO n-2:
                IF mat[r][c] == 1:
                    // Check that the three cells below form a larger base
                    dp[r][c] ← MIN(dp[r-1][c-1], dp[r-1][c], dp[r-1][c+1]) + 1
                    // Subtract height 1 because a single cell is not a pyramid
                    total ← total + dp[r][c] - 1
        RETURN total
    // Count pyramids (apex at top) and inverse pyramids (apex at bottom)
    RETURN countDirection(grid) + countDirection(REVERSE_ROWS(grid))
```

---

## Examples

**Example 1:**
```
Input: grid = [[0,1,1,0],[1,1,1,1]]
Output: 2
Explanation: The 2 possible pyramidal plots are shown in blue and red respectively.
There are no inverse pyramidal plots in this grid.
Hence total number of pyramidal and inverse pyramidal plots is 2 + 0 = 2.
```

**Example 2:**
```
Input: grid = [[1,1,1],[1,1,1]]
Output: 2
Explanation: The pyramidal plot is shown in blue, and the inverse pyramidal plot is shown in red.
Hence the total number of plots is 1 + 1 = 2.
```

**Example 3:**
```
Input: grid = [[1,1,1,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,0,0,1]]
Output: 13
Explanation: There are 7 pyramidal plots, 3 of which are shown in the 2nd and 3rd figures.
There are 6 inverse pyramidal plots, 2 of which are shown in the last figure.
The total number of plots is 7 + 6 = 13.
```

---

## Walkthrough

For the first example:
| Cell (r,c) | dp value | Reason |
|------------|----------|--------|
| (1,1) | 1 | Base of height 1 (single cell) |
| (2,1) | 2 | Minimum of three cells above (1,0),(1,1),(1,2) is 1 → +1 |
The contribution `dp-1` adds 1 pyramid of height 2. The same process on the reversed grid yields the inverse pyramid.

---

## Complexity Analysis

- **Time:** O(m × n) – each cell is visited a constant number of times.
- **Space:** O(m × n) for the DP table (can be reduced to O(n) with rolling arrays).

---

## Follow-Up Questions

1. How would you modify the algorithm to count only pyramids (or only inverse pyramids)?
2. Can the DP be optimized to O(1) extra space?
3. What if the matrix contains values other than 0/1, and a pyramid requires all cells ≥ a threshold?

---

## Key Takeaway

> DP captures the maximal pyramid height at each apex by looking at the three cells directly below (or above). Summing `height-1` across the grid yields the total number of pyramids and inverse pyramids.
