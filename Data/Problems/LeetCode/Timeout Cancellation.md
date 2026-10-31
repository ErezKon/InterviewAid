# 2715. Timeout Cancellation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/timeout-cancellation](https://leetcode.com/problems/timeout-cancellation)
**Companies:** Google, Meta

---

## Problem Description

Given a function `fn`, an array of arguments `args`, and a timeout `t` in milliseconds, return a cancel function `cancelFn`.

After a delay of `cancelTimeMs`, the returned cancel function `cancelFn` will be invoked.

```
setTimeout(cancelFn, cancelTimeMs)
```

Initially, the execution of the function `fn` should be delayed by `t` milliseconds.

If, before the delay of `t` milliseconds, the function `cancelFn` is invoked, it should cancel the delayed execution of `fn`. Otherwise, if `cancelFn` is not invoked within the specified delay `t`, `fn` should be executed with the provided `args` as arguments.

**Constraints:**
- `fn` is a function
- `args` is a valid JSON array
- `1 <= args.length <= 10`
- `20 <= t <= 1000`
- `10 <= cancelTimeMs <= 1000`

## Examples

**Example 1:**
```
Input: fn = (x) => x * 5, args = [2], t = 20
Output: [{"time": 20, "returned": 10}]
Explanation:
const cancelTimeMs = 50;
const cancelFn = cancellable((x) => x * 5, [2], 20);
setTimeout(cancelFn, cancelTimeMs);
The cancellation was scheduled to occur after a delay of cancelTimeMs (50ms), which happened after the execution of fn(2) at 20ms.
```

**Example 2:**
```
Input: fn = (x) => x**2, args = [2], t = 100
Output: []
Explanation:
const cancelTimeMs = 50;
const cancelFn = cancellable((x) => x**2, [2], 100);
setTimeout(cancelFn, cancelTimeMs);
The cancellation was scheduled to occur after a delay of cancelTimeMs (50ms), which happened before the execution of fn(2) at 100ms, resulting in fn(2) never being called.
```

**Example 3:**
```
Input: fn = (x1, x2) => x1 * x2, args = [2,4], t = 30
Output: [{"time": 30, "returned": 8}]
Explanation:
const cancelTimeMs = 100;
const cancelFn = cancellable((x1, x2) => x1 * x2, [2,4], 30);
setTimeout(cancelFn, cancelTimeMs);
The cancellation was scheduled to occur after a delay of cancelTimeMs (100ms), which happened after the execution of fn(2,4) at 30ms.
```

## Approach
Schedule `fn(...args)` immediately with `setTimeout(..., t)` and keep the timer id. Return a closure `cancelFn` that calls `clearTimeout(id)`. If `cancelFn` runs before `t` ms elapse, the pending call is removed from the timer queue and `fn` never executes; if it runs later, `clearTimeout` on an already-fired timer is a harmless no-op.

```text
FUNCTION cancellable(fn, args, t):
    SET timerId ← SET_TIMEOUT(() => fn(...args), t)
    FUNCTION cancelFn():
        CLEAR_TIMEOUT(timerId)
    RETURN cancelFn
```

```javascript
var cancellable = function(fn, args, t) {
    const id = setTimeout(() => fn(...args), t);
    return () => clearTimeout(id);
};
```

## Walkthrough
Example 2: `fn = (x) => x**2`, `args = [2]`, `t = 100`, `cancelTimeMs = 50`.
1. At 0 ms, `cancellable` schedules `fn(2)` for 100 ms and returns `cancelFn`; the harness schedules `cancelFn` for 50 ms.
2. At 50 ms, `cancelFn` runs and calls `clearTimeout(id)`, removing the pending `fn(2)` call.
3. At 100 ms nothing happens, so no call is recorded. Output: `[]`, as expected.

Contrast with Example 1 (`t = 20`, `cancelTimeMs = 50`): the timer fires first at 20 ms, `fn(2)` returns `10` (recorded as `{"time": 20, "returned": 10}`), and the later `clearTimeout` at 50 ms does nothing.

## Complexity Analysis
Time: O(1) to schedule and to cancel (excluding the cost of `fn` itself). Space: O(1) - the closure only holds the timer id.

## Follow-Up Questions
* How would you implement `cancellable` that calls `fn` repeatedly every `t` ms until cancelled (`setInterval` / `clearInterval`)?
* How would you make `cancelFn` report whether it actually cancelled anything (e.g. a `fired` flag set inside the callback)?
* How would you build a Promise-based version where cancelling rejects the pending promise?

## Key Takeaway
A cancellable delayed call is just a timer id captured in a closure: `setTimeout` schedules the work, and the returned function calls `clearTimeout` on that id.
