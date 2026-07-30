# 505. The Maze II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-maze-ii](https://leetcode.com/problems/the-maze-ii)
**Companies:** Amazon, Google, Meta, Oracle, Tiktok, Uber
---

## Problem Description
Given a 2D binary maze where `0` denotes an empty space and `1` a wall, a ball can roll in the four cardinal directions until it hits a wall. The ball stops at the cell before the wall. Starting from `start`, find the minimum number of steps required for the ball to stop exactly at `destination`. Return `-1` if the destination cannot be reached.

## Examples
**Example 1:**
```
Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1],[0,0,0,0,0]],
       start = [0,4], destination = [4,4]
Output: 12
```
**Example 2:**
```
Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1],[0,0,0,0,0]],
       start = [0,4], destination = [3,2]
Output: -1
```

## Approach
Treat each stop position as a node in a graph. The edge weight between two nodes equals the number of cells rolled. Since edge weights are non‑negative, Dijkstra’s algorithm yields the shortest distance.

```text
FUNCTION shortestDistance(maze, start, destination):
    m ← ROW_COUNT(maze); n ← COL_COUNT(maze)
    dist ← MATRIX(m, n, INF)
    dist[start[0]][start[1]] ← 0
    heap ← MIN_HEAP()
    heap.PUSH((0, start[0], start[1]))
    WHILE heap NOT EMPTY:
        (d, r, c) ← heap.POP()
        IF d > dist[r][c]: CONTINUE
        IF [r, c] == destination: RETURN d
        FOR each (dr, dc) IN [(1,0),(-1,0),(0,1),(0,-1)]:
            nr ← r; nc ← c; steps ← 0
            WHILE 0 ≤ nr+dr < m AND 0 ≤ nc+dc < n AND maze[nr+dr][nc+dc] == 0:
                nr ← nr + dr; nc ← nc + dc; steps ← steps + 1
            IF d + steps < dist[nr][nc]:
                dist[nr][nc] ← d + steps
                heap.PUSH((d + steps, nr, nc))
    RETURN -1
```

## Walkthrough
Start at (0,4). Rolling left stops at (0,1) after 3 steps, etc. Dijkstra explores all reachable stops, always expanding the node with smallest accumulated distance until the destination is popped.

## Complexity Analysis
- Time: O(m · n log (m · n)) – each cell may be processed once and heap operations cost log of the number of cells.
- Space: O(m · n) for the distance matrix and heap.

## Follow‑Up Questions
1. How would you adapt the algorithm to return the actual path taken?
2. Can the solution be optimized to O(m · n) using a 0‑1 BFS variant?
3. What changes are needed if the ball can also stop voluntarily before hitting a wall?

## Key Takeaway
Model rolling as weighted edges and apply Dijkstra to obtain the minimal travel distance in a maze.
