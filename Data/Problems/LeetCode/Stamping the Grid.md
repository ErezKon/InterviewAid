# 2132. Stamping the Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stamping-the-grid](https://leetcode.com/problems/stamping-the-grid)
**Companies:** Rubrik

---

## Problem Description

You are given an `m x n` binary matrix `grid` where each cell is either `0` (empty) or `1` (occupied).

You are then given stamps of size `stampHeight x stampWidth`. We want to fit the stamps such that they follow the given **restrictions** and **requirements**:

- Cover all the **empty** cells.
- Do not cover any of the **occupied** cells.
- We can put as **many** stamps as we want.
- Stamps can **overlap** with each other.
- Stamps are not allowed to be **rotated**.
- Stamps must stay completely **inside** the grid.

Return `true` *if it is possible to fit the stamps while following the given restrictions and requirements. Otherwise, return* `false`.

**Constraints:**
- `m == grid.length`
- `n == grid[r].length`
- `1 <= m, n <= 10^5`
- `1 <= m * n <= 2 * 10^5`
- `grid[r][c]` is either `0` or `1`.
- `1 <= stampHeight, stampWidth <= 10^5`

## Examples

**Example 1:**
```
Input: grid = [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]], stampHeight = 4, stampWidth = 3
Output: true
Explanation: We have two overlapping stamps (labeled 1 and 2 in the image) that are able to cover all the empty cells.
```

**Example 2:**
```
Input: grid = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], stampHeight = 2, stampWidth = 2
Output: false
Explanation: There is no way to fit the stamps onto all the empty cells without the stamps going outside the grid.
```

## Approach
Treat each possible stamp placement as a **candidate** that can clear a set of `1`s. Build a dependency graph where a placement is usable only after all cells it would set to `0` are still `1`. Use a greedy reverse process: repeatedly find a placement whose covered `1`s are all still present, apply it (set those cells to `0`), and record the position. Continue until the grid is all `0` or no placement can be applied. The recorded positions reversed give a valid forward sequence and the count.

## Walkthrough
Consider the first example with a `3×3` grid and a `2×2` stamp `[[1,0],[0,1]]`.
1. List all 4 possible placements (top-left corners `(0,0)`, `(0,1)`, `(1,0)`, `(1,1)`).
2. Starting from the bottom-right, placement `(1,1)` clears cells `(1,1)` and `(2,2)`. Record `(1,1)` and update the grid.
3. Re-evaluate placements; now `(0,1)` can clear `(0,1)` and `(1,2)`. Record and apply.
4. Continue similarly; after five placements the grid becomes all `0`.

## Complexity Analysis
- Time: `O(m·n·p·q)` – each iteration scans all placements and checks at most `p·q` cells. In the worst case we perform `m·n` iterations.
- Space: `O(m·n)` for the mutable grid and list of recorded positions.

## Follow-Up Questions
1. How would the algorithm change if the stamp could also flip `0` to `1`?
2. Can you design an `O(m·n)` solution using a queue of “ready” placements?
3. What is the minimum number of stamps needed if overlapping is prohibited?

## Key Takeaway
By repeatedly applying stamp placements that are currently valid and recording them in reverse order, you can greedily clear the grid while guaranteeing a minimal-count solution when one exists.
