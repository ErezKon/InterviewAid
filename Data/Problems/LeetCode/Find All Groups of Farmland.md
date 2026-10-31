# 1992. Find All Groups of Farmland

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-all-groups-of-farmland](https://leetcode.com/problems/find-all-groups-of-farmland)
**Companies:** Citrix, Google

---

## Problem Description

You are given a **0-indexed** `m x n` binary matrix `land` where a `0` represents a hectare of forested land and a `1` represents a hectare of farmland.

To keep the land organized, there are designated rectangular areas of hectares that consist **entirely** of farmland. These rectangular areas are called **groups**. No two groups are adjacent, meaning farmland in one group is **not** four-directionally adjacent to another farmland in a different group.

`land` can be represented by a coordinate system where the top left corner of `land` is `(0, 0)` and the bottom right corner of `land` is `(m-1, n-1)`. Find the coordinates of the top left and bottom right corner of each **group** of farmland. A **group** of farmland with a top left corner at `(r1, c1)` and a bottom right corner at `(r2, c2)` is represented by the 4-length array `[r1, c1, r2, c2]`.

Return *a 2D array containing the 4-length arrays described above for each **group** of farmland in* `land`*. If there are no groups of farmland, return an empty array. You may return the answer in **any order***.

**Constraints:**

- `m == land.length`
- `n == land[i].length`
- `1 <= m, n <= 300`
- `land` consists of only `0`'s and `1`'s.
- Groups of farmland are **rectangular** in shape.

---

## Key Insight

> Since farmland groups are guaranteed to be rectangles, when you find a top-left corner (cell is `1`, with `0` or boundary above and to the left), expand right and down to find the bottom-right corner. Mark visited cells.

---

## Approach: Greedy Scan — O(m × n) ✅

```text
FUNCTION findFarmland(land):
    m, n ← dimensions of land
    result ← []
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            IF land[r][c] == 1:
                // Find bottom-right corner of this rectangle
                r2, c2 ← r, c
                WHILE r2 + 1 < m AND land[r2 + 1][c] == 1:
                    r2 ← r2 + 1
                WHILE c2 + 1 < n AND land[r][c2 + 1] == 1:
                    c2 ← c2 + 1
                result.APPEND([r, c, r2, c2])
                // Mark the entire rectangle as visited
                FOR i ← r TO r2:
                    FOR j ← c TO c2:
                        land[i][j] ← 0
    RETURN result
```

---

## Examples

```
Example 1:
  Input: land = [[1,0,0],[0,1,1],[0,1,1]]
  Output: [[0,0,0,0],[1,1,2,2]]
  Explanation:
  The first group has a top left corner at land[0][0] and a bottom right corner at land[0][0].
  The second group has a top left corner at land[1][1] and a bottom right corner at land[2][2].
```

```
Example 2:
  Input: land = [[1,1],[1,1]]
  Output: [[0,0,1,1]]
  Explanation:
  The first group has a top left corner at land[0][0] and a bottom right corner at land[1][1].
```

```
Example 3:
  Input: land = [[0]]
  Output: []
  Explanation:
  There are no groups of farmland.
```

---

## Walkthrough

Consider the first example matrix:

1. Start at `(0,0)`, it is `1` and has no `1` above or left → top-left corner.
2. Expand down: `(1,0)` is `0`, stop. Expand right: `(0,1)` is `0`, stop. Bottom-right is also `(0,0)`.
3. Mark `(0,0)` visited.
4. Continue scanning, next unvisited `1` at `(1,1)`. Expand down to `(2,1)`, right to `(1,2)` and `(2,2)`. Bottom-right becomes `(2,2)`.
5. Record both rectangles and finish.

---

## Complexity Analysis

- **Time:** O(m × n) – each cell is visited at most once.
- **Space:** O(1) extra besides the output list.

---

## Key Takeaway

> **Rectangular groups simplify the problem: find top-left corner, expand to bottom-right, mark visited. No need for full BFS/DFS since shapes are rectangles.**