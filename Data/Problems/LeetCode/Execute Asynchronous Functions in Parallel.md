# 2721. Execute Asynchronous Functions in Parallel

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/execute-asynchronous-functions-in-parallel](https://leetcode.com/problems/execute-asynchronous-functions-in-parallel)
**Companies:** Paytm

---

## Problem Description

Given an array of asynchronous functions `functions`, return a new promise `promise`. Each function in the array accepts no arguments and returns a promise. All the promises should be executed in parallel.

`promise` resolves:

- When all the promises returned from `functions` were resolved successfully in parallel. The resolved value of `promise` should be an array of all the resolved values of promises in the same order as they were in the `functions`. The `promise` should resolve when all the asynchronous functions in the array have completed execution in parallel.

`promise` rejects:

- When any of the promises returned from `functions` were rejected. `promise` should also reject with the reason of the first rejection.

Please solve it without using the built-in `Promise.all` function.

**Constraints:**
- `functions` is an array of functions that returns promises
- `1 <= functions.length <= 10`

---

## Approach: Manual Promise.all Implementation ✅

```javascript
function promiseAll(functions) {
    return new Promise((resolve, reject) => {
        const results = new Array(functions.length);
        let resolved = 0;

        functions.forEach((fn, i) => {
            fn().then(val => {
                results[i] = val;
                resolved++;
                if (resolved === functions.length) resolve(results);
            }).catch(reject);
        });
    });
}
```

---

## Examples

```
Example 1:
  Input: functions = [
    () => new Promise(resolve => setTimeout(() => resolve(5), 200))
  ]
  Output: {"t": 200, "resolved": [5]}
  Explanation:
  promiseAll(functions).then(console.log); // [5]
  The single function was resolved at 200ms with a value of 5.
```

```
Example 2:
  Input: functions = [
    () => new Promise(resolve => setTimeout(() => resolve(1), 200)),
    () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))
  ]
  Output: {"t": 100, "rejected": "Error"}
  Explanation: Since one of the promises rejected, the returned promise also rejected with the same error at the same time.
```

```
Example 3:
  Input: functions = [
    () => new Promise(resolve => setTimeout(() => resolve(4), 50)),
    () => new Promise(resolve => setTimeout(() => resolve(10), 150)),
    () => new Promise(resolve => setTimeout(() => resolve(16), 100))
  ]
  Output: {"t": 150, "resolved": [4,10,16]}
  Explanation: All the promises resolved with a value. The returned promise resolved when the last promise resolved.
```

---

## Walkthrough

| Step | Action |
|------|--------|
| 1 | Create an array `results` of length `n` to hold each function's resolved value. |
| 2 | Initialize a counter `resolved = 0`. |
| 3 | Iterate over each function `fn` with its index `i`. |
| 4 | Call `fn()` to start the async operation. |
| 5 | On `then`, store the value in `results[i]`, increment `resolved`. |
| 6 | If `resolved === n`, resolve the outer promise with `results`. |
| 7 | On `catch`, immediately reject the outer promise with the error. |

---

## Complexity Analysis

- **Time:** O(n) – each function is invoked once.
- **Space:** O(n) – storage for the `results` array and the pending promises.

---

## Follow-Up Questions

- How would you limit the number of concurrently running functions?
- How can you implement a timeout for each async operation?
- How would you preserve cancellation semantics?

---

## Key Takeaway

> **Execute all promises concurrently, track completion count, resolve when all done. Reject on first error. Results array preserves original order regardless of completion order.**