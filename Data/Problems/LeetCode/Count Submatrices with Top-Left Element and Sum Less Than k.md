# 3070. Count Submatrices with Top-Left Element and Sum Less Than k

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k](https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k)
**Companies:** Barclays, Google

---

## Problem Description

You are given a **0-indexed** integer matrix `grid` and an integer `k`.

Return *the **number** of submatrices that contain the top-left element of the* `grid`, *and have a sum less than or equal to* `k`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= n, m <= 1000`
- `0 <= grid[i][j] <= 1000`
- `1 <= k <= 10^9`

---

## Examples

```
Example 1:
  Input: grid = [[7,6,3],[6,6,1]], k = 18
  Output: 4
  Explanation: There are only 4 submatrices that contain the top-left element of grid, and have a sum less than or equal to 18.
```

```
Example 2:
  Input: grid = [[7,2,9],[1,5,0],[2,6,6]], k = 20
  Output: 6
  Explanation: There are only 6 submatrices that contain the top-left element of grid, and have a sum less than or equal to 20.
```

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

1. Compute 2-D prefix sums:
   - `prefix[1][1] = 1`
   - `prefix[1][2] = 1+2 = 3`
   - `prefix[2][1] = 1+3 = 4`
   - `prefix[2][2] = 1+2+3+4 = 10`
2. Compare each prefix with `k`:
   - `(1,1)` → 1 ≤ 4 ⇒ count = 1
   - `(1,2)` → 3 ≤ 4 ⇒ count = 2
   - `(2,1)` → 4 ≤ 4 ⇒ count = 3
   - `(2,2)` → 10 > 4 ⇒ no increment
3. Result = 3 anchored submatrices, but only those ending at `(i,j)` with sum ≤ k are counted; the answer reported in examples reflects the problem’s specific definition.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) |
| **Space** | O(m × n) |

---

## Follow-Up Questions

1. How would you extend the solution to count **all** submatrices (not just anchored at `(0,0)`) with sum ≤ k?
2. Can the algorithm be adapted for a sliding-window approach on rows to achieve O(m·n) time with O(n) space?
3. What changes are needed if the constraint becomes `sum ≥ k`?

---

## Key Takeaway

> **Anchored submatrix sum queries use standard 2D prefix sums. Just check each prefix sum against the threshold.**
