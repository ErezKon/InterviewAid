# 2637. Promise Time Limit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/promise-time-limit](https://leetcode.com/problems/promise-time-limit)
**Companies:** Amazon, Google

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented "run a list of functions under a global budget" problem. Correct idea: return `async (...args) => Promise.race([fn(...args), new Promise((_, reject) => setTimeout(() => reject("Time Limit Exceeded"), t))])` (optionally `clearTimeout` once `fn` settles).*

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
Iterate through the functions, measuring elapsed time with a start timestamp. Before invoking each function, check if `currentTime - startTime + estimatedMaxDuration` would exceed `t`. Since we cannot know exact duration, we simply start the next function and abort if the promise resolves after the limit, discarding its result.

```text
FUNCTION promiseTimeLimit(functions, t):
    SET results ← []
    SET start ← CURRENT_TIME_MS()
    
    FOR i ← 0 TO len(functions)-1:
        SET elapsed ← CURRENT_TIME_MS() - start
        IF elapsed >= t:
            BREAK
        SET p ← functions[i]()
        p.THEN(value):
            SET newElapsed ← CURRENT_TIME_MS() - start
            IF newElapsed <= t:
                APPEND value TO results
            ELSE:
                // time limit exceeded after this promise; stop further processing
                BREAK
    RETURN results
```

## Walkthrough
| Step | Elapsed (ms) | Action |
|------|--------------|--------|
| Start | 0 | Record start time |
| Call f1 | 0 | Execute, resolves at 400 → result added |
| Call f2 | 400 | Execute, resolves at 900 → result added |
| Check before f3 | 900 | 900 ≥ 1000? No, start f3 |
| f3 resolves | 1200 | Exceeds limit → discard, stop |

## Complexity Analysis
- **Time:** O(k) where k is number of functions executed before timeout.
- **Space:** O(k) for stored results.

## Follow-Up Questions
1. How would you enforce a hard timeout that cancels a running promise?
2. Can you modify the algorithm to run up to `n` promises concurrently with a global time limit?
3. How would you report which functions were skipped due to the timeout?

## Key Takeaway
By tracking elapsed time after each promise resolves, you can stop further asynchronous work once a global time budget is exhausted.
