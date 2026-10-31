# 2637. Promise Time Limit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/promise-time-limit](https://leetcode.com/problems/promise-time-limit)
**Companies:** Amazon, Google

---

## Problem Description

Given an asynchronous function `fn` and a time `t` in milliseconds, return a new **time limited** version of the input function. `fn` takes arguments provided to the **time limited** function.

The **time limited** function should follow these rules:

- If the `fn` completes within the time limit of `t` milliseconds, the **time limited** function should resolve with the result.
- If the execution of the `fn` exceeds the time limit, the **time limited** function should reject with the string `"Time Limit Exceeded"`.

**Constraints:**
- `0 <= inputs.length <= 10`
- `0 <= t <= 1000`
- `fn` returns a promise

## Examples

**Example 1:**
```
Input:
fn = async (n) => {
  await new Promise(res => setTimeout(res, 100));
  return n * n;
}
inputs = [5]
t = 50
Output: {"rejected":"Time Limit Exceeded","time":50}
Explanation:
const limited = timeLimit(fn, t)
const start = performance.now()
let result;
try {
   const res = await limited(...inputs)
   result = {"resolved": res, "time": Math.floor(performance.now() - start)};
} catch (err) {
   result = {"rejected": err, "time": Math.floor(performance.now() - start)};
}
console.log(result) // Output

The provided function is set to resolve after 100ms. However, the time limit is set to 50ms. It rejects at t=50ms because the time limit was reached.
```

**Example 2:**
```
Input:
fn = async (n) => {
  await new Promise(res => setTimeout(res, 100));
  return n * n;
}
inputs = [5]
t = 150
Output: {"resolved":25,"time":100}
Explanation:
The function resolved 5 * 5 = 25 at t=100ms. The time limit is never reached.
```

**Example 3:**
```
Input:
fn = async (a, b) => {
  await new Promise(res => setTimeout(res, 120));
  return a + b;
}
inputs = [5,10]
t = 150
Output: {"resolved":15,"time":120}
Explanation:
The function resolved 5 + 10 = 15 at t=120ms. The time limit is never reached.
```

**Example 4:**
```
Input:
fn = async () => {
  throw "Error";
}
inputs = []
t = 1000
Output: {"rejected":"Error","time":0}
Explanation:
The function immediately throws an error.
```

## Approach
Return a wrapper that races `fn(...args)` against a timer. Wrap both in a single `new Promise`: start a `setTimeout` that rejects with `"Time Limit Exceeded"` after `t` ms, and forward `fn`'s resolution or rejection to the outer promise. Whichever settles first wins - a promise can only settle once, so the later event is ignored. Clearing the timer once `fn` settles avoids a dangling timeout. (Equivalent one-liner: `Promise.race([fn(...args), timeoutPromise])`.)

```text
FUNCTION timeLimit(fn, t):
    RETURN ASYNC FUNCTION(...args):
        RETURN NEW PROMISE(resolve, reject):
            SET id ← SET_TIMEOUT(() → reject("Time Limit Exceeded"), t)
            fn(...args)
                .THEN(resolve, reject)          // forward result or error
                .FINALLY(() → CLEAR_TIMEOUT(id))
```

In JavaScript:
```javascript
var timeLimit = function(fn, t) {
  return async function(...args) {
    return new Promise((resolve, reject) => {
      const id = setTimeout(() => reject("Time Limit Exceeded"), t);
      fn(...args).then(resolve, reject).finally(() => clearTimeout(id));
    });
  };
};
```

## Walkthrough
Example 1: `fn` resolves `n * n` after 100 ms, `inputs = [5]`, `t = 50`.

| Step | Elapsed (ms) | Action |
|------|--------------|--------|
| Call `limited(5)` | 0 | Start 50 ms timer; call `fn(5)` (will resolve at 100) |
| Timer fires | 50 | `reject("Time Limit Exceeded")` - outer promise settles |
| `fn` resolves 25 | 100 | `resolve(25)` ignored (already settled); timer already gone |
| Result | | `{"rejected":"Time Limit Exceeded","time":50}` |

With `t = 150` (Example 2), `fn` resolves first at 100 ms, the outer promise resolves with `25`, and the timer is cleared. In Example 4, `fn` rejects immediately with `"Error"`, which is forwarded at time 0.

## Complexity Analysis
- **Time:** O(1) overhead per call beyond `fn` itself - one timer and one promise.
- **Space:** O(1) per pending call.

## Follow-Up Questions
1. The timeout rejects the wrapper but `fn` keeps running - how would you actually cancel it (e.g. pass an `AbortSignal` into `fn`)?
2. How would you implement a retry wrapper that retries `fn` up to `k` times, each attempt with its own time limit?
3. Why is clearing the timer important in Node.js (keeping the event loop alive) and in long-running apps with many calls?

## Key Takeaway
A promise settles only once, so racing the real work against a rejecting timer gives a clean time limit; always clean up the timer once the real work finishes.
