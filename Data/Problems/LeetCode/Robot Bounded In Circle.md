# 1041. Robot Bounded In Circle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/robot-bounded-in-circle](https://leetcode.com/problems/robot-bounded-in-circle)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, Blue Origin, Goldman Sachs, Google, Linkedin, Microsoft, Tiktok, Zscaler

---

## Problem Description

On an infinite plane, a robot initially stands at `(0, 0)` and faces north. Note that:

- The **north direction** is the positive direction of the y-axis.
- The **south direction** is the negative direction of the y-axis.
- The **east direction** is the positive direction of the x-axis.
- The **west direction** is the negative direction of the x-axis.

The robot can receive one of three instructions:

- `"G"`: go straight 1 unit.
- `"L"`: turn 90 degrees to the left (i.e., anti-clockwise direction).
- `"R"`: turn 90 degrees to the right (i.e., clockwise direction).

The robot performs the `instructions` given in order, and repeats them forever.

Return `true` if and only if there exists a circle in the plane such that the robot never leaves the circle.

**Constraints:**
- `1 <= instructions.length <= 100`
- `instructions[i]` is `'G'`, `'L'` or, `'R'`.

---

## Key Insight

> After one cycle: if the robot is back at origin **or** not facing north, it is bounded. A non-north heading means the robot’s trajectory will be cyclic within 2 or 4 repetitions.

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

**Example 1:**
```
Input: instructions = "GGLLGG"
Output: true
Explanation: The robot is initially at (0, 0) facing the north direction.
"G": move one step. Position: (0, 1). Direction: North.
"G": move one step. Position: (0, 2). Direction: North.
"L": turn 90 degrees anti-clockwise. Position: (0, 2). Direction: West.
"L": turn 90 degrees anti-clockwise. Position: (0, 2). Direction: South.
"G": move one step. Position: (0, 1). Direction: South.
"G": move one step. Position: (0, 0). Direction: South.
Repeating the instructions, the robot goes into the cycle: (0, 0) --> (0, 1) --> (0, 2) --> (0, 1) --> (0, 0).
Based on that, we return true.
```

**Example 2:**
```
Input: instructions = "GG"
Output: false
Explanation: The robot is initially at (0, 0) facing the north direction.
"G": move one step. Position: (0, 1). Direction: North.
"G": move one step. Position: (0, 2). Direction: North.
Repeating the instructions, keeps advancing in the north direction and does not go into cycles.
Based on that, we return false.
```

**Example 3:**
```
Input: instructions = "GL"
Output: true
Explanation: The robot is initially at (0, 0) facing the north direction.
"G": move one step. Position: (0, 1). Direction: North.
"L": turn 90 degrees anti-clockwise. Position: (0, 1). Direction: West.
"G": move one step. Position: (-1, 1). Direction: West.
"L": turn 90 degrees anti-clockwise. Position: (-1, 1). Direction: South.
"G": move one step. Position: (-1, 0). Direction: South.
"L": turn 90 degrees anti-clockwise. Position: (-1, 0). Direction: East.
"G": move one step. Position: (0, 0). Direction: East.
"L": turn 90 degrees anti-clockwise. Position: (0, 0). Direction: North.
Repeating the instructions, the robot goes into the cycle: (0, 0) --> (0, 1) --> (-1, 1) --> (-1, 0) --> (0, 0).
Based on that, we return true.
```

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
- Can you extend the algorithm to handle 3-D movements?
- What if the instruction string is extremely long (streaming input)?

---

## Key Takeaway

> A single simulation reveals both position and orientation; if either is reset or changed, the robot’s trajectory is inherently bounded.
