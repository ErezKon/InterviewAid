# 764. Largest Plus Sign

**Difficulty:** 🟡 Medium
**Companies:** Meta, Twitter

---

## 1. Problem Description

Given an `n × n` grid with some mines, find the order (arm length) of the largest axis‑aligned plus sign (+) consisting solely of 1s. Return 0 if none exists.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 5, mines = [[4,2]]` | `2` | The largest plus sign has arms of length 2 centered at (2,2). |
| `n = 2, mines = []` | `1` | A 2×2 grid without mines yields a plus sign of order 1 at any cell. |
| `n = 1, mines = [[0,0]]` | `0` | The only cell is a mine, so no plus sign.

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

## 6. Follow‑Up Questions

- How would you adapt the algorithm for a rectangular grid (m × n)?
- Can the space be reduced to O(n) by reusing rows?
- What changes are needed if mines are added dynamically after initial computation?

---

## Key Takeaway

> By computing the longest stretch of 1s in all four directions for each cell, the plus sign order is simply the minimum of those four values.
