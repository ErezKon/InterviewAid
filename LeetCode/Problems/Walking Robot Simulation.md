# 874. Walking Robot Simulation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/walking-robot-simulation](https://leetcode.com/problems/walking-robot-simulation)
**Companies:** Amazon, Apple, Goldman Sachs, Google, Jane Street, Meta, Microsoft, Phonepe, Shopify
---

## Problem Description
A robot starts at the origin (0,0) on an infinite 2‑D grid, initially facing north. It receives a list of integer commands:
- `-2` turn left 90°
- `-1` turn right 90°
- a positive integer `k` move forward `k` steps.
The robot must avoid a set of obstacle coordinates. After executing all commands, return the maximum Euclidean distance squared from the origin that the robot ever reaches.

## Examples
- Input: `commands = [4,-1,3,-1,2]`, `obstacles = []` → Output: `25`
  (path reaches (3,4) → 3²+4²=25).
- Input: `commands = [4,-1,4,-2,4]`, `obstacles = [[2,4]]` → Output: `65`
  (robot stops before obstacle at (2,4)).

## Approach
Simulate the robot step‑by‑step, storing obstacles in a hash set for O(1) lookup. Maintain direction index (0‑N,1‑E,2‑S,3‑W) and update it with modular arithmetic on turns. After each move, compute the distance squared and track the maximum.

```text
FUNCTION robotSim(commands, obstacles):
    SET obstacleSet ← SET of tuples from obstacles
    SET dx ← [0, 1, 0, -1]   // N,E,S,W
    SET dy ← [1, 0, -1, 0]
    SET x ← 0; SET y ← 0; SET dir ← 0   // facing north
    SET maxDist ← 0
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
                SET maxDist ← MAX(maxDist, x*x + y*y)
    RETURN maxDist
```

## Walkthrough
| Cmd | Action | Position (x,y) | Direction |
|-----|--------|----------------|-----------|
| 4   | Move 4 north | (0,4) | N |
| -1  | Turn right | (0,4) | E |
| 3   | Move 3 east | (3,4) | E |
| -1  | Turn right | (3,4) | S |
| 2   | Move 2 south (no obstacle) | (3,2) | S |
Maximum distance² observed = 3²+4² = 25.

## Complexity Analysis
- Time: O(m + k) where *m* is number of commands and *k* total steps taken.
- Space: O(o) for storing *o* obstacles.

## Follow-Up Questions
- How would you modify the algorithm for a 3‑D robot?
- Can you compute the path length in addition to the maximum distance?
- What if obstacles could be added dynamically during simulation?

## Key Takeaway
A hash‑set for obstacles combined with direction handling via modular arithmetic enables efficient simulation and tracking of the farthest point.
