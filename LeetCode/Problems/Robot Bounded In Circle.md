# 1041. Robot Bounded In Circle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/robot-bounded-in-circle](https://leetcode.com/problems/robot-bounded-in-circle)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, Blue Origin, Goldman Sachs, Google, Linkedin, Microsoft, Tiktok, Zscaler

---

## Problem Description

A robot starts at `(0,0)` facing north and follows a sequence of instructions `G` (go forward 1 unit), `L` (turn left 90°), and `R` (turn right 90°). The instructions are repeated infinitely. Return `true` if the robot never leaves a bounded circle.

---

## Key Insight

> After one cycle: if the robot is back at origin **or** not facing north, it is bounded. A non‑north heading means the robot’s trajectory will be cyclic within 2 or 4 repetitions.

---

## Approach: Simulate One Cycle — O(n) ✅

```text
FUNCTION isRobotBounded(instructions):
    SET x ← 0
    SET y ← 0
    SET dx, dy ← 0, 1    // facing north

    FOR char IN instructions:
        IF char == 'G':
            SET x ← x + dx
            SET y ← y + dy
        ELSE IF char == 'L':
            // rotate left 90°
            SET dx, dy ← -dy, dx
        ELSE IF char == 'R':
            // rotate right 90°
            SET dx, dy ← dy, -dx

    // Bounded if back at origin OR not facing north
    RETURN (x == 0 AND y == 0) OR (dx != 0 OR dy != 1)
```

---

## Examples

| instructions | Output |
|--------------|--------|
| "GGLLGG"    | true   |
| "GG"        | false  |
| "GL"        | true   |

*Explanation:* In the first case the robot returns to the start after two cycles, forming a circle.

---

## Walkthrough

1. Start at (0,0), direction north.
2. Process each character, updating position and direction.
3. After the full string, check position `(x,y)` and direction `(dx,dy)`.
4. If not at origin **and** still facing north, the robot will keep moving away on each repetition → unbounded.
5. Otherwise, the path repeats within a circle.

---

## Complexity Analysis

- **Time:** O(n) where n is the length of the instruction string.
- **Space:** O(1) – only a few integer variables are used.

---

## Follow-Up Questions

- How would the solution change if the robot could also move backward?
- Can you extend the algorithm to handle 3‑D movements?
- What if the instruction string is extremely long (streaming input)?

---

## Key Takeaway

> A single simulation reveals both position and orientation; if either is reset or changed, the robot’s trajectory is inherently bounded.
