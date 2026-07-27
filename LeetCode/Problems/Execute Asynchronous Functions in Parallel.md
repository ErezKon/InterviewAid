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

## Key Takeaway

> **Execute all promises concurrently, track completion count, resolve when all done. Reject on first error. Results array preserves original order regardless of completion order.**
