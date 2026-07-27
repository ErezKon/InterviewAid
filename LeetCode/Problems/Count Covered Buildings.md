# 3531. Count Covered Buildings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-covered-buildings](https://leetcode.com/problems/count-covered-buildings)
**Companies:** Amazon, Google

---

## 1. Problem Description

Given buildings on a 2D grid, count buildings that are "covered" — there exists at least one other building in each of the four cardinal directions (up, down, left, right) on the same row or column.

---

## 2. Key Insight

> For each building, it's covered if there's a building above and below in the same column, and a building left and right in the same row. Precompute min/max row per column and min/max column per row.

---

## 3. Approach: Min/Max per Row and Column — O(n) ✅

```
FUNCTION countCoveredBuildings(n, buildings):
    rowMin = {}; rowMax = {}  // per row: min and max column
    colMin = {}; colMax = {}  // per column: min and max row
    
    FOR x, y IN buildings:
        update rowMin[x], rowMax[x] with y
        update colMin[y], colMax[y] with x
    
    count = 0
    FOR x, y IN buildings:
        IF colMin[y] < x < colMax[y] AND rowMin[x] < y < rowMax[x]:
            count += 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) where n = number of buildings | O(n) |

---

## Key Takeaway

> A building is covered iff it's strictly between the min and max in both its row and column. Precompute extremes per row/column in one pass.
