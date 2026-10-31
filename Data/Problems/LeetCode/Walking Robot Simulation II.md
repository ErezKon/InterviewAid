# 2069. Walking Robot Simulation II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/walking-robot-simulation-ii](https://leetcode.com/problems/walking-robot-simulation-ii)
**Companies:** Google, Square

---

## Problem Description

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
The robot starts on the border facing East and only turns when it hits the border, so it always walks along the **perimeter** counterclockwise. The perimeter is a cycle of `P = 2·(width + height) − 4` cells. Store only an index `pos` along this cycle (cell `(0, 0)` is index 0) and update `pos = (pos + num) mod P` in O(1); full laps change nothing.

Decoding `pos` (with `W = width`, `H = height`):

| Range of `pos` | Segment | Cell | Direction |
|---|---|---|---|
| `0 .. W−1` | bottom edge | `(pos, 0)` | East |
| `W .. W+H−2` | right edge | `(W−1, pos−(W−1))` | North |
| `W+H−1 .. 2W+H−3` | top edge | `(W−1−(pos−(W+H−2)), H−1)` | West |
| `2W+H−2 .. P−1` | left edge | `(0, H−1−(pos−(2W+H−3)))` | South |

Special case: `pos = 0` means `(0, 0)`. Before any move the robot faces East; after it has moved at least once it can only arrive at `(0, 0)` walking down the left edge, so it faces **South**.

```text
CLASS Robot:
    FUNCTION init(width, height):
        W ← width;  H ← height
        P ← 2 * (W + H) - 4
        pos ← 0;  moved ← false

    FUNCTION step(num):
        moved ← true
        pos ← (pos + num) MOD P

    FUNCTION getPos():
        RETURN decode()[0]

    FUNCTION getDir():
        RETURN decode()[1]

    FUNCTION decode():
        IF pos = 0:
            RETURN ([0, 0], IF moved THEN "South" ELSE "East")
        IF pos ≤ W - 1:        RETURN ([pos, 0], "East")
        IF pos ≤ W + H - 2:    RETURN ([W - 1, pos - (W - 1)], "North")
        IF pos ≤ 2W + H - 3:   RETURN ([W - 1 - (pos - (W + H - 2)), H - 1], "West")
        RETURN ([0, H - 1 - (pos - (2W + H - 3))], "South")
```

## Walkthrough
Example 1: `W = 6`, `H = 3`, `P = 2·9 − 4 = 14`. Segment bounds: East `0..5`, North `6..7`, West `8..12`, South `13`.

| Call | pos after | Segment | Result |
|------|-----------|---------|--------|
| step(2) | 2 | East | — |
| step(2) | 4 | East | — |
| getPos | 4 | East | `[4, 0]` |
| getDir | 4 | East | `"East"` |
| step(2) | 6 | North | (5, 1) |
| step(1) | 7 | North | (5, 2) |
| step(4) | 11 | West | x = 5 − (11 − 7) = 1 |
| getPos | 11 | West | `[1, 2]` |
| getDir | 11 | West | `"West"` |

Output: `[null, null, null, [4, 0], "East", null, null, null, [1, 2], "West"]`.

## Complexity Analysis
- Time: O(1) per call — `step` is a modular addition and decoding is a few comparisons.
- Space: O(1).

## Follow-Up Questions
- Why is the direction at `(0, 0)` South rather than East after a full lap, and why does a naive simulation that "turns lazily" get this wrong?
- How would you support a `stepBack(num)` operation? (`pos ← (pos − num) mod P`, with care for direction at corners.)
- What if the grid had obstacles inside it? (The robot still never leaves the perimeter, so interior obstacles do not matter; obstacles on the border would require precomputing the actual cycle.)

## Key Takeaway
Recognize that the motion is confined to a cycle: reduce the step count modulo the perimeter length and decode the index into coordinates and direction, handling the corner case at the origin explicitly.
