# 490. The Maze

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-maze](https://leetcode.com/problems/the-maze)
**Companies:** Amazon, Apple, Bloomberg, Google, Linkedin, Meta, Microsoft, Nvidia, Pinterest, Snapchat, Snowflake, Square, Uber, Walmart Labs

---

## Problem Description
You are given a 2D maze represented by a binary matrix where `0` denotes an empty space and `1` denotes a wall. A ball can roll up, down, left, or right from its current position, and it will continue rolling in the chosen direction until it hits a wall. The ball stops at the last empty cell before the wall. Given a start coordinate and a destination coordinate, determine whether the ball can stop exactly at the destination.

## Examples
**Example 1:**
```
maze = [[0,0,1,0,0],
        [0,0,0,0,0],
        [0,0,0,1,0],
        [1,1,0,1,1],
        [0,0,0,0,0]]
start = [0,4]
 destination = [4,4]
Output: true
```
The ball can roll left, down, left, and down to reach the destination.

**Example 2:**
```
maze = [[0,0,1,0,0],
        [0,0,0,0,0],
        [0,0,0,1,0],
        [1,1,0,1,1],
        [0,0,0,0,0]]
start = [0,4]
 destination = [3,2]
Output: false
```
No sequence of rolls stops at the destination.

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
