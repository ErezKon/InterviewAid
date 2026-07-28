# 2721. Execute Asynchronous Functions in Parallel

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/execute-asynchronous-functions-in-parallel](https://leetcode.com/problems/execute-asynchronous-functions-in-parallel)
**Companies:** Paytm

---

## Problem Description

Implement `promiseAll(functions)` that takes an array of async functions, executes them in parallel, and returns a promise that resolves with results in order (like `Promise.all`). If any function rejects, the returned promise rejects with the first error.

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

**Example 1:**
```text
Input: functions = [
  () => Promise.resolve(1),
  () => Promise.resolve(2),
  () => Promise.resolve(3)
]
Output: [1,2,3]
Explanation: All functions resolve immediately; results are collected in order.
```

**Example 2:**
```text
Input: functions = [
  () => new Promise(r => setTimeout(() => r('a'), 100)),
  () => Promise.reject('error'),
  () => Promise.resolve('c')
]
Output: Promise rejects with 'error'
Explanation: The second function rejects, so the overall promise rejects immediately.
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