# 1472. Design Browser History

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-browser-history](https://leetcode.com/problems/design-browser-history)
**Companies:** Amazon, Apple, Bloomberg, Chime, Doordash, Goldman Sachs, Google, Microsoft, Roblox, Rokt, Snapchat, Snowflake, Uber

---

## Problem Description

Design browser history with `visit(url)`, `back(steps)`, `forward(steps)`. Visiting a new page clears forward history.

---

## Approach: Array/List with Pointer ✅

```
CLASS BrowserHistory:
    CONSTRUCTOR(homepage):
        history = [homepage]
        current = 0

    FUNCTION visit(url):
        // Truncate forward history
        history = history[0..current]
        history.ADD(url)
        current += 1

    FUNCTION back(steps):
        current = MAX(0, current - steps)
        RETURN history[current]

    FUNCTION forward(steps):
        current = MIN(len(history) - 1, current + steps)
        RETURN history[current]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) back/forward, O(1) amortized visit |
| **Space** | O(n) |

---

## Key Takeaway

> **Array + pointer: visit truncates forward history and appends. Back/forward clamp the pointer. Alternatively, use two stacks (back/forward) or a doubly-linked list.**
