# 735. Asteroid Collision — Stack Pattern

**Companies:** Accolite, Amazon, Apple, Bloomberg, De Shaw, Doordash, Dream11, Epam Systems, Flipkart, Goldman Sachs, Google, Ibm, Imc, Juspay, Meesho, Meta, Microsoft, Myntra, Nuro, Nvidia, Openai, Oracle, Paypal, Phonepe, Qualtrics, Roku, Salesforce, Servicenow, Sofi, Sprinklr, Tiktok, Uber, Walmart Labs, Zoho
---

## Problem Description
You are given an array `asteroids` where each element represents an asteroid moving along a one‑dimensional line. Positive values move right, negative values move left. When two asteroids meet, the smaller (by absolute value) explodes; if they are equal, both explode. Return the state of the asteroids after all collisions.

## Examples
**Example 1**
```
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The -5 collides with 10 and explodes.
```
**Example 2**
```
Input: asteroids = [8,-8]
Output: []
Explanation: Both explode because they are equal in size.
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
