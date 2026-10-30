# 296. Best Meeting Point

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/best-meeting-point](https://leetcode.com/problems/best-meeting-point)
**Companies:** Amazon, Applied Intuition, Doordash, Google, Linkedin, Meta, Microsoft, Snapchat, Twitter

---

## Problem Description
Given an `m x n` binary grid `grid` where each `1` marks the home of one friend, return *the minimal **total travel distance***.

The **total travel distance** is the sum of the distances between the houses of the friends and the meeting point.

The distance is calculated using Manhattan Distance, where `distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 ≤ m, n ≤ 200`
- `grid[i][j]` is either `0` or `1`.
- There will be **at least two** friends in the `grid`.

## Examples
```
Example 1:
  Input: grid = [[1,0,0,0,1],[0,0,0,0,0],[0,0,1,0,0]]
  Output: 6
  Explanation: Given three friends living at (0,0), (0,4), and (2,2).
  The point (0,2) is an ideal meeting point, as the total travel distance of 2 + 2 + 2 = 6 is minimal.
  So return 6.

Example 2:
  Input: grid = [[1,1]]
  Output: 1
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