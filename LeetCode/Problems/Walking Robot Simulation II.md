# 2069. Walking Robot Simulation II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/walking-robot-simulation-ii](https://leetcode.com/problems/walking-robot-simulation-ii)
**Companies:** Google, Square
---

## Problem Description
A robot starts at the origin (0,0) on an infinite grid, initially facing north. It receives a sequence of commands:
- `-2` turn left 90°
- `-1` turn right 90°
- a positive integer `k` move forward `k` steps.
The robot must avoid obstacles given as coordinate pairs. After executing all commands, return the robot’s final Euclidean distance squared from the origin.

## Examples
- Input: `commands = [4,-1,3]`, `obstacles = []` → Output: `25`
  (moves north 4, turns east, moves 3 → (3,4) → 3²+4²=25)
- Input: `commands = [4,-1,4,-2,4]`, `obstacles = [[2,4]]` → Output: `65`
  (the robot stops before the obstacle at (2,4)).

## Approach
Simulate the robot step‑by‑step while maintaining a set of obstacle coordinates for O(1) lookup. Update direction using modular arithmetic and move one unit at a time, breaking on an obstacle.

```text
FUNCTION robotSimII(commands, obstacles):
    SET obstacleSet ← SET of tuples from obstacles
    SET dx ← [0, 1, 0, -1]   // N,E,S,W
    SET dy ← [1, 0, -1, 0]
    SET x ← 0; SET y ← 0; SET dir ← 0   // facing north
    FOR cmd IN commands:
        IF cmd = -2:
            SET dir ← (dir + 3) MOD 4   // turn left
        ELSE IF cmd = -1:
            SET dir ← (dir + 1) MOD 4   // turn right
        ELSE:
            FOR step FROM 1 TO cmd:
                SET nx ← x + dx[dir]
                SET ny ← y + dy[dir]
                IF (nx, ny) IN obstacleSet:
                    BREAK
                SET x ← nx; SET y ← ny
    RETURN x*x + y*y
```

## Walkthrough
| Cmd | Action | Position (x,y) | Direction |
|-----|--------|----------------|-----------|
| 4   | Move 4 north | (0,4) | N |
| -1  | Turn right | (0,4) | E |
| 3   | Move 3 east (no obstacle) | (3,4) | E |
Final distance² = 3²+4² = 25.

## Complexity Analysis
- Time: O(m + k) where *m* is number of commands and *k* total steps taken (≤ sum of command values).
- Space: O(o) for storing *o* obstacles.

## Follow-Up Questions
- How would you adapt the algorithm for a 3‑D grid?
- Can the robot report the first obstacle it encounters?
- What changes are needed if the robot can also move backward?

## Key Takeaway
Step‑wise simulation with a hash set of obstacles yields an efficient solution while handling direction changes via modular arithmetic.
