# 622. Design Circular Queue

**Difficulty:** 🟡 Medium
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/design-circular-queue](https://leetcode.com/problems/design-circular-queue)
**Companies:** Amazon, Apple, Applied Intuition, Bloomberg, Citadel, Cloudflare, Coinbase, Datadog, Goldman Sachs, Google, Intuit, Meta, Microsoft, Millennium, Optiver, Oracle, Qualcomm, Rubrik, Snowflake, Splunk, Tesla

---

## Problem Description

Design a circular queue with `enQueue`, `deQueue`, `Front`, `Rear`, `isEmpty`, `isFull` operations.

---

## Examples

**Example 1:**

```text
Input:
["MyCircularQueue","enQueue","enQueue","enQueue","enQueue","Rear","isFull"]
[[3],[1],[2],[3],[4],[],[]]

Output:
[null,true,true,true,false,3,true]
```

Explanation:
- Initialize a queue of capacity 3.
- Enqueue 1,2,3 succeed; fourth enqueue fails because the queue is full.
- `Rear` returns 3, and `isFull` is true.

---

## Approach: Array with Head/Tail Pointers ✅

```
CLASS MyCircularQueue:
    CONSTRUCTOR(k):
        data = array of size k
        head = -1
        tail = -1
        size = 0
        capacity = k

    FUNCTION enQueue(value):
        IF isFull(): RETURN false
        IF isEmpty(): head = 0
        tail = (tail + 1) % capacity
        data[tail] = value
        size += 1
        RETURN true

    FUNCTION deQueue():
        IF isEmpty(): RETURN false
        IF head == tail: head = tail = -1
        ELSE: head = (head + 1) % capacity
        size -= 1
        RETURN true

    FUNCTION Front():
        RETURN data[head] IF NOT isEmpty() ELSE -1

    FUNCTION Rear():
        RETURN data[tail] IF NOT isEmpty() ELSE -1

    FUNCTION isEmpty(): RETURN size == 0
    FUNCTION isFull(): RETURN size == capacity
```

All operations run in O(1) time.

---

## Walkthrough

| Step | Operation | Head | Tail | Size | Comments |
|------|-----------|------|------|------|----------|
| 1 | `MyCircularQueue(3)` | -1 | -1 | 0 | Empty buffer |
| 2 | `enQueue(1)` | 0 | 0 | 1 | Head set to 0, tail to 0 |
| 3 | `enQueue(2)` | 0 | 1 | 2 | Tail moves to 1 |
| 4 | `enQueue(3)` | 0 | 2 | 3 | Tail moves to 2, queue full |
| 5 | `enQueue(4)` | 0 | 2 | 3 | Fails because `isFull()` true |
| 6 | `Rear()` | – | – | – | Returns `data[2] = 3` |
| 7 | `isFull()` | – | – | – | Returns true |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) per operation |
| **Space** | O(k) for the underlying array |

---

## Follow-Up Questions

- How would you modify the design to support dynamic resizing when the queue becomes full?
- Can you implement the same queue using a singly linked list with a dummy head?
- How would you make the queue thread‑safe for concurrent producers and consumers?

---

## Key Takeaway

> Circular array uses modulo arithmetic: `(index + 1) % capacity`. A size counter simplifies empty/full detection.
