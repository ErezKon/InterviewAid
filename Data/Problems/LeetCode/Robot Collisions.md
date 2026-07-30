# 2751. Robot Collisions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/robot-collisions](https://leetcode.com/problems/robot-collisions)
**Companies:** Amazon, Flipkart, Google, Meesho, Meta, Microsoft

---

## Problem Description

Robots on a number line have positions, health values, and directions (`L` for left, `R` for right). When two robots moving towards each other meet, the robot with lower health is destroyed and the other loses 1 health. If they have equal health, both are destroyed. Return the health values of the surviving robots in their original order.

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

| positions | healths | directions | Output |
|-----------|---------|------------|--------|
| [5,4,3,2,1] | [2,17,9,15,10] | ["R","L","R","L","R"] | [15] |
| [3,5,5,6] | [10,10,10,10] | ["R","L","L","R"] | [] |

*Explanation:* In the first example the robots collide and only the robot at position 2 survives with health 15.

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
