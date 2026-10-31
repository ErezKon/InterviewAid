# 2666. Allow One Function Call

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/allow-one-function-call](https://leetcode.com/problems/allow-one-function-call)

**Companies:** Amazon, Google, Yandex
---

## Problem Description
Given a function `fn`, return a new function that is identical to the original function except that it ensures `fn` is called at most once.

- The first time the returned function is called, it should return the same result as `fn`.
- Every subsequent time it is called, it should return `undefined`.

**Constraints:**
- `calls` is a valid JSON array
- `1 <= calls.length <= 10`
- `1 <= calls[i].length <= 100`
- `2 <= JSON.stringify(calls).length <= 1000`

## Examples
```
Example 1:
  Input: fn = (a,b,c) => (a + b + c), calls = [[1,2,3],[2,3,6]]
  Output: [{"calls":1,"value":6}]
  Explanation:
  const onceFn = once(fn);
  onceFn(1, 2, 3); // 6
  onceFn(2, 3, 6); // undefined, fn was not called
```
```
Example 2:
  Input: fn = (a,b,c) => (a * b * c), calls = [[5,7,4],[2,3,6],[4,6,8]]
  Output: [{"calls":1,"value":140}]
  Explanation:
  const onceFn = once(fn);
  onceFn(5, 7, 4); // 140
  onceFn(2, 3, 6); // undefined, fn was not called
  onceFn(4, 6, 8); // undefined, fn was not called
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

## Follow-Up Questions
1. How would you extend `once` to allow resetting after a certain condition?
2. Can you implement a similar `throttle` or `debounce` utility?
3. What changes are needed for asynchronous functions returning promises?

## Key Takeaway
A closure with a simple boolean flag enables a function to be executed at most once.
