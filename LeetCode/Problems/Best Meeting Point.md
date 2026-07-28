# 296. Best Meeting Point

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/best-meeting-point](https://leetcode.com/problems/best-meeting-point)
**Companies:** Amazon, Applied Intuition, Doordash, Google, Linkedin, Meta, Microsoft, Snapchat, Twitter

---

## Problem Description
Given a 2D grid of size `m x n` containing `0`s (empty) and `1`s (people’s homes), find a meeting point (any cell) that minimizes the sum of Manhattan distances from all homes to that point. Return the minimum total distance.

## Examples
**Example 1:**
```
Input: grid = [[1,0,0,0,1],[0,0,0,0,0],[0,0,1,0,0]]
Output: 6
Explanation: Choosing cell (0,2) yields total distance 6.
```

**Example 2:**
```
Input: grid = [[1,1]]
Output: 1
Explanation: The optimal meeting point is at either home.
```

## Approach
**Median — O(m·n)**
Collect the row indices and column indices of all `1`s separately, sort each list, and pick the median of each. The Manhattan distance separates into independent row and column components, each minimized by the median.

```text
FUNCTION minTotalDistance(grid):
    rows ← []
    cols ← []
    FOR r ← 0 TO ROWS(grid)-1:
        FOR c ← 0 TO COLS(grid)-1:
            IF grid[r][c] = 1:
                rows.APPEND(r)
                cols.APPEND(c)
    SORT(rows)
    SORT(cols)
    medianR ← rows[ LENGTH(rows) // 2 ]
    medianC ← cols[ LENGTH(cols) // 2 ]
    total ← 0
    FOR r IN rows:
        total ← total + ABS(r - medianR)
    FOR c IN cols:
        total ← total + ABS(c - medianC)
    RETURN total
```

## Walkthrough
For the first example, `rows = [0,0,2]` → medianR = 0, `cols = [0,1,4]` → medianC = 1. Sum of |row‑medianR| = 0+0+2 = 2, sum of |col‑medianC| = 1+0+3 = 4, total = 6.

## Complexity Analysis
- **Time:** O(m·n) to scan the grid, plus O(k log k) for sorting `k` homes (k ≤ m·n).
- **Space:** O(k) for the row and column lists.

## Follow‑Up Questions
1. How would the solution change for Euclidean distance?
2. Can you solve it in O(m·n) time without explicit sorting?
3. What if the meeting point must be an existing home cell?

## Key Takeaway
The Manhattan distance separates into independent dimensions, and the median of each dimension yields the optimal meeting point, turning a 2‑D optimization into two 1‑D problems.