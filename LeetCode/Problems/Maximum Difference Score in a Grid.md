# 3148. Maximum Difference Score in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-difference-score-in-a-grid](https://leetcode.com/problems/maximum-difference-score-in-a-grid)
**Companies:** Intuit

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DP with Running Min — O(m·n)](#approach-dp-with-running-min--omn-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` grid, move from any cell to another cell that's to the right or below. Score = `grid[r2][c2] - grid[r1][c1]` for a single move. You can chain moves; total score = sum of differences. Maximize the score using at least one move.

---

## Key Insight

> A chain of moves from (r1,c1) → (r2,c2) → ... → (rk,ck) telescopes: total = `grid[rk][ck] - grid[r1][c1]`. So the answer is `max(grid[r][c] - minAboveLeft)` where minAboveLeft is the minimum in the top-left rectangle. Track this running min with DP.

---

## Approach: DP with Running Min — O(m·n) ✅

```
FUNCTION maxScore(grid):
    m, n = dimensions
    result = -infinity
    // minVal[r][c] = min value in grid[0..r][0..c]
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            prevMin = infinity
            IF r > 0: prevMin = MIN(prevMin, minVal[r-1][c])
            IF c > 0: prevMin = MIN(prevMin, minVal[r][c-1])
            IF prevMin != infinity:
                result = MAX(result, grid[r][c] - prevMin)
            minVal[r][c] = MIN(grid[r][c], prevMin if prevMin != infinity else grid[r][c])
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(m·n)** | O(m·n) |

---

## Key Takeaway

> **Chained differences telescope: total = endpoint - startpoint.** Track the running minimum in the top-left rectangle to maximize each cell's contribution.
