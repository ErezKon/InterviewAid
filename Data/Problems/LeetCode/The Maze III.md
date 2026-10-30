# 499. The Maze III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/the-maze-iii](https://leetcode.com/problems/the-maze-iii)
**Companies:** Google
---

## Problem Description
There is a ball in a `maze` with empty spaces (represented as `0`) and walls (represented as `1`). The ball can go through the empty spaces by rolling **up, down, left or right**, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction (must be different from last chosen direction). There is also a hole in this maze. The ball will drop into the hole if it rolls onto the hole.

Given the `m x n` `maze`, the ball's position `ball` and the hole's position `hole`, where `ball = [ball_row, ball_col]` and `hole = [hole_row, hole_col]`, return *a string* `instructions` *of all the instructions that the ball should follow to drop in the hole with the **shortest distance** possible*. If there are multiple valid instructions, return the **lexicographically minimum** one. If the ball can't drop in the hole, return `"impossible"`.

If there is a way for the ball to drop in the hole, the answer `instructions` should contain the characters `'u'` (i.e., up), `'d'` (i.e., down), `'l'` (i.e., left), and `'r'` (i.e., right).

The **distance** is the number of **empty spaces** traveled by the ball from the start position (excluded) to the destination (included).

You may assume that **the borders of the maze are all walls** (see examples).

**Constraints:**
- `m == maze.length`
- `n == maze[i].length`
- `1 <= m, n <= 100`
- `maze[i][j]` is `0` or `1`.
- `ball.length == 2`
- `hole.length == 2`
- `0 <= ball_row, hole_row <= m`
- `0 <= ball_col, hole_col <= n`
- Both the ball and the hole exist in an empty space, and they will not be in the same position initially.
- The maze contains **at least 2 empty spaces**.

## Examples
```
Example 1:
  Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], ball = [4,3], hole = [0,1]
  Output: "lul"
  Explanation: There are two shortest ways for the ball to drop into the hole.
  The first way is left -> up -> left, represented by "lul".
  The second way is up -> left, represented by 'ul'.
  Both ways have shortest distance 6, but the first way is lexicographically smaller because 'l' < 'u'.
  So the output is "lul".
```
```
Example 2:
  Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], ball = [4,3], hole = [3,0]
  Output: "impossible"
  Explanation: The ball cannot reach the hole.
```
```
Example 3:
  Input: maze = [[0,0,0,0,0,0,0],[0,0,1,0,0,1,0],[0,0,0,0,1,0,0],[0,0,0,0,0,0,1]], ball = [0,4], hole = [3,5]
  Output: "dldr"
```

## Approach
Use Dijkstra’s algorithm where each node is a stop position. The state includes the accumulated distance and the path string. When rolling, stop early if the hole is encountered; record the distance and path up to the hole. The priority queue orders by (distance, path) to ensure lexicographically smallest path for equal distances.

```text
FUNCTION findShortestWay(maze, start, hole):
    m ← ROW_COUNT(maze); n ← COL_COUNT(maze)
    dist ← MATRIX(m, n, INF)
    path ← MATRIX(m, n, "")
    heap ← MIN_HEAP()
    heap.PUSH((0, "", start[0], start[1]))
    dist[start[0]][start[1]] ← 0
    WHILE heap NOT EMPTY:
        (d, p, r, c) ← heap.POP()
        IF [r, c] == hole: RETURN p
        IF d > dist[r][c]: CONTINUE
        FOR each (dr, dc, dir) IN [( -1,0,"u"),(1,0,"d"),(0,-1,"l"),(0,1,"r")]:
            nr ← r; nc ← c; steps ← 0
            WHILE 0 ≤ nr+dr < m AND 0 ≤ nc+dc < n AND maze[nr+dr][nc+dc] == 0:
                nr ← nr + dr; nc ← nc + dc; steps ← steps + 1
                IF [nr, nc] == hole: BREAK
            newDist ← d + steps
            newPath ← p + dir
            IF newDist < dist[nr][nc] OR (newDist == dist[nr][nc] AND newPath < path[nr][nc]):
                dist[nr][nc] ← newDist
                path[nr][nc] ← newPath
                heap.PUSH((newDist, newPath, nr, nc))
    RETURN -1
```

## Walkthrough
Start at (0,4). Rolling left reaches (0,1) after 3 steps, path "l". Continue exploring with Dijkstra, always picking the smallest (distance, path) pair. When the hole at (4,4) is first popped, the associated path "ldr" is returned as the optimal solution.

## Complexity Analysis
- Time: O(m · n log (m · n)) – each cell processed with heap operations.
- Space: O(m · n) for distance and path matrices and the heap.

## Follow‑Up Questions
1. How would you modify the algorithm to return the actual sequence of coordinates visited?
2. Can the solution be adapted for multiple holes simultaneously?
3. What changes are needed if the ball can stop voluntarily before hitting a wall?

## Key Takeaway
Combining Dijkstra with path tracking and early stop at the hole yields the shortest lexicographically minimal route.
