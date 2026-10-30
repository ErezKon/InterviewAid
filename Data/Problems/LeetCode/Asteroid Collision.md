# 735. Asteroid Collision

**Difficulty:** 🟡 Medium
**Acceptance:** 45.0%
**LeetCode:** [https://leetcode.com/problems/asteroid-collision](https://leetcode.com/problems/asteroid-collision)
**Companies:** Accolite, Amazon, Apple, Bloomberg, De Shaw, Doordash, Dream11, Epam Systems, Flipkart, Goldman Sachs, Google, Ibm, Imc, Juspay, Meesho, Meta, Microsoft, Myntra, Nuro, Nvidia, Openai, Oracle, Paypal, Phonepe, Qualtrics, Roku, Salesforce, Servicenow, Sofi, Sprinklr, Tiktok, Uber, Walmart Labs, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Stack — O(n) ✅](#3-approach-stack--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

We are given an array `asteroids` of integers representing asteroids in a row. The indices of the asteroid in the array represent their relative position in space.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

**Constraints:**
- `2 <= asteroids.length <= 10⁴`
- `-1000 <= asteroids[i] <= 1000`
- `asteroids[i] != 0`

---

## 2. Examples

```
Example 1:
  Input: asteroids = [5,10,-5]
  Output: [5,10]
  Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.

Example 2:
  Input: asteroids = [8,-8]
  Output: []
  Explanation: The 8 and -8 collide exploding each other.

Example 3:
  Input: asteroids = [10,2,-5]
  Output: [10]
  Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

Example 4:
  Input: asteroids = [3,5,-6,2,-1,4]
  Output: [-6,2,4]
  Explanation: The asteroid -6 makes the asteroid 3 and 5 explode, and then continues going left. On the other side, the asteroid 2 destroys -1. Since 2 and 4 are both moving right, they never collide.
```

---

## 3. Approach: Stack — O(n) ✅

### Key Insight

A collision only happens when a **right-moving** asteroid (positive) is followed by a **left-moving** asteroid (negative). Use a stack; for each new asteroid:
- If it's moving right, push it.
- If it's moving left, collide with right-moving asteroids on the stack until resolved.

### Pseudocode

```
FUNCTION asteroidCollision(asteroids):
    stack = []

    FOR ast IN asteroids:
        alive = true

        WHILE alive AND stack is not empty AND ast < 0 AND stack.TOP() > 0:
            // Collision: right-moving top vs left-moving ast
            IF stack.TOP() < ABS(ast):
                stack.POP()         // top explodes, ast continues
            ELSE IF stack.TOP() == ABS(ast):
                stack.POP()         // both explode
                alive = false
            ELSE:
                alive = false       // ast explodes

        IF alive:
            stack.PUSH(ast)

    RETURN stack
```

---

## 4. Walkthrough

```
asteroids = [10, 2, -5]

ast=10: stack=[], push → stack=[10]
ast=2:  stack=[10], 2>0, push → stack=[10,2]
ast=-5: stack=[10,2], -5<0, top=2>0 → collision
        |2| < |-5| → pop 2, stack=[10]
        stack=[10], -5<0, top=10>0 → collision
        |10| > |-5| → -5 explodes, alive=false
        stack=[10]

Result: [10] ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — each asteroid pushed/popped at most once |
| **Space** | O(n) for the stack |

---

## 6. Follow-Up Questions

### 6.1 What if asteroids can move up/down too (2D)?

Track positions and directions. Use event-driven simulation — calculate collision times, process the earliest collision first, then recalculate.

### 6.2 What if same-direction asteroids can also collide (faster one catches slower)?

Similar stack approach but track speeds. A collision happens when a faster asteroid is behind a slower one in the same direction.

### 6.3 What if we need to track which specific asteroids survive?

Store asteroid indices in the stack alongside values. When an asteroid survives, record its original index.

---

## Key Takeaway

> Asteroid Collision is a **stack simulation** problem. The collision condition (positive followed by negative) maps perfectly to stack push/pop mechanics. Process each element: push if no conflict, pop and compare when a collision occurs.
