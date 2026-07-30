# 3148. Maximum Difference Score in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-difference-score-in-a-grid](https://leetcode.com/problems/maximum-difference-score-in-a-grid)
**Companies:** Intuit

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` grid, move from any cell to another cell that's to the right or below. Score = `grid[r2][c2] - grid[r1][c1]` for a single move. You can chain moves; total score = sum of differences. Maximize the score using at least one move.

---

## Examples

| Grid | Explanation |
|------|-------------|
| `[[5,1,3],[2,8,4],[6,7,9]]` | Best path: (0,1) → (1,1) → (2,2) gives score `8-1 + 9-8 = 8`. |
| `[[1,2],[3,4]]` | Move from (0,0) → (1,1): score `4-1 = 3` (single move is optimal).

---

## Approach

Use dynamic programming while scanning the grid row‑by‑row. Maintain `minVal[r][c]`, the minimum value in the rectangle from (0,0) to (r,c). For each cell, the best score ending at that cell is `grid[r][c] - minVal[r][c]`. Update the global maximum accordingly.

```text
FUNCTION maxScore(grid):
    m ← number of rows, n ← number of columns
    result ← -infinity
    CREATE matrix minVal[m][n]
    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            prevMin ← infinity
            IF r > 0: prevMin ← MIN(prevMin, minVal[r-1][c])
            IF c > 0: prevMin ← MIN(prevMin, minVal[r][c-1])
            IF prevMin != infinity:
                result ← MAX(result, grid[r][c] - prevMin)
            minVal[r][c] ← MIN(grid[r][c], prevMin if prevMin != infinity else grid[r][c])
    RETURN result
```

---

## Walkthrough

Consider the grid `[[5,1,3],[2,8,4],[6,7,9]]`.

| Step | Cell (r,c) | grid[r][c] | minVal up‑left | Candidate Score | Global Max |
|------|------------|------------|---------------|----------------|------------|
| 1 | (0,0) | 5 | 5 | — | — |
| 2 | (0,1) | 1 | 1 | — | — |
| 3 | (0,2) | 3 | 1 | 3‑1 = 2 | 2 |
| 4 | (1,0) | 2 | 2 | — | 2 |
| 5 | (1,1) | 8 | 1 | 8‑1 = 7 | 7 |
| 6 | (1,2) | 4 | 1 | 4‑1 = 3 | 7 |
| 7 | (2,0) | 6 | 2 | 6‑2 = 4 | 7 |
| 8 | (2,1) | 7 | 1 | 7‑1 = 6 | 7 |
| 9 | (2,2) | 9 | 1 | 9‑1 = 8 | **8** |

The maximum achievable score is `8`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(m·n)** | O(m·n) |

---

## Follow-Up Questions

- How would the solution change if moves could also go left or up?
- Can you reduce the space complexity to O(n) by keeping only the previous row of `minVal`?
- What if the grid values are extremely large; how would you avoid integer overflow?

---

## Key Takeaway

> **Chained differences telescope: total = endpoint - startpoint.** Track the running minimum in the top‑left rectangle to maximize each cell's contribution.
