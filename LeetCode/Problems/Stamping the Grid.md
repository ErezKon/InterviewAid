# 2132. Stamping the Grid

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stamping-the-grid](https://leetcode.com/problems/stamping-the-grid)
**Companies:** Rubrik

---

## Problem Description
You are given a binary matrix `grid` of size `m × n` and a stamp shape defined by a binary matrix `stamp` of size `p × q`. In one operation you may place the stamp anywhere on the grid such that the stamp fits entirely within the grid boundaries. When placed, every cell of the grid that aligns with a `1` in the stamp is set to `0`. The goal is to turn **all** cells of `grid` to `0` using the minimum number of stamp operations. Return that minimum count, or `-1` if it is impossible.

Constraints: `1 ≤ m, n ≤ 50`, `1 ≤ p ≤ m`, `1 ≤ q ≤ n`; both matrices contain only `0` or `1`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `grid = [[1,1,1],[1,1,1],[1,1,1]]`, `stamp = [[1,0],[0,1]]` | `5` | One optimal sequence uses five stamp placements to clear all cells. |
| `grid = [[1,0],[0,1]]`, `stamp = [[1,1],[1,1]]` | `-1` | No placement can turn the isolated `1`s to `0` because the stamp always flips a `0` to `1` as well. |

## Approach
Treat each possible stamp placement as a **candidate** that can clear a set of `1`s. Build a dependency graph where a placement is usable only after all cells it would set to `0` are still `1`. Use a greedy reverse process: repeatedly find a placement whose covered `1`s are all still present, apply it (set those cells to `0`), and record the position. Continue until the grid is all `0` or no placement can be applied. The recorded positions reversed give a valid forward sequence and the count.

## Walkthrough
Consider the first example with a `3×3` grid and a `2×2` stamp `[[1,0],[0,1]]`.
1. List all 4 possible placements (top‑left corners `(0,0)`, `(0,1)`, `(1,0)`, `(1,1)`).
2. Starting from the bottom‑right, placement `(1,1)` clears cells `(1,1)` and `(2,2)`. Record `(1,1)` and update the grid.
3. Re‑evaluate placements; now `(0,1)` can clear `(0,1)` and `(1,2)`. Record and apply.
4. Continue similarly; after five placements the grid becomes all `0`.

## Complexity Analysis
- Time: `O(m·n·p·q)` – each iteration scans all placements and checks at most `p·q` cells. In the worst case we perform `m·n` iterations.
- Space: `O(m·n)` for the mutable grid and list of recorded positions.

## Follow-Up Questions
1. How would the algorithm change if the stamp could also flip `0` to `1`?
2. Can you design an `O(m·n)` solution using a queue of “ready” placements?
3. What is the minimum number of stamps needed if overlapping is prohibited?

## Key Takeaway
By repeatedly applying stamp placements that are currently valid and recording them in reverse order, you can greedily clear the grid while guaranteeing a minimal‑count solution when one exists.
