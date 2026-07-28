# 499. The Maze III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/the-maze-iii](https://leetcode.com/problems/the-maze-iii)
**Companies:** Google
---

## Problem Description
Given a 2D binary maze (`0` empty, `1` wall) and a ball that rolls until hitting a wall, the ball starts at `start` and a hole is located at `hole`. The ball stops when it reaches the hole (even if it would continue rolling). Find the shortest distance the ball must travel to fall into the hole. If multiple paths have the same distance, return the lexicographically smallest sequence of directions (`"u"`, `"d"`, `"l"`, `"r"`). Return `-1` if the hole cannot be reached.

## Examples
**Example 1:**
```
Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1],[0,0,0,0,0]],
       start = [0,4], hole = [4,4]
Output: "ldr"
```
**Example 2:**
```
Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1],[0,0,0,0,0]],
       start = [0,4], hole = [3,2]
Output: -1
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
