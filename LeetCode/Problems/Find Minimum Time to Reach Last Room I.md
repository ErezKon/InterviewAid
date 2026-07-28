# 3341. Find Minimum Time to Reach Last Room I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-minimum-time-to-reach-last-room-i](https://leetcode.com/problems/find-minimum-time-to-reach-last-room-i)
**Companies:** Bloomberg, Google, Meta, Uber

---

## Problem Description
You are given a 2‑D grid `moveTime` of size `m × n`. Starting from the top‑left cell `(0,0)`, you may move to any of the four orthogonal neighboring cells. Entering a cell incurs a **waiting time** equal to the value in `moveTime` for that cell; you must wait until the current time is at least that value before you can step into it, and each move itself costs exactly 1 unit of time. Return the minimum time required to reach the bottom‑right cell `(m‑1,n‑1)`.

Constraints: `1 ≤ m, n ≤ 100`, `0 ≤ moveTime[i][j] ≤ 10⁹`.

## Examples
**Example 1**
```
Input: moveTime = [[0,1,2],[1,2,3],[2,3,4]]
Output: 6
Explanation: Path (0,0)->(0,1)->(0,2)->(1,2)->(2,2) with times 0,1,2,3,4 and 1 unit per move gives total 6.
```
**Example 2**
```
Input: moveTime = [[0,5],[10,0]]
Output: 7
Explanation: Must wait until time 5 to enter (0,1), then move to (1,1) at time 6, wait until 10 for (1,0) then move to (1,1) again? Actually optimal path is (0,0)->(1,0)->(1,1) with total 7.
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
