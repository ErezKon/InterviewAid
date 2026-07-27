# 505. The Maze II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-maze-ii](https://leetcode.com/problems/the-maze-ii)
**Companies:** Amazon, Google, Meta, Oracle, Tiktok, Uber

---

## Approach: Dijkstra — O(mn log(mn)) ✅

```
FUNCTION shortestDistance(maze, start, destination):
    dist = m×n of infinity
    dist[start] = 0
    heap = [(0, start[0], start[1])]

    WHILE heap:
        (d, r, c) = heap.POP()
        IF d > dist[r][c]: CONTINUE
        IF [r, c] == destination: RETURN d

        FOR (dr, dc) IN 4 directions:
            nr, nc, steps = r, c, 0
            WHILE valid(nr+dr, nc+dc) AND maze[nr+dr][nc+dc] == 0:
                nr += dr; nc += dc; steps += 1
            IF d + steps < dist[nr][nc]:
                dist[nr][nc] = d + steps
                heap.PUSH((d + steps, nr, nc))

    RETURN -1
```

Ball rolls until hitting a wall. Edge weight = number of cells rolled. Dijkstra for shortest path.
