# 2620. Counter

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/counter](https://leetcode.com/problems/counter)
**Companies:** Amazon, Bloomberg, Epam Systems, Google, Meta, Microsoft

---

## Problem Description
Given an integer `n`, return a `counter` function. This `counter` function initially returns `n` and then returns 1 more than the previous value every subsequent time it is called (`n`, `n + 1`, `n + 2`, etc).

**Constraints:**
- `-1000 <= n <= 1000`
- `0 <= calls.length <= 1000`
- `calls[i] === "call"`

## Examples
```
Example 1:
  Input: n = 10, ["call","call","call"]
  Output: [10,11,12]
  Explanation:
  counter() = 10 // The first time counter() is called, it returns n.
  counter() = 11 // Returns 1 more than the previous time.
  counter() = 12 // Returns 1 more than the previous time.
```

```
Example 2:
  Input: n = -2, ["call","call","call","call","call"]
  Output: [-2,-1,0,1,2]
  Explanation: counter() initially returns -2. Then increases after each subsequent call.
```

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
- How would you make the counter thread-safe for concurrent accesses?

## Key Takeaway
A closure provides a concise way to encapsulate mutable state, enabling a function to remember and update a value across calls with constant-time operations.
