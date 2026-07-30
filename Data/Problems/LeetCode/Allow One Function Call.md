# 2666. Allow One Function Call

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Yandex
---

## Problem Description
Implement a higher‑order function `once(fn)` that returns a new function which invokes the original function `fn` at most once. Subsequent calls to the returned function should have no effect and return `undefined`.

## Examples
**Example 1:**
```
const add = (a, b) => a + b;
const onceAdd = once(add);
onceAdd(2, 3); // returns 5
onceAdd(4, 5); // returns undefined
```
**Example 2:**
```
let count = 0;
const inc = () => ++count;
const onceInc = once(inc);
onceInc(); // returns 1
onceInc(); // returns undefined
```

## Approach
Store a boolean flag `called` in the closure. The wrapper checks the flag; if `false`, it calls `fn` and sets the flag to `true`. Otherwise it returns `undefined`.

```text
FUNCTION once(fn):
    SET called ← FALSE
    RETURN FUNCTION(...args):
        IF called:
            RETURN undefined
        SET called ← TRUE
        RETURN CALL fn WITH args
```

## Walkthrough
| Call | args | called before | Action | returned |
|------|------|---------------|--------|----------|
| onceAdd(2,3) | (2,3) | FALSE | invoke `add`, set called=TRUE | 5 |
| onceAdd(4,5) | (4,5) | TRUE | skip, return undefined | undefined |

## Complexity Analysis
- **Time:** O(1) per call – only a flag check.
- **Space:** O(1) for the flag and closure.

## Follow‑Up Questions
1. How would you extend `once` to allow resetting after a certain condition?
2. Can you implement a similar `throttle` or `debounce` utility?
3. What changes are needed for asynchronous functions returning promises?

## Key Takeaway
A closure with a simple boolean flag enables a function to be executed at most once.
