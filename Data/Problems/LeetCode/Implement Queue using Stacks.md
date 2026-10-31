# 232. Implement Queue using Stacks

**Difficulty:** 🟢 Easy
**Acceptance:** 67.0%
**LeetCode:** [https://leetcode.com/problems/implement-queue-using-stacks](https://leetcode.com/problems/implement-queue-using-stacks)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Meta, Microsoft, Qualcomm, Sap, Tiktok, Yandex
---

## 1. Problem Description

Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

Implement the `MyQueue` class:

- `void push(int x)` Pushes element x to the back of the queue.
- `int pop()` Removes the element from the front of the queue and returns it.
- `int peek()` Returns the element at the front of the queue.
- `boolean empty()` Returns `true` if the queue is empty, `false` otherwise.

**Notes:**

- You must use **only** standard operations of a stack, which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.
- Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.

**Follow-up:** Can you implement the queue such that each operation is **amortized** `O(1)` time complexity? In other words, performing `n` operations will take overall `O(n)` time even if one of those operations may take longer.

**Constraints:**
- `1 <= x <= 9`
- At most `100` calls will be made to `push`, `pop`, `peek`, and `empty`.
- All the calls to `pop` and `peek` are valid.

---

## 2. Approach: Two Stacks — Amortized O(1) ✅

- **pushStack**: new elements go here.
- **popStack**: elements ready to dequeue.

When `popStack` is empty, pour all of `pushStack` into `popStack` (reversing order).

```
CLASS MyQueue:
    CONSTRUCTOR:
        pushStack ← []
        popStack ← []

    FUNCTION push(x):
        pushStack.PUSH(x)

    FUNCTION pop():
        IF popStack is empty:
            WHILE pushStack not empty:
                popStack.PUSH(pushStack.POP())
        RETURN popStack.POP()

    FUNCTION peek():
        IF popStack is empty:
            WHILE pushStack not empty:
                popStack.PUSH(pushStack.POP())
        RETURN popStack.TOP()

    FUNCTION empty():
        RETURN pushStack is empty AND popStack is empty
```

Each element is moved at most once from pushStack to popStack → **amortized O(1)** per operation.

---

## 3. Examples

**Example 1:**
```
Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output:
[null, null, null, 1, 1, false]
Explanation:
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
```

---

## 4. Walkthrough

1. **push(1)**: `pushStack` = [1]; `popStack` = []
2. **push(2)**: `pushStack` = [1,2]
3. **peek()**: `popStack` empty, transfer → `popStack` = [2,1]; return top = 1
4. **pop()**: `popStack` now [2]; returns 1
5. **empty()**: both stacks not empty → false

---

## 5. Complexity Analysis

- **Time**: Amortized O(1) per operation; worst-case O(n) when transferring.
- **Space**: O(n) for storing elements across two stacks.

---

## Key Takeaway

> Two stacks simulate a queue. The "lazy transfer" (only move when popStack is empty) gives amortized O(1). This is a classic data structure interview question.
