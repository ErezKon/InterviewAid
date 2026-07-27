# 3885. Design Event Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-event-manager](https://leetcode.com/problems/design-event-manager)
**Companies:** Goldman Sachs

---

## Problem Description

Design an event manager supporting subscribing callbacks to event names and emitting events that trigger all subscribed callbacks.

---

## Approach

```
CLASS EventManager:
    subscribers = defaultdict(list)  // eventName → list of callbacks

    FUNCTION subscribe(eventName, callback):
        subscribers[eventName].ADD(callback)
        RETURN subscriptionId for unsubscribe

    FUNCTION emit(eventName, args):
        FOR callback IN subscribers[eventName]:
            callback(args)
```

---

## Key Takeaway

> **Pub-sub pattern: hash map of event name → callback list. Emit iterates and invokes all subscribers. Support unsubscribe by returning a handle that removes the callback.**
