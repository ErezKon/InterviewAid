# 1381. Design a Stack With Increment Operation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-stack-with-increment-operation](https://leetcode.com/problems/design-a-stack-with-increment-operation)
**Companies:** Amazon, Cloudflare, Ebay, Google, Microsoft, Moloco

---

## Problem Description

Design a stack with `push`, `pop`, and `increment(k, val)` that adds `val` to the bottom `k` elements. All operations in O(1).

---

## Approach

```
CLASS CustomStack:
    CONSTRUCTOR(maxSize):
        stack = []
        inc = []    // lazy increment array
        self.maxSize = maxSize

    FUNCTION push(x):
        IF len(stack) < maxSize:
            stack.PUSH(x)
            inc.PUSH(0)

    FUNCTION pop():
        IF NOT stack: RETURN -1
        idx = len(stack) - 1
        val = stack.POP() + inc.POP()
        IF inc: inc[-1] += inc[idx] IF idx > 0 ELSE 0    // propagate
        RETURN val

    FUNCTION increment(k, val):
        idx = MIN(k, len(stack)) - 1
        IF idx >= 0: inc[idx] += val
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) per push/pop/increment |
| **Space** | O(n) |

---

## Key Takeaway

> **Lazy increment trick: store the increment only at index `k-1`. On pop, propagate the lazy value down to `inc[idx-1]`. All three operations become O(1).**
