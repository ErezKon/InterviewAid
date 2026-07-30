# 573. Squirrel Simulation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/squirrel-simulation](https://leetcode.com/problems/squirrel-simulation)
**Companies:** Square

---

## Problem Description
A squirrel starts at point `(sx, sy)` on a 2‑D plane and wants to collect a nut located at `(nx, ny)`. The squirrel can move in four orthogonal directions (up, down, left, right) one unit per second. There is a tree at `(tx, ty)` where the squirrel must deposit the nut. Compute the minimum total time for the squirrel to travel from its start position to the nut, then to the tree, assuming it can carry only one nut at a time.

## Examples
**Example 1:**
```
Input: sx=1, sy=1, nx=2, ny=2, tx=3, ty=3
Output: 6
Explanation: Path: (1,1)->(2,2) distance 2, then (2,2)->(3,3) distance 2, total 4. Since there is only one nut, answer is 4.
```
**Example 2:**
```
Input: sx=0, sy=0, nx=5, ny=5, tx=1, ty=1
Output: 14
Explanation: Distance start→nut = 10, nut→tree = 8, total = 18. However, the squirrel can first go to the tree to drop any previous nut (none), so optimal is start→nut→tree = 18.
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
