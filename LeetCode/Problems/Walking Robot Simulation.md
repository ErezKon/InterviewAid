# 874. Walking Robot Simulation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/walking-robot-simulation](https://leetcode.com/problems/walking-robot-simulation)
**Companies:** Amazon, Apple, Goldman Sachs, Google, Jane Street, Meta, Microsoft, Phonepe, Shopify

---

```
FUNCTION robotSim(commands, obstacles):
    obstacleSet = SET(tuple(o) for o in obstacles)
    dx = [0, 1, 0, -1]    // N, E, S, W
    dy = [1, 0, -1, 0]
    x = y = 0
    dir = 0    // facing North
    maxDist = 0

    FOR cmd IN commands:
        IF cmd == -2: dir = (dir + 3) % 4    // turn left
        ELSE IF cmd == -1: dir = (dir + 1) % 4    // turn right
        ELSE:
            FOR _ ← 0 TO cmd - 1:
                nx, ny = x + dx[dir], y + dy[dir]
                IF (nx, ny) IN obstacleSet: BREAK
                x, y = nx, ny
            maxDist = MAX(maxDist, x*x + y*y)

    RETURN maxDist
```
