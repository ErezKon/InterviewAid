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

You are given an `m x n` matrix `grid` consisting of **positive** integers. You can move from a cell in the matrix to **any** other cell that is either to the bottom or to the right (not necessarily adjacent). The score of a move from a cell with the value `c1` to a cell with the value `c2` is `c2 - c1`.

You can start at **any** cell, and you have to make **at least** one move.

Return the **maximum** total score you can achieve.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `2 <= m, n <= 1000`
- `4 <= m * n <= 10^5`
- `1 <= grid[i][j] <= 10^5`

---

## Examples

**Example 1:**
```
Input: grid = [[9,5,7,3],[8,9,6,1],[6,7,14,3],[2,5,3,1]]
Output: 9
Explanation: We start at the cell (0, 1), and we perform the following moves:
- Move from the cell (0, 1) to (2, 1) with a score of 7 - 5 = 2.
- Move from the cell (2, 1) to (2, 2) with a score of 14 - 7 = 7.
The total score is 2 + 7 = 9.
```

**Example 2:**
```
Input: grid = [[4,3,2],[3,2,1]]
Output: -1
Explanation: We start at the cell (0, 0), and we perform one move: (0, 0) to (0, 1). The score is 3 - 4 = -1.
```

---

## Approach

Use dynamic programming while scanning the grid row-by-row. Maintain `minVal[r][c]`, the minimum value in the rectangle from (0,0) to (r,c). For each cell, the best score ending at that cell is `grid[r][c] - minVal[r][c]`. Update the global maximum accordingly.

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

| Step | Cell (r,c) | grid[r][c] | minVal up-left | Candidate Score | Global Max |
|------|------------|------------|---------------|----------------|------------|
| 1 | (0,0) | 5 | 5 | — | — |
| 2 | (0,1) | 1 | 1 | — | — |
| 3 | (0,2) | 3 | 1 | 3-1 = 2 | 2 |
| 4 | (1,0) | 2 | 2 | — | 2 |
| 5 | (1,1) | 8 | 1 | 8-1 = 7 | 7 |
| 6 | (1,2) | 4 | 1 | 4-1 = 3 | 7 |
| 7 | (2,0) | 6 | 2 | 6-2 = 4 | 7 |
| 8 | (2,1) | 7 | 1 | 7-1 = 6 | 7 |
| 9 | (2,2) | 9 | 1 | 9-1 = 8 | **8** |

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

> **Chained differences telescope: total = endpoint - startpoint.** Track the running minimum in the top-left rectangle to maximize each cell's contribution.
