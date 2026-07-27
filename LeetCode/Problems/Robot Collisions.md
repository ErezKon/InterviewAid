# 2751. Robot Collisions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/robot-collisions](https://leetcode.com/problems/robot-collisions)
**Companies:** Amazon, Flipkart, Google, Meesho, Meta, Microsoft

---

## Problem Description

Robots on a number line have positions, healths, and directions (`L`/`R`). When robots collide (opposite directions meet), the one with lower health is destroyed, the other loses 1 health. Return surviving robots' healths in original order.

---

## Key Insight

> Sort by position and use a **stack** of right-moving robots. When a left-moving robot appears, resolve collisions with the stack top — same pattern as asteroid collisions.

---

## Approach: Stack Simulation — O(n log n) ✅

```
FUNCTION survivedRobotsHealths(positions, healths, directions):
    robots = sorted by position, keeping original indices

    stack = []    // indices of right-moving robots
    FOR idx IN sorted order:
        IF directions[idx] == 'R':
            stack.PUSH(idx)
        ELSE:    // 'L' moving
            WHILE stack AND healths[idx] > 0:
                top = stack[-1]
                IF healths[top] < healths[idx]:
                    stack.POP()
                    healths[top] = 0
                    healths[idx] -= 1
                ELSE IF healths[top] == healths[idx]:
                    stack.POP()
                    healths[top] = 0
                    healths[idx] = 0
                ELSE:
                    healths[top] -= 1
                    healths[idx] = 0

    RETURN [healths[i] for i in original order if healths[i] > 0]
```
