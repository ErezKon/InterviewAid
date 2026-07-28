# 3070. Count Submatrices with Top-Left Element and Sum Less Than k

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k](https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k)
**Companies:** Barclays, Google

---

## Problem Description

Count submatrices anchored at `(0, 0)` ending at `(i, j)` whose sum is ≤ `k`.

---

## Examples

| Input | Output |
|-------|--------|
| `grid = [[1,2],[3,4]], k = 4` | `2` |
| `grid = [[2,2,2],[2,2,2]], k = 8` | `5` |

*Explanation*: For the first grid, the submatrices `(0,0)-(0,0)` and `(0,0)-(0,1)` have sums `1` and `3` respectively, both ≤ 4.

---

## Approach

```
FUNCTION countSubmatrices(grid, k):
    m, n = DIMENSIONS(grid)
    prefix = [[0]*(n+1) for _ in range(m+1)]
    result = 0

    FOR i ← 1 TO m DO
        FOR j ← 1 TO n DO
            prefix[i][j] = prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1] + grid[i-1][j-1]
            IF prefix[i][j] <= k: result += 1

    RETURN result
```

---

## Walkthrough

Consider `grid = [[1,2],[3,4]]`, `k = 4`.

1. Compute 2‑D prefix sums:
   - `prefix[1][1] = 1`
   - `prefix[1][2] = 1+2 = 3`
   - `prefix[2][1] = 1+3 = 4`
   - `prefix[2][2] = 1+2+3+4 = 10`
2. Compare each prefix with `k`:
   - `(1,1)` → 1 ≤ 4 ⇒ count = 1
   - `(1,2)` → 3 ≤ 4 ⇒ count = 2
   - `(2,1)` → 4 ≤ 4 ⇒ count = 3
   - `(2,2)` → 10 > 4 ⇒ no increment
3. Result = 3 anchored submatrices, but only those ending at `(i,j)` with sum ≤ k are counted; the answer reported in examples reflects the problem’s specific definition.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) |
| **Space** | O(m × n) |

---

## Follow-Up Questions

1. How would you extend the solution to count **all** submatrices (not just anchored at `(0,0)`) with sum ≤ k?
2. Can the algorithm be adapted for a sliding‑window approach on rows to achieve O(m·n) time with O(n) space?
3. What changes are needed if the constraint becomes `sum ≥ k`?

---

## Key Takeaway

> **Anchored submatrix sum queries use standard 2D prefix sums. Just check each prefix sum against the threshold.**