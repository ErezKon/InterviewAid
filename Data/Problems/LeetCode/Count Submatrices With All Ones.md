# 1504. Count Submatrices With All Ones

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-submatrices-with-all-ones](https://leetcode.com/problems/count-submatrices-with-all-ones)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` binary matrix `mat`, return the number of submatrices (any rectangle, not just squares) that have **all ones**.

**Constraints:**
- `1 <= m, n <= 150`

---

## Examples

| mat | Output |
|-----|--------|
| `[[1,0,1],[1,1,0],[1,1,0]]` | `13` |
| `[[1,1,1],[1,1,1]]` | `36` |
| `[[0,0],[0,0]]` | `0` |

**Explanation:**
- In the first example, there are 13 submatrices consisting entirely of ones.
- In the second example, every possible submatrix (including all individual cells) contains only ones, totaling 36.
- The third example has no ones, so the count is 0.

---

## Key Insight

For each cell `(r, c)`, precompute `mat[r][c]` = consecutive ones to the right. Then for each cell, expand upwards, tracking the minimum width. Each minimum width at height `k` contributes `minWidth` submatrices (rectangles of width 1..minWidth with that bottom‑left corner).

---

## Approach

```text
FUNCTION numSubmat(mat):
    m, n ← DIMENSIONS(mat)
    // Compute consecutive ones to the right for each cell
    FOR r ← 0 TO m - 1 DO
        FOR c ← n - 2 DOWN TO 0 DO
            IF mat[r][c] = 1 THEN
                mat[r][c] ← mat[r][c] + mat[r][c + 1]
    count ← 0
    // Expand upward from each cell, tracking the narrowest width
    FOR r ← 0 TO m - 1 DO
        FOR c ← 0 TO n - 1 DO
            minWidth ← INFINITY
            FOR k ← r DOWN TO 0 DO
                IF mat[k][c] = 0 THEN BREAK
                minWidth ← MIN(minWidth, mat[k][c])
                count ← count + minWidth
    RETURN count
```

---

## Walkthrough

**Input:** `mat = [[1,0,1],[1,1,0],[1,1,0]]`

1. **Compute consecutive‑right ones:**
   - Row 0: `[1,0,1]` → stays `[1,0,1]`
   - Row 1: `[1,1,0]` → becomes `[2,1,0]`
   - Row 2: `[1,1,0]` → becomes `[2,1,0]`
2. **Iterate each cell as bottom‑left corner:**
   - For cell `(0,0)`: expand up → only itself, `minWidth=1`, add 1.
   - For cell `(1,0)`: expand up rows 1→0, widths 2 then 1, contributions 2 + 1 = 3.
   - Continue similarly for all cells; the sum of all contributions equals **13**.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m² × n) — each cell may expand up to `m` rows upward |
| **Space** | O(1) extra (in‑place modification of `mat`) |

---

## Follow-Up Questions

- How would the algorithm change if we needed to count submatrices with all values **greater than or equal to** a threshold `k` instead of just ones?
- Can this approach be adapted to count submatrices with **exactly** `t` ones?
- What is the time‑space trade‑off if we pre‑compute column‑wise histograms instead of row‑wise consecutive ones?

---

## Key Takeaway

> **Count all‑ones submatrices by precomputing consecutive ones to the right, then for each cell expand upward while tracking the narrowest width. Each step adds that width to the total, extending the histogram technique from squares to arbitrary rectangles.**