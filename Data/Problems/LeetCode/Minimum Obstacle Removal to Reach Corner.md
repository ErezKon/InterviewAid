# 2290. Minimum Obstacle Removal to Reach Corner

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner](https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description
You are given a **0-indexed** 2D integer array `grid` of size `m x n`. Each cell has one of two values:

- `0` represents an **empty** cell,
- `1` represents an **obstacle** that may be removed.

You can move up, down, left, or right from and to an empty cell.

Return *the **minimum** number of **obstacles** to **remove** so you can move from the upper left corner* `(0, 0)` *to the lower right corner* `(m - 1, n - 1)`.

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 ≤ m, n ≤ 10⁵`
- `2 ≤ m * n ≤ 10⁵`
- `grid[i][j]` is either `0` **or** `1`.
- `grid[0][0] == grid[m - 1][n - 1] == 0`

## Examples

```
Example 1:
  Input: grid = [[0,1,1],[1,1,0],[1,1,0]]
  Output: 2
  Explanation: We can remove the obstacles at (0, 1) and (0, 2) to create a path from (0, 0) to (2, 2).
  It can be shown that we need to remove at least 2 obstacles, so we return 2.
  Note that there may be other ways to remove 2 obstacles to create a path.
```

```
Example 2:
  Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]
  Output: 0
  Explanation: We can move from (0, 0) to (2, 4) without removing any obstacles, so we return 0.
```

## Approach
Apply **0‑1 BFS**. Treat moving onto a `0` cell as cost 0 and onto a `1` cell as cost 1. Use a deque to process nodes: push to front for cost 0 edges, push to back for cost 1 edges. Maintain a distance matrix of minimum obstacles removed to reach each cell.

## Walkthrough
| Step | Cell (r,c) | Cost to reach | Deque operation |
|------|------------|---------------|-----------------|
| Start | (0,0) | 0 | push front |
| Move to (0,1) (obstacle) | 1 | push back |
| Move to (1,0) (obstacle) | 1 | push back |
| Continue exploring 0‑cost moves before 1‑cost moves |
| Reach (2,2) with cost 2 | 2 | — |
The final distance at (m‑1,n‑1) is the answer.

## Complexity Analysis
Time: O(m × n) – each cell processed at most twice (once for cost 0, once for cost 1).
Space: O(m × n) – distance matrix and deque.

## Follow‑Up Questions
* How would the algorithm change if diagonal moves were allowed?
* Can we retrieve the actual path of removed obstacles?
* What if each obstacle had a different removal cost?

## Key Takeaway
0‑1 BFS efficiently computes the minimum obstacle removals by treating obstacle traversal as a weighted edge of cost 1 and empty cells as cost 0.
