# 827. Making A Large Island

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/making-a-large-island](https://leetcode.com/problems/making-a-large-island)
**Companies:** Airbnb, Amazon, Anduril, Bloomberg, Doordash, Google, Linkedin, Medianet, Meta, Microsoft, Moloco, Snapchat, Snowflake, Tiktok, Uber, Uipath

---

## Problem Description
Given an `n × n` binary grid `grid` where `1` represents land and `0` represents water, you may change at most one `0` to `1`. Return the size of the largest island possible after this operation. An island is a group of `1`s connected 4‑directionally.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[[1,0],[0,1]]` | `3` | Flipping the top‑right `0` connects the two islands into one of size 3. |
| `[[1,1],[1,0]]` | `4` | Flipping the bottom‑right `0` yields a full 2×2 island. |

## Approach
Label each existing island with a unique ID and record its area (Component Labeling). Then, for every water cell, look at the distinct neighboring island IDs, sum their areas, add one for the flipped cell, and track the maximum.

```text
FUNCTION largestIsland(grid):
    n ← LENGTH(grid)
    label ← 2                     // start from 2 to avoid confusion with 0/1
    areaMap ← MAP                // label → area
    // First pass: label islands and compute areas
    FOR r FROM 0 TO n-1:
        FOR c FROM 0 TO n-1:
            IF grid[r][c] = 1:
                area ← dfsLabel(grid, r, c, label)
                areaMap[label] ← area
                label ← label + 1
    maxArea ← MAX(areaMap.values()) IF areaMap NOT EMPTY ELSE 0
    // Second pass: evaluate each water cell
    FOR r FROM 0 TO n-1:
        FOR c FROM 0 TO n-1:
            IF grid[r][c] = 0:
                neighborLabels ← SET()
                FOR (nr, nc) IN fourNeighbors(r, c, n):
                    IF grid[nr][nc] > 1:
                        neighborLabels.ADD(grid[nr][nc])
                combined ← 1 + SUM(areaMap[id] FOR id IN neighborLabels)
                maxArea ← MAX(maxArea, combined)
    RETURN maxArea

FUNCTION dfsLabel(grid, r, c, label):
    // Flood‑fill to label the island and count its cells
    IF r < 0 OR r ≥ n OR c < 0 OR c ≥ n OR grid[r][c] ≠ 1:
        RETURN 0
    grid[r][c] ← label
    size ← 1
    FOR (nr, nc) IN fourNeighbors(r, c, n):
        size ← size + dfsLabel(grid, nr, nc, label)
    RETURN size
```
`fourNeighbors` returns the four orthogonal adjacent coordinates.

## Walkthrough
For `grid = [[1,0],[0,1]]`:
1. First pass labels the two `1`s as islands `2` and `3` with areas `1` each.
2. Second pass examines the `0` at (0,1): neighboring labels `{2}` → combined `1+1=2`.
3. Examines `0` at (1,0): neighboring labels `{2,3}` → combined `1+1+1=3` → `maxArea = 3`.
4. Return `3`.

## Complexity Analysis
*Time*: **O(n²)** – each cell is visited a constant number of times.
*Space*: **O(n²)** for the label grid and area map (can be reduced to O(n²) in‑place).

## Follow‑Up Questions
1. How would you adapt the solution for a rectangular `m × n` grid?
2. Can you achieve the same result with **O(1)** extra space by modifying the input grid in place?
3. What changes are needed if you may flip **up to k** water cells instead of just one?

## Key Takeaway
Labeling islands once and then evaluating each water cell with a set of neighboring IDs lets you compute the optimal flip in linear time relative to the grid size.
