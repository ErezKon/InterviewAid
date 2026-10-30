# 675. Cut Off Trees for Golf Event

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cut-off-trees-for-golf-event](https://leetcode.com/problems/cut-off-trees-for-golf-event)
**Companies:** Amazon, Flipkart

---

## Problem Description

You are asked to cut off all the trees in a forest for a golf event. The forest is represented as an `m x n` matrix. In this matrix:

- `0` means the cell cannot be walked through.
- `1` represents an empty cell that can be walked through.
- A number greater than `1` represents a tree in a cell that can be walked through, and this number is the tree's height.

In one step, you can walk in any of the four directions: north, east, south, and west. If you are standing in a cell with a tree, you can choose whether to cut it off.

You must cut off the trees in order from shortest to tallest. When you cut off a tree, the value at its cell becomes `1` (an empty cell).

Starting from the point `(0, 0)`, return *the minimum steps you need to walk to cut off all the trees*. If you cannot cut off all the trees, return `-1`.

**Note:** The input is generated such that no two trees have the same height, and there is at least one tree needs to be cut off.

**Constraints:**
- `m == forest.length`
- `n == forest[i].length`
- `1 <= m, n <= 50`
- `0 <= forest[i][j] <= 10^9`
- Heights of all trees are **distinct**.

---

## Examples

```
Example 1:
  Input: forest = [[1,2,3],[0,0,4],[7,6,5]]
  Output: 6
  Explanation: Walking (0,0)→(0,1)→(0,2)→(1,2)→(2,2)→(2,1)→(2,0) cuts the trees from shortest to tallest in 6 steps.
```

```
Example 2:
  Input: forest = [[1,2,3],[0,0,0],[7,6,5]]
  Output: -1
  Explanation: The trees in the bottom row cannot be accessed as the middle row is blocked.
```

```
Example 3:
  Input: forest = [[2,3,4],[0,0,5],[8,7,6]]
  Output: 6
  Explanation: You can follow the same path as Example 1 to cut off all the trees.
  Note that you can cut off the first tree at (0, 0) before making any steps.
```

---

## Approach

```text
FUNCTION cutOffTree(forest):
    // Collect all trees > 1 with their coordinates
    SET trees ← list of (height, row, col) for each cell where height > 1
    SORT trees BY height ASCENDING
    SET totalSteps ← 0
    SET startR, startC ← 0, 0

    FOR EACH (height, targetR, targetC) IN trees:
        SET dist ← BFS(forest, startR, startC, targetR, targetC)
        IF dist == -1:
            RETURN -1
        SET totalSteps ← totalSteps + dist
        SET startR, startC ← targetR, targetC
        // Cut the tree (set height to 1) – optional for further BFS
        SET forest[startR][startC] ← 1

    RETURN totalSteps
```

---

## Walkthrough

| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Extract trees > 1 and sort by height. | Determines cutting order: 2,3,4,5,6,7. |
| 2 | BFS from (0,0) to tree height 2 at (0,1). | Distance = 1, add to total. |
| 3 | BFS from (0,1) to tree height 3 at (0,2). | Distance = 1, total = 2. |
| 4 | Continue BFS to each subsequent tree. | Distances: to 4 = 2, to 5 = 1, to 6 = 1, to 7 = 1; total = 6. |
| 5 | If any BFS returns -1, return -1. | In Example 2, tree height 4 is blocked, BFS fails. |

---

## Complexity Analysis

- **Time:** O(T * (m·n)) where T is number of trees and each BFS scans the grid of size m·n.
- **Space:** O(m·n) for the BFS queue and visited matrix.

---

## Follow-Up Questions

- How would the solution change if diagonal moves were allowed?
- Can you improve the time complexity using a multi-source BFS or precomputed distances?

---

## Key Takeaway

> **Ordered grid traversal: sort targets by priority, then BFS between consecutive targets. Sum shortest path distances. Return -1 if any target is unreachable.**