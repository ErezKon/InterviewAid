# 1041. Robot Bounded In Circle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/robot-bounded-in-circle](https://leetcode.com/problems/robot-bounded-in-circle)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, Blue Origin, Goldman Sachs, Google, Linkedin, Microsoft, Tiktok, Zscaler

---

## Problem Description

A robot starts at `(0,0)` facing north and follows instructions `G` (go forward), `L` (turn left), `R` (turn right) repeatedly in an infinite loop. Return `true` if the robot stays within a bounded circle.

---

## Key Insight

> After one cycle: if the robot is back at origin OR not facing north, it's bounded. A non-north heading means it will complete a cycle in 2 (180°) or 4 (90°) repetitions.

---

## Approach: Simulate One Cycle — O(n) ✅

```
FUNCTION isRobotBounded(instructions):
    x = y = 0
    dx, dy = 0, 1    // facing north

    FOR char IN instructions:
        IF char == 'G': x += dx; y += dy
        ELSE IF char == 'L': dx, dy = -dy, dx
        ELSE: dx, dy = dy, -dx    // right turn

    // Bounded if: back at origin OR not facing north
    RETURN (x == 0 AND y == 0) OR (dx != 0 OR dy != 1)
```

If not facing north after one cycle, the robot will return to origin after 2 or 4 cycles.
