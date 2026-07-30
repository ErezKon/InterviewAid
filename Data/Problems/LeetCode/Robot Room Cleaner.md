# 489. Robot Room Cleaner

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/robot-room-cleaner](https://leetcode.com/problems/robot-room-cleaner)
**Companies:** Amazon, Google, Linkedin, Meta, Microsoft, Tiktok, Uber, Waymo

---

## Problem Description
You control a robot placed in an unknown 2‑D grid of empty cells and obstacles. The robot can move forward, turn left/right, and clean the current cell. Design an algorithm to clean every reachable empty cell without prior knowledge of the room layout.

## Examples
- A 3×3 room with obstacles; the robot must navigate and clean all 7 accessible cells.
- A single isolated cell; the robot simply cleans the starting position.

## Approach
Perform a depth‑first search (DFS) with backtracking, keeping a set of visited coordinates. The robot always tries the four directions relative to its current orientation, moving when possible, and backtracking by turning 180° and stepping back.

```text
FUNCTION CleanRoom(robot):
    SET visited ← SET()
    SET dirs ← [(−1,0),(0,1),(1,0),(0,−1)]  // up, right, down, left

    FUNCTION DFS(r, c, d):
        ADD (r,c) TO visited
        robot.clean()
        FOR i ← 0 TO 3:
            SET newDir ← (d + i) MOD 4
            SET nr ← r + dirs[newDir][0]
            SET nc ← c + dirs[newDir][1]
            IF (nr,nc) NOT IN visited AND robot.move():
                DFS(nr, nc, newDir)
                // backtrack to (r,c)
                robot.turnRight()
                robot.turnRight()
                robot.move()
                robot.turnRight()
                robot.turnRight()
            robot.turnRight()
    DFS(0,0,0)
```

## Walkthrough
| Step | Action | Position | Direction | Visited |
|------|--------|----------|-----------|---------|
| Start | clean | (0,0) | up | {(0,0)} |
| Try up | blocked → turn right |
| Try right | move to (0,1) | right | {(0,0),(0,1)} |
| ... | continue recursively |

## Complexity Analysis
- Time: O(C) where C is the number of reachable cells (each cell visited once).
- Space: O(C) for the visited set and recursion stack.

## Follow‑Up Questions
1. How would you modify the algorithm for a robot that can only turn left?
2. Can the solution be adapted to return the shortest path that visits all cells?
3. What changes are needed if the robot has a limited battery capacity?

## Key Takeaway
DFS with backtracking and a visited set lets an unknown‑room robot systematically explore and clean all reachable cells using only local operations.
