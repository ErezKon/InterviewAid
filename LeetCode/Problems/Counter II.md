# 2665. Counter II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/counter-ii](https://leetcode.com/problems/counter-ii)
**Companies:** Amazon, Google, Microsoft, Yandex

---

## Problem Description
Create a counter object that starts from a given integer `init`. The object must support three operations:
- `increment()`: increase the current value by one and return it.
- `decrement()`: decrease the current value by one and return it.
- `reset()`: restore the value back to `init`.
All operations should run in O(1) time and use O(1) extra space.

## Examples
```text
let counter = createCounter(5);
counter.increment(); // returns 6
counter.increment(); // returns 7
counter.decrement(); // returns 6
counter.reset();     // returns 5
```
Explanation: The counter starts at 5 and updates as the methods are called.

## Approach
Use a closure to capture the initial value and a mutable variable for the current count. Each method updates or returns the captured variable.

## Pseudocode
```text
FUNCTION createCounter(init):
    SET count ← init
    RETURN OBJECT with methods:
        FUNCTION increment():
            SET count ← count + 1
            RETURN count
        FUNCTION decrement():
            SET count ← count - 1
            RETURN count
        FUNCTION reset():
            SET count ← init
            RETURN count
```

## Walkthrough
| Step | Operation | count | Returned |
|------|-----------|-------|----------|
| 1    | createCounter(5) | 5 | – |
| 2    | increment() | 6 | 6 |
| 3    | increment() | 7 | 7 |
| 4    | decrement() | 6 | 6 |
| 5    | reset() | 5 | 5 |

## Complexity Analysis
- **Time:** O(1) per operation.
- **Space:** O(1) extra space (only two integer variables).

## Follow-Up Questions
- How would you extend this design to support a `set(value)` operation?
- Can you make the counter thread‑safe for concurrent accesses?
- How would you implement the same functionality without closures (e.g., using a class)?

## Key Takeaway
A closure provides a simple way to encapsulate mutable state and expose controlled operations with constant‑time performance.
