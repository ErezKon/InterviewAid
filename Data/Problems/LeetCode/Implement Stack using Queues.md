# 225. Implement Stack using Queues

**Difficulty:** 🟢 Easy
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/implement-stack-using-queues](https://leetcode.com/problems/implement-stack-using-queues)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nagarro, Qualcomm

---

## 1. Problem Description

Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (`push`, `top`, `pop`, and `empty`).

Implement the `MyStack` class:

- `void push(int x)` Pushes element x to the top of the stack.
- `int pop()` Removes the element on the top of the stack and returns it.
- `int top()` Returns the element on the top of the stack.
- `boolean empty()` Returns `true` if the stack is empty, `false` otherwise.

**Notes:**

- You must use **only** standard operations of a queue, which means that only `push to back`, `peek/pop from front`, `size` and `is empty` operations are valid.
- Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.

**Follow-up:** Can you implement the stack using only one queue?

**Constraints:**
- `1 <= x <= 9`
- At most `100` calls will be made to `push`, `pop`, `top`, and `empty`.
- All the calls to `pop` and `top` are valid.

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
Input
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
Output:
[null, null, null, 2, 2, false]
Explanation:
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False
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

- **Time:** `push` O(n) due to rotation of n-1 elements, `pop`, `top`, `empty` O(1).
- **Space:** O(n) for storing n elements in a single queue.

## Follow-Up Questions

- How would you implement a stack using only one queue?
- Can you adapt the design to support a max operation in O(1)?

## Key Takeaway

> Rotate the queue after each push so FIFO order becomes LIFO. Single-queue solution is cleaner than two-queue approaches.
