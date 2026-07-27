# 489. Robot Room Cleaner

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/robot-room-cleaner](https://leetcode.com/problems/robot-room-cleaner)
**Companies:** Amazon, Google, Linkedin, Meta, Microsoft, Tiktok, Uber, Waymo

---

## Approach: DFS with Backtracking — O(cells) ✅

```
FUNCTION cleanRoom(robot):
    visited = set()
    directions = [(-1,0), (0,1), (1,0), (0,-1)]    // up, right, down, left

    FUNCTION dfs(r, c, dir):
        visited.ADD((r, c))
        robot.clean()

        FOR i ← 0 TO 3:
            newDir = (dir + i) % 4
            nr = r + directions[newDir][0]
            nc = c + directions[newDir][1]

            IF (nr, nc) NOT IN visited AND robot.move():
                dfs(nr, nc, newDir)
                // Backtrack
                robot.turnRight()
                robot.turnRight()
                robot.move()
                robot.turnRight()
                robot.turnRight()

            robot.turnRight()

    dfs(0, 0, 0)
```

Spiral DFS. Always try 4 directions relative to current facing. Backtrack by turning 180°, moving, turning 180° again.
