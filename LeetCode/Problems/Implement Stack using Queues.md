# 225. Implement Stack using Queues

**Difficulty:** 🟢 Easy
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/implement-stack-using-queues](https://leetcode.com/problems/implement-stack-using-queues)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nagarro, Qualcomm

---

## 1. Problem Description

Implement a LIFO stack using only two queues.

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

## Examples

**Example 1:**
```
stack = MyStack()
stack.push(1)
stack.push(2)
stack.top()   // returns 2
stack.pop()   // returns 2
stack.top()   // returns 1
```

**Example 2:**
```
stack = MyStack()
stack.empty() // true
stack.push(5)
stack.empty() // false
```

## Walkthrough

| Step | Operation | Queue State |
|------|-----------|-------------|
| 1 | push(1) | [1] |
| 2 | push(2) | [2,1] (rotate) |
| 3 | top() | returns 2, queue unchanged |
| 4 | pop() | returns 2, queue becomes [1] |
| 5 | top() | returns 1 |

## Complexity Analysis

- **Time:** `push` O(n) due to rotation of n‑1 elements, `pop`, `top`, `empty` O(1).
- **Space:** O(n) for storing n elements in a single queue.

## Follow-Up Questions

- How would you implement a stack using only one queue?
- Can you adapt the design to support a max operation in O(1)?

## Key Takeaway

> Rotate the queue after each push so FIFO order becomes LIFO. Single‑queue solution is cleaner than two‑queue approaches.
