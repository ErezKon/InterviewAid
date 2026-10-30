# 622. Design Circular Queue

**Difficulty:** 🟡 Medium
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/design-circular-queue](https://leetcode.com/problems/design-circular-queue)
**Companies:** Amazon, Apple, Applied Intuition, Bloomberg, Citadel, Cloudflare, Coinbase, Datadog, Goldman Sachs, Google, Intuit, Meta, Microsoft, Millennium, Optiver, Oracle, Qualcomm, Rubrik, Snowflake, Splunk, Tesla

---

## Problem Description

Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".

One of the benefits of the circular queue is that we can make use of the spaces in front of the queue. In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue. But using the circular queue, we can use the space to store new values.

Implement the `MyCircularQueue` class:

- `MyCircularQueue(k)` Initializes the object with the size of the queue to be `k`.
- `int Front()` Gets the front item from the queue. If the queue is empty, return `-1`.
- `int Rear()` Gets the last item from the queue. If the queue is empty, return `-1`.
- `boolean enQueue(int value)` Inserts an element into the circular queue. Return `true` if the operation is successful.
- `boolean deQueue()` Deletes an element from the circular queue. Return `true` if the operation is successful.
- `boolean isEmpty()` Checks whether the circular queue is empty or not.
- `boolean isFull()` Checks whether the circular queue is full or not.

You must solve the problem without using the built-in queue data structure in your programming language.

**Constraints:**

- `1 <= k <= 1000`
- `0 <= value <= 1000`
- At most `3000` calls will be made to `enQueue`, `deQueue`, `Front`, `Rear`, `isEmpty`, and `isFull`.

---

## Examples

```
Example 1:
  Input:
  ["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
  [[3], [1], [2], [3], [4], [], [], [], [4], []]
  Output:
  [null, true, true, true, false, 3, true, true, true, 4]
  Explanation:
  MyCircularQueue myCircularQueue = new MyCircularQueue(3);
  myCircularQueue.enQueue(1); // return True
  myCircularQueue.enQueue(2); // return True
  myCircularQueue.enQueue(3); // return True
  myCircularQueue.enQueue(4); // return False
  myCircularQueue.Rear();     // return 3
  myCircularQueue.isFull();   // return True
  myCircularQueue.deQueue();  // return True
  myCircularQueue.enQueue(4); // return True
  myCircularQueue.Rear();     // return 4
```

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
