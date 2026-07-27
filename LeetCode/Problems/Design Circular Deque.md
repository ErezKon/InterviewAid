# 641. Design Circular Deque

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-circular-deque](https://leetcode.com/problems/design-circular-deque)
**Companies:** Amazon, Goldman Sachs, Google, Meta, Snowflake

---

## Problem Description

Design a circular double-ended queue with `insertFront`, `insertLast`, `deleteFront`, `deleteLast`, `getFront`, `getRear`, `isEmpty`, `isFull`.

---

## Approach: Circular Array — O(1) ✅

```
CLASS MyCircularDeque:
    CONSTRUCTOR(k):
        arr = [0] * k
        front = 0
        rear = 0
        size = 0
        capacity = k

    FUNCTION insertFront(value):
        IF isFull(): RETURN false
        front = (front - 1 + capacity) % capacity
        arr[front] = value
        size += 1
        RETURN true

    FUNCTION insertLast(value):
        IF isFull(): RETURN false
        arr[rear] = value
        rear = (rear + 1) % capacity
        size += 1
        RETURN true

    FUNCTION deleteFront():
        IF isEmpty(): RETURN false
        front = (front + 1) % capacity
        size -= 1
        RETURN true

    FUNCTION deleteLast():
        IF isEmpty(): RETURN false
        rear = (rear - 1 + capacity) % capacity
        size -= 1
        RETURN true
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) all operations |
| **Space** | O(k) |

---

## Key Takeaway

> **Circular array deque: front moves backward with `(front - 1 + cap) % cap`, rear moves forward with `(rear + 1) % cap`. Size counter simplifies empty/full checks.**
