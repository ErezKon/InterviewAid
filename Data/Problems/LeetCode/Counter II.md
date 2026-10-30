# 2665. Counter II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/counter-ii](https://leetcode.com/problems/counter-ii)
**Companies:** Amazon, Google, Microsoft, Yandex

---

## Problem Description
Write a function `createCounter`. It should accept an initial integer `init`. It should return an object with three functions.

The three functions are:

- `increment()` increases the current value by 1 and then returns it.
- `decrement()` reduces the current value by 1 and then returns it.
- `reset()` sets the current value to `init` and then returns it.

**Constraints:**
- `-1000 <= init <= 1000`
- `0 <= calls.length <= 1000`
- `calls[i]` is one of "increment", "decrement" and "reset"

## Examples
```
Example 1:
  Input: init = 5, calls = ["increment","reset","decrement"]
  Output: [6,5,4]
  Explanation:
  const counter = createCounter(5);
  counter.increment(); // 6
  counter.reset(); // 5
  counter.decrement(); // 4
```

```
Example 2:
  Input: init = 0, calls = ["increment","increment","decrement","reset","reset"]
  Output: [1,2,1,0,0]
  Explanation:
  const counter = createCounter(0);
  counter.increment(); // 1
  counter.increment(); // 2
  counter.decrement(); // 1
  counter.reset(); // 0
  counter.reset(); // 0
```

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
