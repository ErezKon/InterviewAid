# 2290. Minimum Obstacle Removal to Reach Corner

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description
Given a binary matrix `grid` where `0` represents an empty cell and `1` an obstacle, find the minimum number of obstacles that must be removed to travel from the top‑left corner `(0,0)` to the bottom‑right corner `(m‑1,n‑1)`. Movement is allowed in four directions (up, down, left, right).

## Examples
**Example 1**
```
Input: grid = [[0,1,1],[1,1,0],[1,0,0]]
Output: 2
Explanation: Remove obstacles at (0,1) and (1,0) to create a path.
```
**Example 2**
```
Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 0
Explanation: A path already exists without removing obstacles.
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
