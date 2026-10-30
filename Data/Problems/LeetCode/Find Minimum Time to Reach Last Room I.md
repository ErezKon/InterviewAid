# 3341. Find Minimum Time to Reach Last Room I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-minimum-time-to-reach-last-room-i](https://leetcode.com/problems/find-minimum-time-to-reach-last-room-i)
**Companies:** Bloomberg, Google, Meta, Uber

---

## Problem Description

There is a dungeon with `n x m` rooms arranged as a grid.

You are given a 2D array `moveTime` of size `n x m`, where `moveTime[i][j]` represents the **minimum** time in seconds **after** which the room opens and can be moved to. You start from the room `(0, 0)` at time `t = 0` and can move to an **adjacent** room. Moving between adjacent rooms takes *exactly* one second.

Return the **minimum** time to reach the room `(n - 1, m - 1)`.

Two rooms are **adjacent** if they share a common wall, either *horizontally* or *vertically*.

**Constraints:**
- `2 <= n == moveTime.length <= 50`
- `2 <= m == moveTime[i].length <= 50`
- `0 <= moveTime[i][j] <= 10^9`

## Examples

**Example 1:**
```
Input: moveTime = [[0,4],[4,4]]
Output: 6
Explanation: The minimum time required is 6 seconds.
- At time t == 4, move from room (0, 0) to room (1, 0) in one second.
- At time t == 5, move from room (1, 0) to room (1, 1) in one second.
```

**Example 2:**
```
Input: moveTime = [[0,0,0],[0,0,0]]
Output: 3
Explanation: The minimum time required is 3 seconds.
- At time t == 0, move from room (0, 0) to room (1, 0) in one second.
- At time t == 1, move from room (1, 0) to room (1, 1) in one second.
- At time t == 2, move from room (1, 1) to room (1, 2) in one second.
```

**Example 3:**
```
Input: moveTime = [[0,1],[1,2]]
Output: 3
```

## Approach
The problem is a shortest‑path search where the edge weight from a cell to a neighbor is `1` plus any additional waiting time needed to satisfy the neighbor’s `moveTime`. Dijkstra’s algorithm fits perfectly:
1. Initialise a distance matrix `dist` with infinity; `dist[0][0] ← 0`.
2. Use a min‑heap storing `(currentTime, row, col)`.
3. Pop the smallest entry; if it is the target, return the time.
4. For each neighbor `(nr,nc)` compute `nextTime ← max(currentTime, moveTime[nr][nc]) + 1`.
5. If `nextTime < dist[nr][nc]`, update and push onto the heap.
Because all edge costs are non‑negative, Dijkstra guarantees the first time we pop the target cell we have the optimal answer.

## Walkthrough
| Pop order (time, cell) | Neighbour | Computed `nextTime` |
|------------------------|-----------|---------------------|
| (0,0)                  | (0,1)     | max(0,1)+1 = 2      |
| (0,0)                  | (1,0)     | max(0,1)+1 = 2      |
| (2,0) (cell (0,1))     | (0,2)     | max(2,2)+1 = 3      |
| …                      | …         | …                   |
The algorithm continues until `(m‑1,n‑1)` is popped with time `6` for the first example.

## Complexity Analysis
Time: `O(m·n·log(m·n))` due to heap operations for each cell.
Space: `O(m·n)` for the distance matrix and heap.

## Follow‑Up Questions
1. How would the solution change if diagonal moves were allowed?
2. What if the waiting time could decrease (negative weights) – which algorithm would be needed?
3. Can the problem be solved with a 0‑1 BFS when all `moveTime` values are either `0` or `1`?

## Key Takeaway
Model the waiting constraint as part of the edge cost and apply Dijkstra’s algorithm to obtain the minimum arrival time.
