# 764. Largest Plus Sign

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-plus-sign](https://leetcode.com/problems/largest-plus-sign)
**Companies:** Meta, Twitter

---

## 1. Problem Description

You are given an integer `n`. You have an `n x n` binary grid `grid` with all values initially `1`'s except for some indices given in the array `mines`. The `i`-th element of the array `mines` is defined as `mines[i] = [x_i, y_i]` where `grid[x_i][y_i] == 0`.

Return *the order of the largest **axis-aligned** plus sign of* 1*'s contained in* `grid`. If there is none, return `0`.

An **axis-aligned plus sign** of `1`'s of order `k` has some center `grid[r][c] == 1` along with four arms of length `k - 1` going up, down, left, and right, and made of `1`'s. Note that there could be `0`'s or `1`'s beyond the arms of the plus sign, only the relevant area of the plus sign is checked for `1`'s.

**Constraints:**
- `1 <= n <= 500`
- `1 <= mines.length <= 5000`
- `0 <= x_i, y_i < n`
- All the pairs `(x_i, y_i)` are **unique**.

---

## 2. Examples

```
Example 1:
  Input: n = 5, mines = [[4,2]]
  Output: 2
  Explanation: In the 5x5 grid (only cell (4,2) is 0), the largest plus sign can only be of order 2.
  One of them is centered at (2,2) with arms of length 1.
```

```
Example 2:
  Input: n = 1, mines = [[0,0]]
  Output: 0
  Explanation: There is no plus sign, so return 0.
```

---

## 3. Approach: DP in Four Directions — O(n²) ✅

```text
FUNCTION orderOfLargestPlusSign(n, mines):
    // Initialize DP arrays for each direction with zeros
    SET left, right, up, down ← 2D arrays of size n×n filled with 0
    SET banned ← SET of mine coordinates

    // Left to Right pass
    FOR r ← 0 TO n-1:
        SET count ← 0
        FOR c ← 0 TO n-1:
            IF (r,c) IN banned:
                SET count ← 0
                SET left[r][c] ← 0
            ELSE:
                SET count ← count + 1
                SET left[r][c] ← count

    // Right to Left pass
    FOR r ← 0 TO n-1:
        SET count ← 0
        FOR c ← n-1 DOWN TO 0:
            IF (r,c) IN banned:
                SET count ← 0
                SET right[r][c] ← 0
            ELSE:
                SET count ← count + 1
                SET right[r][c] ← count

    // Top to Bottom pass
    FOR c ← 0 TO n-1:
        SET count ← 0
        FOR r ← 0 TO n-1:
            IF (r,c) IN banned:
                SET count ← 0
                SET up[r][c] ← 0
            ELSE:
                SET count ← count + 1
                SET up[r][c] ← count

    // Bottom to Top pass
    FOR c ← 0 TO n-1:
        SET count ← 0
        FOR r ← n-1 DOWN TO 0:
            IF (r,c) IN banned:
                SET count ← 0
                SET down[r][c] ← 0
            ELSE:
                SET count ← count + 1
                SET down[r][c] ← count

    // Compute maximum order
    SET maxOrder ← 0
    FOR r ← 0 TO n-1:
        FOR c ← 0 TO n-1:
            SET order ← MIN(left[r][c], right[r][c], up[r][c], down[r][c])
            SET maxOrder ← MAX(maxOrder, order)
    RETURN maxOrder
```

---

## 4. Walkthrough

For `n = 5, mines = [[4,2]]`:

1. All cells start with count 0. After the four DP passes, each cell holds the length of consecutive 1s up to that cell in each direction.
2. The cell (2,2) ends up with left=3, right=3, up=3, down=3 → order = 3.
3. Since order is defined as arm length, the final answer is `order - 1 = 2`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n²) for four passes | O(n²) for DP tables |

---

## 6. Follow-Up Questions

- How would you adapt the algorithm for a rectangular grid (m × n)?
- Can the space be reduced to O(n) by reusing rows?
- What changes are needed if mines are added dynamically after initial computation?

---

## Key Takeaway

> By computing the longest stretch of 1s in all four directions for each cell, the plus sign order is simply the minimum of those four values.
