# 2751. Robot Collisions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/robot-collisions](https://leetcode.com/problems/robot-collisions)
**Companies:** Amazon, Flipkart, Google, Meesho, Meta, Microsoft

---

## Problem Description

There are `n` **1-indexed** robots, each having a position on a line, health, and movement direction.

You are given **0-indexed** integer arrays `positions`, `healths`, and a string `directions` (`directions[i]` is either **'L'** for **left** or **'R'** for **right**). All integers in `positions` are **unique**.

All robots start moving on the line** simultaneously** at the **same speed **in their given directions. If two robots ever share the same position while moving, they will **collide**.

If two robots collide, the robot with **lower health** is **removed** from the line, and the health of the other robot **decreases** **by one**. The surviving robot continues in the **same** direction it was going. If both robots have the **same** health, they are both** **removed from the line.

Your task is to determine the **health** of the robots that survive the collisions, in the same **order **that the robots were given,** **i.e. final health of robot 1 (if survived), final health of robot 2 (if survived), and so on. If there are no survivors, return an empty array.

Return *an array containing the health of the remaining robots (in the order they were given in the input), after no further collisions can occur.*

**Note:** The positions may be unsorted.

**Constraints:**
- `1 <= positions.length == healths.length == directions.length == n <= 10^5`
- `1 <= positions[i], healths[i] <= 10^9`
- `directions[i] == 'L'` or `directions[i] == 'R'`
- All values in `positions` are distinct

---

## Key Insight

> Sort robots by position and use a **stack** for right‑moving robots. When a left‑moving robot appears, resolve collisions with the stack top – the same pattern as the classic asteroid collision problem.

---

## Approach: Stack Simulation — O(n log n) ✅

```text
FUNCTION survivedRobotsHealths(positions, healths, directions):
    // Pair each robot with its original index and sort by position
    robots ← SORTED LIST of (position, health, direction, originalIndex)

    stack ← []    // stores indices of right‑moving robots
    FOR robot IN robots:
        IF robot.direction == 'R':
            stack.PUSH(robot)
        ELSE: // direction 'L'
            WHILE stack NOT EMPTY AND robot.health > 0:
                top ← stack.TOP()
                IF top.health < robot.health:
                    // top robot dies, robot loses 1 health
                    stack.POP()
                    top.health ← 0
                    robot.health ← robot.health - 1
                ELSE IF top.health == robot.health:
                    // both die
                    stack.POP()
                    top.health ← 0
                    robot.health ← 0
                ELSE:
                    // robot dies, top loses 1 health
                    top.health ← top.health - 1
                    robot.health ← 0

    // Collect surviving healths in original order
    result ← []
    FOR i FROM 0 TO LENGTH(healths)-1:
        IF healths[i] > 0:
            APPEND healths[i] TO result
    RETURN result
```

---

## Examples

**Example 1:**
```
Input: positions = [5,4,3,2,1], healths = [2,17,9,15,10], directions = "RRRRR"
Output: [2,17,9,15,10]
Explanation: No collision occurs in this example, since all robots are moving in the same direction. So, the health of the robots in order from the first robot is returned, [2, 17, 9, 15, 10].
```

**Example 2:**
```
Input: positions = [3,5,2,6], healths = [10,10,15,12], directions = "RLRL"
Output: [14]
Explanation: There are 2 collisions in this example. Firstly, robot 1 and robot 2 will collide, and since both have the same health, they will be removed from the line. Next, robot 3 and robot 4 will collide and since robot 4's health is smaller, it gets removed, and robot 3's health becomes 15 - 1 = 14. Only robot 3 remains, so we return [14].
```

**Example 3:**
```
Input: positions = [1,2,5,6], healths = [10,10,11,11], directions = "RLRL"
Output: []
Explanation: Robot 1 and robot 2 will collide and since both have the same health, they are both removed. Robot 3 and 4 will collide and since both have the same health, they are both removed. So, we return an empty array, [].
```

---

## Walkthrough

1. Sort robots by position → [(1,R,10), (2,L,15), (3,R,9), (4,L,17), (5,R,2)].
2. Process each robot:
   - Push right‑moving robots onto the stack.
   - When a left‑moving robot arrives, repeatedly compare with the stack top:
     * If top health < current health → pop top, decrement current health.
     * If equal → pop top and discard current robot.
     * If top health > current health → decrement top health, discard current robot.
3. After all collisions, remaining robots in the stack and any untouched left‑moving robots are survivors.
4. Return their healths preserving the original input order.

---

## Complexity Analysis

- **Time:** O(n log n) for sorting plus O(n) for the stack simulation.
- **Space:** O(n) for the sorted list and the stack.

---

## Follow‑Up Questions

- How would the algorithm change if robots could also move vertically (2‑D plane)?
- Can you handle the case where multiple robots collide at the exact same point simultaneously?
- What if health reduction is proportional to the difference in health rather than a fixed 1?

---

## Key Takeaway

> Sorting by position and using a stack to resolve opposite‑direction collisions mirrors the asteroid‑collision pattern, turning a seemingly complex interaction into a linear pass.
