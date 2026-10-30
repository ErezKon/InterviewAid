# 3885. Design Event Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-event-manager](https://leetcode.com/problems/design-event-manager)
**Companies:** Goldman Sachs

---

## Problem Description

You are given an initial list of events, where each event has a unique `eventId` and a `priority`.

Implement the `EventManager` class:

- `EventManager(int[][] events)` Initializes the manager with the given events, where `events[i] = [eventId_i, priority_i]`.
- `void updatePriority(int eventId, int newPriority)` Updates the priority of the **active** event with id `eventId` to `newPriority`.
- `int pollHighest()` Removes and returns the `eventId` of the **active** event with the **highest** priority. If multiple active events have the same priority, return the **smallest** `eventId` among them. If there are no active events, return -1.

An event is called **active** if it has not been removed by `pollHighest()`.

**Constraints:**

- `1 <= events.length <= 10^5`
- `events[i] = [eventId, priority]`
- `1 <= eventId <= 10^9`
- `1 <= priority <= 10^9`
- All the values of `eventId` in `events` are **unique**.
- `1 <= newPriority <= 10^9`
- For every call to `updatePriority`, `eventId` refers to an **active** event.
- At most `10^5` calls in **total** will be made to `updatePriority` and `pollHighest`.

---

## Examples

```
Example 1:
  Input:
  ["EventManager", "pollHighest", "updatePriority", "pollHighest", "pollHighest"]
  [[[[5, 7], [2, 7], [9, 4]]], [], [9, 7], [], []]
  Output:
  [null, 2, null, 5, 9]
  Explanation:
  EventManager eventManager = new EventManager([[5,7], [2,7], [9,4]]); // Initializes the manager with three events
  eventManager.pollHighest(); // both events 5 and 2 have priority 7, so return the smaller id 2
  eventManager.updatePriority(9, 7); // event 9 now has priority 7
  eventManager.pollHighest(); // remaining highest priority events are 5 and 9, return 5
  eventManager.pollHighest(); // return 9
```

```
Example 2:
  Input:
  ["EventManager", "pollHighest", "pollHighest", "pollHighest"]
  [[[[4, 1], [7, 2]]], [], [], []]
  Output:
  [null, 7, 4, -1]
  Explanation:
  EventManager eventManager = new EventManager([[4,1], [7,2]]); // Initializes the manager with two events
  eventManager.pollHighest(); // return 7
  eventManager.pollHighest(); // return 4
  eventManager.pollHighest(); // no events remain, return -1
```

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