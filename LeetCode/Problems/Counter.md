# 2620. Counter

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/counter](https://leetcode.com/problems/counter)
**Companies:** Amazon, Bloomberg, Epam Systems, Google, Meta, Microsoft

---

## Problem Description
Implement a function `createCounter(n)` that returns another function. Each call to the returned function should return the current value of `n` and then increment `n` by one. The initial value `n` is provided as an argument.
All operations must run in O(1) time and use O(1) extra space.

## Examples
```text
let next = createCounter(3);
next(); // returns 3
next(); // returns 4
next(); // returns 5
```
Explanation: The inner function captures `n` via a closure and increments it after each call.

## Approach
Use a closure to store the mutable variable `n`. The outer function returns an inner function that accesses and updates `n`.

## Pseudocode
```text
FUNCTION createCounter(start):
    SET n ← start
    RETURN FUNCTION():
        SET current ← n
        SET n ← n + 1
        RETURN current
```

## Walkthrough
| Call | Returned value |
|------|----------------|
| createCounter(3) → f | – |
| f() | 3 |
| f() | 4 |
| f() | 5 |

## Complexity Analysis
- **Time:** O(1) per call.
- **Space:** O(1) extra space (stores a single integer).

## Follow-Up Questions
- How would you modify the design to support a `reset()` operation?
- Can you implement the same behavior without using closures (e.g., using a class or struct)?
- How would you make the counter thread‑safe for concurrent accesses?

## Key Takeaway
A closure provides a concise way to encapsulate mutable state, enabling a function to remember and update a value across calls with constant‑time operations.
