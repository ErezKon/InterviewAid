# 2694. Event Emitter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/event-emitter](https://leetcode.com/problems/event-emitter)
**Companies:** Amazon, Meta, Tiktok, Tinkoff

---

## Problem Description

Design an `EventEmitter` class with `subscribe(eventName, callback)` and `emit(eventName, args)`. `subscribe` returns an object with an `unsubscribe` method. `emit` calls all callbacks in subscription order and returns their results.

---

## Examples

**Example 1:**
```
EventEmitter emitter = new EventEmitter();
Subscription s1 = emitter.subscribe("click", () -> print("first"));
Subscription s2 = emitter.subscribe("click", () -> print("second"));
emitter.emit("click"); // prints "first" then "second"
```

**Example 2:**
```
Subscription s = emitter.subscribe("data", x -> print(x));
s.unsubscribe(); // removes the callback
emitter.emit("data", [5]); // no output
```

---

## Walkthrough

| Step | Action | State of `events` map |
|------|--------|----------------------|
| 1 | `subscribe("click", cb1)` | `{ "click": [cb1] }` |
| 2 | `subscribe("click", cb2)` | `{ "click": [cb1, cb2] }` |
| 3 | `emit("click")` calls `cb1` then `cb2` | unchanged |
| 4 | `unsubscribe` on `cb1` | `{ "click": [cb2] }` |
| 5 | `emit("click")` calls only `cb2` | unchanged |

---

## Follow-Up Questions

1. How would you modify the design to support once‑only listeners?
2. How can you ensure thread‑safety if `subscribe`/`emit` are called from multiple threads?
3. How would you implement priority ordering of callbacks?

---

## Key Takeaway

> Classic observer pattern: map event names to arrays of callbacks, with closures for clean unsubscribe.
