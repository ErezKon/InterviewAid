# 490. The Maze

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-maze](https://leetcode.com/problems/the-maze)
**Companies:** Amazon, Apple, Bloomberg, Google, Linkedin, Meta, Microsoft, Nvidia, Pinterest, Snapchat, Snowflake, Square, Uber, Walmart Labs

---

## Approach: BFS/DFS — O(m·n) ✅

Ball rolls until hitting a wall. BFS with states as stopping positions.

```
FUNCTION hasPath(maze, start, destination):
    visited = set()
    queue = [start]
    visited.ADD(tuple(start))

    WHILE queue:
        (r, c) = queue.DEQUEUE()
        IF (r, c) == destination: RETURN true

        FOR (dr, dc) IN directions:
            // Roll until hitting wall
            nr, nc = r, c
            WHILE 0 <= nr+dr < m AND 0 <= nc+dc < n AND maze[nr+dr][nc+dc] == 0:
                nr += dr
                nc += dc

            IF (nr, nc) NOT IN visited:
                visited.ADD((nr, nc))
                queue.ENQUEUE((nr, nc))

    RETURN false
```
