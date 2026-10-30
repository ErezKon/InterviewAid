# 489. Robot Room Cleaner

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/robot-room-cleaner](https://leetcode.com/problems/robot-room-cleaner)
**Companies:** Amazon, Google, Linkedin, Meta, Microsoft, Tiktok, Uber, Waymo

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are controlling a robot that is located somewhere in a room. The room is modeled as an `m x n` binary grid where `0` represents a wall and `1` represents an empty slot.

The robot starts at an unknown location in the room that is guaranteed to be empty, and you do not have access to the grid, but you can move the robot using the given API `Robot`.

You are tasked to use the robot to clean the entire room (i.e., clean every empty cell in the room). The robot with the four given APIs can move forward, turn left, or turn right. Each turn is `90` degrees.

When the robot tries to move into a wall cell, its bumper sensor detects the obstacle, and it stays on the current cell.

Design an algorithm to clean the entire room using the following APIs:

```
interface Robot {
  // returns true if next cell is open and robot moves into the cell.
  // returns false if next cell is obstacle and robot stays on the current cell.
  boolean move();

  // Robot will stay on the same cell after calling turnLeft/turnRight.
  // Each turn will be 90 degrees.
  void turnLeft();
  void turnRight();

  // Clean the current cell.
  void clean();
}
```

**Note** that the initial direction of the robot will be facing up. You can assume all four edges of the grid are all surrounded by a wall.

**Custom testing:**

The input is only given to initialize the room and the robot's position internally. You must solve this problem "blindfolded". In other words, you must control the robot using only the four mentioned APIs without knowing the room layout and the initial robot's position.

**Constraints:**
- `m == room.length`
- `n == room[i].length`
- `1 <= m <= 100`
- `1 <= n <= 200`
- `room[i][j]` is either `0` or `1`.
- `0 <= row < m`
- `0 <= col < n`
- `room[row][col] == 1`
- All the empty cells can be visited from the starting position.

## Examples

**Example 1:**
```
Input: room = [[1,1,1,1,1,0,1,1],[1,1,1,1,1,0,1,1],[1,0,1,1,1,1,1,1],[0,0,0,1,0,0,0,0],[1,1,1,1,1,1,1,1]], row = 1, col = 3
Output: Robot cleaned all rooms.
Explanation: All grids in the room are marked by either 0 or 1.
0 means the cell is blocked, while 1 means the cell is accessible.
The robot initially starts at the position of row=1, col=3.
From the top left corner, its position is one row below and three columns right.
```

**Example 2:**
```
Input: room = [[1]], row = 0, col = 0
Output: Robot cleaned all rooms.
```

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
