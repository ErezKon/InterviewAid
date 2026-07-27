# 1670. Design Front Middle Back Queue

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-front-middle-back-queue](https://leetcode.com/problems/design-front-middle-back-queue)
**Companies:** Amazon, Citadel

---

## Problem Description

Design a queue supporting push/pop at front, middle, and back. All operations in O(1).

---

## Approach

```
CLASS FrontMiddleBackQueue:
    // Two deques: first half and second half
    // Maintain: len(first) == len(second) or len(first) == len(second) - 1
    first = deque()
    second = deque()

    FUNCTION balance():
        IF len(first) > len(second):
            second.appendleft(first.pop())
        IF len(second) > len(first) + 1:
            first.append(second.popleft())

    FUNCTION pushFront(val): first.appendleft(val); balance()
    FUNCTION pushMiddle(val): first.append(val); balance()
    FUNCTION pushBack(val): second.append(val); balance()
    FUNCTION popFront(): pop from first (or second if empty); balance()
    FUNCTION popMiddle(): pop from end of first or front of second; balance()
    FUNCTION popBack(): pop from second; balance()
```

---

## Key Takeaway

> **Two deques split at the middle with a balance invariant. All push/pop operations are O(1) amortized. Rebalance after each operation to keep halves aligned.**
