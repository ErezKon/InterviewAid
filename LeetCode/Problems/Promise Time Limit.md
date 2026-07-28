# 2637. Promise Time Limit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/promise-time-limit](https://leetcode.com/problems/promise-time-limit)
**Companies:** Amazon, Google

---

## Problem Description
Given an array of asynchronous functions `functions` and an integer `t` (milliseconds), execute the functions sequentially. If the total elapsed time exceeds `t`, abort remaining executions and return the results obtained so far.

## Examples
**Example 1:**
```
functions = [f1, f2, f3]
t = 1000
```
If `f1` takes 400 ms, `f2` 500 ms, and `f3` 300 ms, after `f1` and `f2` the elapsed time is 900 ms. Starting `f3` would exceed the limit, so execution stops and the result contains outputs of `f1` and `f2`.

**Example 2:**
```
functions = [f1]
t = 0
```
No function runs; the result is an empty array.

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
