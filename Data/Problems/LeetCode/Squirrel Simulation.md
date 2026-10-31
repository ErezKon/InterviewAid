# 573. Squirrel Simulation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/squirrel-simulation](https://leetcode.com/problems/squirrel-simulation)
**Companies:** Square

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

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
Each nut must be carried to the tree individually. If the squirrel started at the tree, every nut would cost a round trip `2·d(nut, tree)` (Manhattan distance). The only difference is the very first nut: the squirrel walks `d(squirrel, nut)` instead of `d(tree, nut)` to reach it. So the total is `Σ 2·d(nut_i, tree)` plus the adjustment `d(squirrel, nut) − d(nut, tree)` for the first nut, and we pick the first nut that minimizes this adjustment.

**Pseudocode**
```text
FUNCTION minDistance(height, width, tree, squirrel, nuts):
    SET total ← 0
    SET bestDelta ← INFINITY
    FOR EACH nut IN nuts:
        SET dTree ← ABS(nut.r - tree.r) + ABS(nut.c - tree.c)
        SET dSq ← ABS(nut.r - squirrel.r) + ABS(nut.c - squirrel.c)
        SET total ← total + 2 * dTree
        SET bestDelta ← MIN(bestDelta, dSq - dTree)
    RETURN total + bestDelta
```

## Walkthrough
Example 1: `tree = [2,2]`, `squirrel = [4,4]`, `nuts = [[3,0],[2,5]]`.

| nut | d(nut, tree) | d(squirrel, nut) | 2·d(nut, tree) | delta = dSq − dTree |
|-----|--------------|------------------|----------------|---------------------|
| [3,0] | 1 + 2 = 3 | 1 + 4 = 5 | 6 | 2 |
| [2,5] | 0 + 3 = 3 | 2 + 1 = 3 | 6 | 0 |

- `total = 6 + 6 = 12`
- `bestDelta = min(2, 0) = 0` (start with nut `[2,5]`)
- Answer: `12 + 0 = 12`.

## Complexity Analysis
- **Time:** O(k) where `k = nuts.length` - one pass over the nuts.
- **Space:** O(1).

## Follow-Up Questions
1. How would the answer change if the squirrel could carry two nuts at a time?
2. What if some grid cells were blocked (Manhattan distance no longer valid)?
3. What if there were multiple trees and each nut could go to any tree?

## Key Takeaway
Model the cost as "every nut is a round trip from the tree" and then fix up only the first trip; the choice of the first nut is the single decision that matters.
