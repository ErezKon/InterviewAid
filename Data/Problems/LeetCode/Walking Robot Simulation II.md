# 2069. Walking Robot Simulation II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/walking-robot-simulation-ii](https://leetcode.com/problems/walking-robot-simulation-ii)
**Companies:** Google, Square

---

## Problem Description

> *Note: the Approach/Walkthrough below re-solve #874 (infinite grid with obstacles). Correct idea: the robot only ever walks the grid's perimeter, a cycle of length `P = 2·(width + height) − 4`. Keep a position index `pos = (pos + num) mod P` and map it to coordinates/direction along the perimeter (E along bottom, N along right, W along top, S along left). Special case: when `pos == 0` after at least one move, the robot is at `(0, 0)` facing **South**. O(1) per call.*

A `width x height` grid is on an XY-plane with the **bottom-left** cell at `(0, 0)` and the **top-right** cell at `(width - 1, height - 1)`. The grid is aligned with the four cardinal directions (`"North"`, `"East"`, `"South"`, and `"West"`). A robot is **initially** at cell `(0, 0)` facing direction `"East"`.

The robot can be instructed to move for a specific number of **steps**. For each step, it does the following.

1. Attempts to move **forward one** cell in the direction it is facing.
2. If the cell the robot is **moving to** is **out of bounds**, the robot instead **turns** 90 degrees **counterclockwise** and retries the step.

After the robot finishes moving the number of steps required, it stops and awaits the next instruction.

Implement the `Robot` class:

- `Robot(int width, int height)` Initializes the `width x height` grid with the robot at `(0, 0)` facing `"East"`.
- `void step(int num)` Instructs the robot to move forward `num` steps.
- `int[] getPos()` Returns the current cell the robot is at, as an array of length 2, `[x, y]`.
- `String getDir()` Returns the current direction of the robot, `"North"`, `"East"`, `"South"`, or `"West"`.

**Constraints:**
- `2 <= width, height <= 100`
- `1 <= num <= 10^5`
- At most `10^4` calls **in total** will be made to `step`, `getPos`, and `getDir`.

## Examples

**Example 1:**
```
Input
["Robot", "step", "step", "getPos", "getDir", "step", "step", "step", "getPos", "getDir"]
[[6, 3], [2], [2], [], [], [2], [1], [4], [], []]
Output
[null, null, null, [4, 0], "East", null, null, null, [1, 2], "West"]

Explanation
Robot robot = new Robot(6, 3); // Initialize the grid and the robot at (0, 0) facing East.
robot.step(2);  // It moves two steps East to (2, 0), and faces East.
robot.step(2);  // It moves two steps East to (4, 0), and faces East.
robot.getPos(); // return [4, 0]
robot.getDir(); // return "East"
robot.step(2);  // It moves one step East to (5, 0), and faces East.
                // Moving the next step East would be out of bounds, so it turns and faces North.
                // Then, it moves one step North to (5, 1), and faces North.
robot.step(1);  // It moves one step North to (5, 2), and faces North (not West).
robot.step(4);  // Moving the next step North would be out of bounds, so it turns and faces West.
                // Then, it moves four steps West to (1, 2), and faces West.
robot.getPos(); // return [1, 2]
robot.getDir(); // return "West"
```

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
