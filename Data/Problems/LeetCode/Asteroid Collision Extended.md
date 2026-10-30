# 735. Asteroid Collision — Stack Pattern

**Companies:** Accolite, Amazon, Apple, Bloomberg, De Shaw, Doordash, Dream11, Epam Systems, Flipkart, Goldman Sachs, Google, Ibm, Imc, Juspay, Meesho, Meta, Microsoft, Myntra, Nuro, Nvidia, Openai, Oracle, Paypal, Phonepe, Qualtrics, Roku, Salesforce, Servicenow, Sofi, Sprinklr, Tiktok, Uber, Walmart Labs, Zoho
---

## Problem Description
> *Note: companion file of #735 Asteroid Collision (no LeetCode URL by design) — the official statement, examples and constraints are in [Asteroid Collision.md](Asteroid%20Collision.md).*

We are given an array `asteroids` of integers representing asteroids in a row. The indices of the asteroid in the array represent their relative position in space.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

**Constraints:**
- `2 <= asteroids.length <= 10^4`
- `-1000 <= asteroids[i] <= 1000`
- `asteroids[i] != 0`

## Examples
```
Example 1:
  Input: asteroids = [5,10,-5]
  Output: [5,10]
  Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
```
```
Example 2:
  Input: asteroids = [8,-8]
  Output: []
  Explanation: The 8 and -8 collide exploding each other.
```
```
Example 3:
  Input: asteroids = [10,2,-5]
  Output: [10]
  Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.
```
```
Example 4:
  Input: asteroids = [3,5,-6,2,-1,4]
  Output: [-6,2,4]
  Explanation: The asteroid -6 makes the asteroid 3 and 5 explode, and then continues going left. On the other side, the asteroid 2 destroys -1. Since 2 and 4 are both moving right, they never collide.
```

## Approach
Use a stack to keep asteroids moving right. When a left‑moving asteroid arrives, compare it with the stack top:
- If the top moves left or the stack is empty, push the current asteroid.
- Otherwise, resolve collisions by comparing absolute sizes, popping smaller ones, and possibly discarding the current one.

```text
FUNCTION asteroidCollision(asteroids):
    stack ← []
    FOR a IN asteroids:
        collision ← true
        WHILE collision AND stack NOT EMPTY AND a < 0 AND stack.TOP() > 0:
            top ← stack.TOP()
            IF ABS(a) > top:
                POP(stack)               // top explodes
                CONTINUE                 // keep checking
            ELSE IF ABS(a) == top:
                POP(stack)               // both explode
                collision ← false        // current asteroid gone
            ELSE:
                collision ← false        // current asteroid explodes
        IF collision:
            PUSH(stack, a)
    RETURN stack AS LIST
```

## Walkthrough
For `[5,10,-5]`:
1. Push 5 → stack [5]
2. Push 10 → stack [5,10]
3. Encounter -5: compare with top 10 (10 > 5) → -5 explodes, stop. Stack remains [5,10].
Result `[5,10]`.

## Complexity Analysis
*Time*: O(n) – each asteroid is pushed and popped at most once.
*Space*: O(n) – stack holds at most all right‑moving asteroids.

## Follow‑Up Questions
1. How would the algorithm change if asteroids could have varying speeds?
2. Can you adapt the solution to return the order of explosions?
3. What if the line is circular, allowing wrap‑around collisions?

## Key Takeaway
A monotonic stack efficiently resolves pairwise collisions by processing left‑moving asteroids against previously seen right‑moving ones.
