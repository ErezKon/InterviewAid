# 3446. Sort Matrix by Diagonals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-matrix-by-diagonals](https://leetcode.com/problems/sort-matrix-by-diagonals)
**Companies:** Amazon, Google, Meta, Microsoft, Verizon

---

## Problem Description

You are given an `n x n` square matrix of integers `grid`. Return the matrix such that:

- The diagonals in the **bottom-left triangle** (including the middle diagonal) are sorted in **non-increasing order**.
- The diagonals in the **top-right triangle** are sorted in **non-decreasing order**.

**Constraints:**
- `grid.length == grid[i].length == n`
- `1 <= n <= 10`
- `-10⁵ <= grid[i][j] <= 10⁵`

### Examples

```
Example 1:
  Input: grid = [[1,7,3],[9,8,2],[4,5,6]]
  Output: [[8,2,3],[9,6,7],[4,5,1]]
  Explanation:
    The diagonals in the bottom-left triangle should be sorted in non-increasing order:
      - [1, 8, 6] becomes [8, 6, 1].
      - [9, 5] and [4] remain unchanged.
    The diagonals in the top-right triangle should be sorted in non-decreasing order:
      - [7, 2] becomes [2, 7].
      - [3] remains unchanged.
```

```
Example 2:
  Input: grid = [[0,1],[1,2]]
  Output: [[2,1],[1,0]]
  Explanation: The diagonals in the bottom-left triangle must be non-increasing, so [0, 2] is changed to [2, 0]. The other diagonals are already in the correct order.
```

```
Example 3:
  Input: grid = [[1]]
  Output: [[1]]
  Explanation: Diagonals with exactly one element are already in order, so no changes are needed.
```

## Approach: Group by Diagonal — O(mn log(min(m,n))) ✅

**Key Insight:** Diagonals share the same `r - c` value. Group elements by diagonal, sort, and place back.

```
FUNCTION sortMatrix(mat):
    m, n = dimensions
    // For each diagonal (identified by r - c):
    diags = defaultdict(list)
    FOR r, c: diags[r - c].ADD(mat[r][c])
    FOR key: SORT diags[key] (ascending for lower-left, descending for upper-right based on problem)

    // Place back
    idx = defaultdict(int)
    FOR r, c:
        d = r - c
        mat[r][c] = diags[d][idx[d]]
        idx[d] += 1
    RETURN mat
```

### Complexity

| | |
|---|---|
| **Time** | O(m·n·log(min(m,n))) |
| **Space** | O(m·n) |
