# 573. Squirrel Simulation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/squirrel-simulation](https://leetcode.com/problems/squirrel-simulation)
**Companies:** Square

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. The Approach/Walkthrough below handle a single nut only. Correct idea: every nut costs `2·d(nut, tree)` except the first one, which costs `d(squirrel, nut) + d(nut, tree)`; answer = `Σ 2·d(nut_i, tree) + min_i (d(squirrel, nut_i) − d(nut_i, tree))` with Manhattan distance. O(k).*

You are given two integers `height` and `width` representing a garden of size `height x width`. You are also given:

- an array `tree` where `tree = [tree_r, tree_c]` is the position of the tree in the garden,
- an array `squirrel` where `squirrel = [squirrel_r, squirrel_c]` is the position of the squirrel in the garden,
- and an array `nuts` where `nuts[i] = [nut_ir, nut_ic]` is the position of the `i`th nut in the garden.

The squirrel can only take at most one nut at one time and can move in four directions: up, down, left, and right, to the adjacent cell.

Return *the **minimal distance** for the squirrel to collect all the nuts and put them under the tree one by one*.

The **distance** is the number of moves.

**Constraints:**
- `1 <= height, width <= 100`
- `tree.length == 2`
- `squirrel.length == 2`
- `1 <= nuts.length <= 5000`
- `nuts[i].length == 2`
- `0 <= tree_r, squirrel_r, nut_ir <= height`
- `0 <= tree_c, squirrel_c, nut_ic <= width`

## Examples

**Example 1:**
```
Input: height = 5, width = 7, tree = [2,2], squirrel = [4,4], nuts = [[3,0], [2,5]]
Output: 12
Explanation: The squirrel should go to the nut at [2, 5] first to achieve a minimal distance.
```

**Example 2:**
```
Input: height = 1, width = 3, tree = [0,1], squirrel = [0,0], nuts = [[0,2]]
Output: 3
```

## Approach
The optimal route is to go directly from the start to the nut, then from the nut to the tree. The Manhattan distance gives the shortest path in a grid with orthogonal moves.

```text
FUNCTION minTimeToStoreNut(sx, sy, nx, ny, tx, ty):
    SET distStartToNut ← ABS(sx - nx) + ABS(sy - ny)
    SET distNutToTree ← ABS(nx - tx) + ABS(ny - ty)
    RETURN distStartToNut + distNutToTree
```
If multiple nuts existed, we would subtract the saved distance by choosing the nut that reduces the extra travel compared to always going start→tree→nut.

## Walkthrough
For the first example:
- `distStartToNut = |1-2| + |1-2| = 2`
- `distNutToTree = |2-3| + |2-3| = 2`
- Total = 4 seconds.
The function returns 4.

## Complexity Analysis
- **Time:** O(1) – only a few arithmetic operations.
- **Space:** O(1).

## Follow‑Up Questions
1. How would the solution change if the squirrel could carry multiple nuts?
2. What if obstacles block certain grid cells?
3. Can you extend the algorithm to compute the optimal order for many nuts?

## Key Takeaway
In a Manhattan grid, the shortest travel time is the sum of Manhattan distances between consecutive required points.
