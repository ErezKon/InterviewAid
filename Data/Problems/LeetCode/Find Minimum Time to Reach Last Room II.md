# 3342. Find Minimum Time to Reach Last Room II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-minimum-time-to-reach-last-room-ii](https://leetcode.com/problems/find-minimum-time-to-reach-last-room-ii)
**Companies:** Amazon, Google, Uber

---

## Problem Description

> *Note: the Approach below alternates step costs but ignores `moveTime` and tracks parity per path. In the official problem the cost alternates with the move number, which equals `(i + j) % 2` of the source cell, so Dijkstra needs no parity state: `next = max(t, moveTime[nr][nc]) + ((i + j) % 2 + 1)`.*

There is a dungeon with `n x m` rooms arranged as a grid.

You are given a 2D array `moveTime` of size `n x m`, where `moveTime[i][j]` represents the **minimum** time in seconds when you can **start moving** to that room. You start from the room `(0, 0)` at time `t = 0` and can move to an **adjacent** room. Moving between **adjacent** rooms takes one second for one move and two seconds for the next, **alternating** between the two.

Return the **minimum** time to reach the room `(n - 1, m - 1)`.

Two rooms are **adjacent** if they share a common wall, either *horizontally* or *vertically*.

**Constraints:**
- `2 <= n == moveTime.length <= 750`
- `2 <= m == moveTime[i].length <= 750`
- `0 <= moveTime[i][j] <= 10^9`

## Examples

**Example 1:**
```
Input: moveTime = [[0,4],[4,4]]
Output: 7
Explanation: The minimum time required is 7 seconds.
- At time t == 4, move from room (0, 0) to room (1, 0) in one second.
- At time t == 5, move from room (1, 0) to room (1, 1) in two seconds.
```

**Example 2:**
```
Input: moveTime = [[0,0,0,0],[0,0,0,0]]
Output: 6
Explanation: The minimum time required is 6 seconds.
- At time t == 0, move from room (0, 0) to room (1, 0) in one second.
- At time t == 1, move from room (1, 0) to room (1, 1) in two seconds.
- At time t == 3, move from room (1, 1) to room (1, 2) in one second.
- At time t == 4, move from room (1, 2) to room (1, 3) in two seconds.
```

**Example 3:**
```
Input: moveTime = [[0,1],[1,2]]
Output: 4
```

## Approach
The alternating cost can be encoded in the state of Dijkstra’s algorithm. Each heap entry stores `(time, row, col, parity)` where `parity` indicates whether the next move will cost 1 (`parity=0`) or 2 (`parity=1`). When expanding a node:
1. Determine `stepCost ← 1` if `parity = 0` else `2`.
2. For each neighbor, compute `nextTime ← currentTime + stepCost`.
3. Push `(nextTime, nr, nc, 1-parity)` onto the min-heap if it improves the recorded distance for that `(nr,nc,parity)`.
The first time we pop the target cell (any parity) we have the optimal answer.

## Walkthrough
| Pop (time, cell, parity) | Neighbour | stepCost | nextTime | New parity |
|---------------------------|-----------|----------|----------|------------|
| (0,0,0)                   | (0,1)     | 1        | 1        | 1          |
| (0,0,0)                   | (1,0)     | 1        | 1        | 1          |
| (1,0,1)                   | (1,1)     | 2        | 3        | 0          |
| (0,1,1)                   | (1,1)     | 2        | 3        | 0          |
| (1,1,0) (target)          | —         | —        | 3        | —          |
The algorithm stops when `(m-1,n-1)` is popped.

## Complexity Analysis
Time: `O(m·n·log(m·n))` because each cell is processed for two parity states and each heap operation is logarithmic.
Space: `O(m·n)` for the distance matrix storing the best time for each parity.

## Follow-Up Questions
1. How would the solution change if the move costs followed a different periodic pattern?
2. What if each cell also had a waiting time that must be respected before entering?
3. Can a 0-1 BFS be used when the alternating costs are only 0 and 1?

## Key Takeaway
By extending Dijkstra’s state with a parity flag, we can handle periodic edge costs and still obtain the optimal path efficiently.
