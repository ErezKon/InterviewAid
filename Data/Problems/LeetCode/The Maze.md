# 490. The Maze

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-maze](https://leetcode.com/problems/the-maze)
**Companies:** Amazon, Apple, Bloomberg, Google, Linkedin, Meta, Microsoft, Nvidia, Pinterest, Snapchat, Snowflake, Square, Uber, Walmart Labs

---

## Problem Description
There is a ball in a `maze` with empty spaces (represented as `0`) and walls (represented as `1`). The ball can go through the empty spaces by rolling **up, down, left or right**, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the `m x n` `maze`, the ball's `start` position and the `destination`, where `start = [start_row, start_col]` and `destination = [destination_row, destination_col]`, return `true` if the ball can stop at the destination, otherwise return `false`.

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
  Input: maze = [[0,0,1,0,0],
                 [0,0,0,0,0],
                 [0,0,0,1,0],
                 [1,1,0,1,1],
                 [0,0,0,0,0]], start = [0,4], destination = [4,4]
  Output: true
  Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.
```
```
Example 2:
  Input: maze = [[0,0,1,0,0],
                 [0,0,0,0,0],
                 [0,0,0,1,0],
                 [1,1,0,1,1],
                 [0,0,0,0,0]], start = [0,4], destination = [3,2]
  Output: false
  Explanation: There is no way for the ball to stop at the destination. Notice that you can pass through
  the destination but you cannot stop there.
```
```
Example 3:
  Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [4,3], destination = [0,1]
  Output: false
```

## Approach
We treat each stopping position as a node in a graph. From a node, we explore all four directions, rolling the ball until it hits a wall, which yields a neighboring node. A breadth‑first search (BFS) or depth‑first search (DFS) from the start node discovers reachable stopping positions. If the destination node is reached, a path exists.

```text
FUNCTION hasPath(maze, start, destination):
    m ← NUMBER OF ROWS IN maze
    n ← NUMBER OF COLUMNS IN maze
    visited ← SET()
    queue ← LIST()
    ENQUEUE(queue, start)
    ADD visited, TUPLE(start)
    WHILE queue IS NOT EMPTY:
        (r, c) ← DEQUEUE(queue)
        IF (r, c) = destination: RETURN true
        FOR (dr, dc) IN [(1,0), (-1,0), (0,1), (0,-1)]:
            nr ← r
            nc ← c
            // Roll until hitting a wall or boundary
            WHILE 0 ≤ nr+dr < m AND 0 ≤ nc+dc < n AND maze[nr+dr][nc+dc] = 0:
                nr ← nr + dr
                nc ← nc + dc
            IF (nr, nc) NOT IN visited:
                ADD visited, (nr, nc)
                ENQUEUE(queue, (nr, nc))
    RETURN false
```

## Walkthrough
| Step | Queue | Visited | Action |
|------|-------|---------|--------|
| 1 | [(0,4)] | {(0,4)} | Dequeue (0,4), roll left to (0,0), down to (4,0) etc. |
| 2 | [(0,0), (4,0)] | {(0,4),(0,0),(4,0)} | Explore each, eventually reach (4,4). |
| … | … | … | Continue until destination found. |

## Complexity Analysis
- **Time:** Each cell is processed at most once; rolling across a row or column takes O(m·n) total, so overall O(m·n).
- **Space:** Visited set and queue store at most O(m·n) positions.

## Follow-Up Questions
1. How would you modify the algorithm to return the shortest distance traveled instead of just reachability?
2. What changes are needed if the ball can stop at any intermediate empty cell, not only before a wall?
3. How would you handle a maze with portals that teleport the ball to another location?

## Key Takeaway
Model the rolling ball as graph nodes and use BFS/DFS to explore reachable stopping positions efficiently.
