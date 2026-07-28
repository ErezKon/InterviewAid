# 2636. Promise Pool

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/promise-pool](https://leetcode.com/problems/promise-pool)
**Companies:** Uber

---

## Problem Description
You are given an array of functions `functions`, each returning a promise, and an integer `n` representing the maximum number of promises that can run concurrently. Execute all functions while never having more than `n` active promises at any time. Return a promise that resolves to an array of results in the order of the original functions.

## Examples
**Example 1:**
```
functions = [f1, f2, f3, f4]
n = 2
```
The pool runs `f1` and `f2` first. As soon as one finishes, the next function starts, ensuring at most two concurrent promises. The final result array contains the resolved values of `f1…f4` in order.

**Example 2:**
```
functions = [f1]
n = 1
```
Only one promise runs, and the result is `[await f1()]`.

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
