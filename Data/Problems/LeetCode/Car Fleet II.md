# 1776. Car Fleet II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/car-fleet-ii](https://leetcode.com/problems/car-fleet-ii)
**Companies:** Amazon, Google, Microsoft

---

## Problem Description
You are given an array `cars` where `cars[i] = [position_i, speed_i]`. All cars travel to the right on a single lane road. When a faster car catches up to a slower car, it forms a fleet and continues at the slower car's speed. For each car, compute the time at which it will collide with the next car ahead of it (or `-1` if it never collides).

## Examples
- Input: `cars = [[1,2],[2,1],[4,3],[7,2]]`
  Output: `[1.0, -1.0, 3.0, -1.0]`
  Explanation: Car 0 catches car 1 after 1 unit of time; car 2 catches car 3 after 3 units; others never collide.
- Input: `cars = [[3,4],[5,4],[6,3],[9,1]]`
  Output: `[-1.0, 1.0, -1.0, -1.0]`

## Approach: Monotonic Stack with Collision Times — O(n) ✅

```text
FUNCTION getCollisionTimes(cars):
    n ← LENGTH(cars)
    result ← ARRAY of size n filled with -1.0
    stack ← EMPTY   // stores indices of cars that are potential collision targets
    FOR i FROM n-1 DOWNTO 0:
        pos_i ← cars[i][0]
        speed_i ← cars[i][1]
        // Remove cars that are faster or will collide later than current candidate
        WHILE stack NOT EMPTY:
            j ← stack.TOP()
            pos_j ← cars[j][0]
            speed_j ← cars[j][1]
            // If current car is slower or equal, it can never catch j
            IF speed_i <= speed_j:
                stack.POP()
                CONTINUE
            // Time to catch j
            t ← (pos_j - pos_i) / (speed_i - speed_j)
            // If j never collides (result[j] == -1) or collision occurs before j's own collision
            IF result[j] == -1.0 OR t <= result[j]:
                BREAK   // j is the valid collision target
            // Otherwise j would have collided earlier, so discard it
            stack.POP()
        IF stack NOT EMPTY:
            j ← stack.TOP()
            result[i] ← (cars[j][0] - pos_i) / (speed_i - cars[j][1])
        stack.PUSH(i)
    RETURN result
```

The stack maintains cars that are still viable collision candidates; popping removes those that become irrelevant due to earlier collisions.

## Walkthrough (first example)
1. Start from last car (index 3) → no car ahead, result[3] = -1, push 3.
2. Car 2: faster than car 3, compute t = (7-4)/(3-2)=3 ≤ result[3] (-1 treated as infinite) → result[2]=3, push 2.
3. Car 1: slower than car 2, pop 2; now top is 3, but speed_i ≤ speed_j, pop 3; stack empty → result[1] = -1, push 1.
4. Car 0: faster than car 1, t = (2-1)/(2-1)=1 ≤ result[1] (-1) → result[0]=1, push 0.

## Complexity Analysis
- **Time:** O(n) – each car is pushed and popped at most once.
- **Space:** O(n) for the result array and stack.

## Follow‑Up Questions
1. How would the solution change if cars could change speed after collisions?
2. Can you extend the algorithm to handle cars moving in both directions?
3. What is the effect of floating‑point precision on the computed times?

## Key Takeaway
A monotonic stack lets you efficiently determine the next collision for each car by discarding cars that become irrelevant due to earlier collisions.
