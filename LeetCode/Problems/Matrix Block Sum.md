# 1314. Matrix Block Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/matrix-block-sum](https://leetcode.com/problems/matrix-block-sum)
**Companies:** Google, Visa

---

## 1. Problem Description

For each cell in an `m × n` matrix, compute the sum of all elements within a square block centered at that cell with radius `k`. The block includes all cells whose row and column indices differ from the center by at most `k`, clipped to the matrix boundaries.

---

## 2. Approach: 2D Prefix Sum — O(m·n) ✅

```text
FUNCTION matrixBlockSum(mat, k):
    m ← NUMBER OF ROWS(mat)
    n ← NUMBER OF COLUMNS(mat)
    // Build prefix sum matrix with an extra row and column of zeros
    prefix ← MATRIX(m+1, n+1) FILLED WITH 0
    FOR i ← 1 TO m:
        FOR j ← 1 TO n:
            prefix[i][j] ← mat[i-1][j-1] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]
    result ← MATRIX(m, n)
    FOR i ← 0 TO m-1:
        FOR j ← 0 TO n-1:
            r1 ← MAX(0, i - k)
            c1 ← MAX(0, j - k)
            r2 ← MIN(m-1, i + k)
            c2 ← MIN(n-1, j + k)
            // Convert to prefix indices (+1)
            sum ← prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]
            result[i][j] ← sum
    RETURN result
```

| Time | Space |
|------|-------|
| O(m·n) | O(m·n) |

---

## 3. Examples

| mat | k | Output |
|-----|---|--------|
| `[[1,2,3],[4,5,6],[7,8,9]]` | 1 | `[[12,21,16],[27,45,33],[24,39,28]]` |
| `[[1,2,3],[4,5,6],[7,8,9]]` | 2 | `[[45,45,45],[45,45,45],[45,45,45]]` |

---

## 4. Walkthrough

Take the first example with `k = 1`.
1. Build the prefix matrix (extra row/col of zeros). For cell `(1,1)` (value 2), the prefix sum up to that point is `1+2+4+5 = 12`.
2. For output cell `(0,0)`, block corners are `(0,0)` to `(1,1)`. Using the prefix formula yields `12`.
3. Repeat for each cell; cells near the border have smaller blocks automatically because `r1,c1,r2,c2` are clamped.

---

## 5. Complexity Analysis

*Time*: Building the prefix matrix takes O(m·n). Querying each cell also O(m·n), so total O(m·n).
*Space*: The prefix matrix uses O(m·n) extra space (can be optimized to O(n) with rolling rows, but O(m·n) is standard).

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to support rectangular blocks with different row and column radii?
2. Can you compute the block sums in‑place without extra O(m·n) space?
3. How would you handle updates to the matrix (e.g., changing a cell value) efficiently?

---

## Key Takeaway

> 2D prefix sums turn a naïve O(m·n·k²) block‑sum computation into O(m·n) by pre‑computing cumulative sums and using inclusion‑exclusion for constant‑time queries.
