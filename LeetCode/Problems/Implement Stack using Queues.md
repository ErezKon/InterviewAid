# 225. Implement Stack using Queues

**Difficulty:** 🟢 Easy
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/implement-stack-using-queues](https://leetcode.com/problems/implement-stack-using-queues)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nagarro, Qualcomm

---

## 1. Problem Description

Implement a LIFO stack using only two queues.

---

## 2. Approach: Push-Expensive — O(n) push, O(1) pop ✅

```
CLASS MyStack:
    CONSTRUCTOR:
        queue = Queue()

    FUNCTION push(x):
        queue.ENQUEUE(x)
        // Rotate: move all elements before x to the back
        FOR i ← 0 TO queue.SIZE() - 2:
            queue.ENQUEUE(queue.DEQUEUE())

    FUNCTION pop():
        RETURN queue.DEQUEUE()

    FUNCTION top():
        RETURN queue.PEEK()

    FUNCTION empty():
        RETURN queue.isEmpty()
```

Only needs one queue. Push rotates the queue so the newest element is always at the front.

---

## Key Takeaway

> Rotate the queue after each push so FIFO order becomes LIFO. Single-queue solution is cleaner than two-queue approaches.
