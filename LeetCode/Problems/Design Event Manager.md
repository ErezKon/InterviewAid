# 3885. Design Event Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-event-manager](https://leetcode.com/problems/design-event-manager)
**Companies:** Goldman Sachs

---

## Problem Description

Design an event manager supporting subscribing callbacks to event names and emitting events that trigger all subscribed callbacks.

---

## Examples

**Example 1:**
```
EventManager em = new EventManager();
int subId = em.subscribe("click", args -> print(args));
em.emit("click", "Button1");
// Output: Button1
```
*Explanation:* A callback is subscribed to the "click" event. Emitting "click" with argument "Button1" invokes the callback, printing the argument.

**Example 2:**
```
em.subscribe("hover", args -> log(args));
em.emit("hover", "Image2");
// Output: Image2
```
*Explanation:* Multiple event types can have independent subscriber lists.

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

## Walkthrough

| Step | Action | Internal State |
|------|--------|----------------|
| 1 | `subscribe("click", cb)` | `subscribers["click"] = [cb]` |
| 2 | `emit("click", "Button1")` | Iterate over `[cb]` and invoke `cb("Button1")` → prints "Button1" |
| 3 | `subscribe("click", cb2)` | `subscribers["click"] = [cb, cb2]` |
| 4 | `emit("click", "Button2")` | Calls both callbacks with "Button2" |

---

## Complexity Analysis

- **Time Complexity:** `subscribe` O(1); `emit` O(k) where k is the number of callbacks for the event.
- **Space Complexity:** O(n) for storing n total subscriptions across all events.

---

## Follow-Up Questions

- How would you support unsubscribing a specific callback?
- How can you make the emit operation asynchronous?
- How would you limit the number of callbacks per event?

---

## Key Takeaway

> **Pub-sub pattern: hash map of event name → callback list. Emit iterates and invokes all subscribers. Support unsubscribe by returning a handle that removes the callback.**