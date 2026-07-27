# 622. Design Circular Queue

**Difficulty:** 🟡 Medium
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/design-circular-queue](https://leetcode.com/problems/design-circular-queue)
**Companies:** Amazon, Apple, Applied Intuition, Bloomberg, Citadel, Cloudflare, Coinbase, Datadog, Goldman Sachs, Google, Intuit, Meta, Microsoft, Millennium, Optiver, Oracle, Qualcomm, Rubrik, Snowflake, Splunk, Tesla

---

## 1. Problem Description

Design a circular queue with: `enQueue`, `deQueue`, `Front`, `Rear`, `isEmpty`, `isFull`.

---

## 2. Approach: Array with Head/Tail Pointers ✅

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

All operations O(1).

---

## Key Takeaway

> Circular array uses modulo arithmetic: `(index + 1) % capacity`. A size counter simplifies empty/full detection.
