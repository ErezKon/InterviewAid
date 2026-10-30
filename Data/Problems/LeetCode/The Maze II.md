# 505. The Maze II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-maze-ii](https://leetcode.com/problems/the-maze-ii)
**Companies:** Amazon, Google, Meta, Oracle, Tiktok, Uber
---

## Problem Description
There is a ball in a `maze` with empty spaces (represented as `0`) and walls (represented as `1`). The ball can go through the empty spaces by rolling **up, down, left or right**, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the `m x n` `maze`, the ball's `start` position and the `destination`, where `start = [start_row, start_col]` and `destination = [destination_row, destination_col]`, return *the shortest **distance** for the ball to stop at the destination*. If the ball cannot stop at `destination`, return `-1`.

The **distance** is the number of **empty spaces** traveled by the ball from the start position (excluded) to the destination (included).

You may assume that **the borders of the maze are all walls** (see examples).

**Constraints:**
- `m == maze.length`
- `n == maze[i].length`
- `1 <= m, n <= 100`
- `maze[i][j]` is `0` or `1`.
- `start.length == 2`
- `destination.length == 2`
- `0 <= start_row, destination_row < m`
- `0 <= start_col, destination_col < n`
- Both the ball and the destination exist in an empty space, and they will not be in the same position initially.
- The maze contains **at least 2 empty spaces**.

## Examples
```
Example 1:
  Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
  Output: 12
  Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.
  The length of the path is 1 + 1 + 3 + 1 + 2 + 2 + 2 = 12.
```
```
Example 2:
  Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]
  Output: -1
  Explanation: There is no way for the ball to stop at the destination. Notice that you can pass through
  the destination but you cannot stop there.
```
```
Example 3:
  Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [4,3], destination = [0,1]
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
