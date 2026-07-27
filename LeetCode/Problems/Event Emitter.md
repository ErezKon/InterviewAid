# 2694. Event Emitter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/event-emitter](https://leetcode.com/problems/event-emitter)
**Companies:** Amazon, Meta, Tiktok, Tinkoff

---

## Problem Description

Design an `EventEmitter` class with `subscribe(eventName, callback)` and `emit(eventName, args)`. `subscribe` returns an object with an `unsubscribe` method. `emit` calls all callbacks in subscription order and returns their results.

---

## Key Insight

> Store callbacks in a map of arrays keyed by event name. `subscribe` pushes to the array and returns a closure that removes the callback. `emit` maps over the array calling each callback.

---

## Approach: Map of Callback Arrays ✅

```javascript
class EventEmitter {
    constructor() { this.events = {}; }

    subscribe(eventName, callback) {
        if (!this.events[eventName]) this.events[eventName] = [];
        this.events[eventName].push(callback);
        return { unsubscribe: () => {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        }};
    }

    emit(eventName, args = []) {
        return (this.events[eventName] || []).map(cb => cb(...args));
    }
}
```

---

## Complexity Analysis

| Operation | Complexity |
|-----------|-----------|
| **subscribe** | O(1) |
| **unsubscribe** | O(n) — filter array |
| **emit** | O(n) — call all subscribers |

---

## Key Takeaway

> **Classic observer pattern in JavaScript. Map of event name → callback arrays. Closures enable clean unsubscribe. Common frontend interview question.**
