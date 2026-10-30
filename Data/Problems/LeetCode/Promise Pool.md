# 2636. Promise Pool

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/promise-pool](https://leetcode.com/problems/promise-pool)
**Companies:** Uber

---

## Problem Description

Given an array of asynchronous functions `functions` and a **pool limit** `n`, return an asynchronous function `promisePool`. It should return a promise that resolves when all the input functions resolve.

**Pool limit** is defined as the maximum number promises that can be pending at once. `promisePool` should begin execution of as many functions as possible and continue executing new functions when old promises resolve. `promisePool` should execute `functions[i]` then `functions[i + 1]` then `functions[i + 2]`, etc. When the last promise resolves, `promisePool` should also resolve.

For example, if `n = 1`, `promisePool` will execute one function at a time in series. However, if `n = 2`, it first executes two functions. When either of the two functions resolve, a 3rd function should be executed (if available), and so on until there are no functions left to execute.

You can assume all `functions` never reject. It is acceptable for `promisePool` to return a promise that resolves any value.

**Constraints:**
- `0 <= functions.length <= 10`
- `1 <= n <= 10`

## Examples

**Example 1:**
```
Input:
functions = [
  () => new Promise(res => setTimeout(res, 300)),
  () => new Promise(res => setTimeout(res, 400)),
  () => new Promise(res => setTimeout(res, 200))
]
n = 2
Output: [[300,400,500],500]
Explanation:
Three functions are passed in. They sleep for 300ms, 400ms, and 200ms respectively.
They resolve at 300ms, 400ms, and 500ms respectively. The returned promise resolves at 500ms.
At t=0, the first 2 functions are executed. The pool size limit of 2 is reached.
At t=300, the 1st function resolves, and the 3rd function is executed. Pool size is 2.
At t=400, the 2nd function resolves. There is 1 function left to execute. Pool size is 1.
At t=500, the 3rd function resolves. Pool size is zero so the returned promise also resolves.
```

**Example 2:**
```
Input:
functions = [
  () => new Promise(res => setTimeout(res, 300)),
  () => new Promise(res => setTimeout(res, 400)),
  () => new Promise(res => setTimeout(res, 200))
]
n = 5
Output: [[300,400,200],400]
Explanation:
The three input promises resolve at 300ms, 400ms, and 200ms respectively.
The returned promise resolves at 400ms.
At t=0, all 3 functions are executed. The pool limit of 5 is never met.
At t=200, the 3rd function resolves. Pool size is 2.
At t=300, the 1st function resolved. Pool size is 1.
At t=400, the 2nd function resolves. Pool size is 0, so the returned promise also resolves.
```

**Example 3:**
```
Input:
functions = [
  () => new Promise(res => setTimeout(res, 300)),
  () => new Promise(res => setTimeout(res, 400)),
  () => new Promise(res => setTimeout(res, 200))
]
n = 1
Output: [[300,700,900],900]
Explanation:
The three input promises resolve at 300ms, 700ms, and 900ms respectively.
The returned promise resolves at 900ms.
At t=0, the 1st function is executed. Pool size is 1.
At t=300, the 1st function resolves and the 2nd function is executed. Pool size is 1.
At t=700, the 2nd function resolves and the 3rd function is executed. Pool size is 1.
At t=900, the 3rd function resolves. Pool size is 0 so the returned promise resolves.
```

## Approach
Use a queue to store pending functions and a counter for active promises. Launch up to `n` promises initially. When a promise settles, dequeue the next function and start it. Collect results in an array indexed by the original position.

```text
FUNCTION promisePool(functions, n):
    SET results ← array of size len(functions)
    SET index ← 0
    SET active ← 0
    SET queue ← COPY of functions
    SET promiseList ← []
    
    FUNCTION runNext():
        IF index >= len(functions):
            RETURN
        SET fn ← queue.popFront()
        SET curIdx ← index
        INCREMENT index
        INCREMENT active
        SET p ← fn()
        APPEND p TO promiseList
        p.THEN(value):
            SET results[curIdx] ← value
            DECREMENT active
            runNext()
        
    WHILE active < n AND index < len(functions):
        runNext()
    
    RETURN Promise.ALL(promiseList).THEN(() → results)
```

## Walkthrough
| Step | Active Promises | Action |
|------|----------------|--------|
| 1 | 0 | Start `f1` and `f2` (n=2) |
| 2 | 2 | `f1` resolves → store result, start `f3` |
| 3 | 2 | `f2` resolves → store result, start `f4` |
| 4 | 2 | `f3` resolves → store result |
| 5 | 1 | `f4` resolves → store result, all done |

## Complexity Analysis
- **Time:** Each function runs once → O(m) where m = number of functions.
- **Space:** O(m) for results and pending promises.

## Follow-Up Questions
1. How would you modify the pool to enforce a total timeout for all promises?
2. Can you adapt the solution to prioritize certain functions over others?
3. How would you handle functions that may reject?

## Key Takeaway
A promise pool limits concurrency by tracking active promises and launching new ones only when slots free up, ensuring resource constraints are respected.
