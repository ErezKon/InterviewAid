# 232. Implement Queue using Stacks

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/implement-queue-using-stacks](https://leetcode.com/problems/implement-queue-using-stacks)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Meta, Microsoft, Qualcomm, Sap, Tiktok, Yandex

---

## Problem Description

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

## Examples

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

## Approach
Use two stacks: `pushStack` for incoming elements and `popStack` for outgoing elements.
1. **push(x):** push onto `pushStack`.
2. **pop():** if `popStack` empty, transfer all elements from `pushStack` to `popStack` (reversing order), then pop from `popStack`.
3. **peek():** same transfer logic as `pop()` but return top without removing.
4. **empty():** queue is empty only when both stacks are empty.

```text
CLASS MyQueue:
    CONSTRUCTOR:
        pushStack ← []
        popStack ← []

    FUNCTION push(x):
        pushStack.PUSH(x)

    FUNCTION pop():
        IF popStack IS EMPTY:
            WHILE pushStack IS NOT EMPTY:
                popStack.PUSH(pushStack.POP())
        RETURN popStack.POP()

    FUNCTION peek():
        IF popStack IS EMPTY:
            WHILE pushStack IS NOT EMPTY:
                popStack.PUSH(pushStack.POP())
        RETURN popStack.TOP()

    FUNCTION empty():
        RETURN pushStack IS EMPTY AND popStack IS EMPTY
```

## Walkthrough
| Operation | pushStack | popStack | Returned |
|-----------|-----------|----------|----------|
| push(1)  | [1]       | []       | - |
| push(2)  | [1,2]     | []       | - |
| peek()   | []        | [2,1]    | 1 |
| pop()    | []        | [2]      | 1 |
| empty()  | []        | [2]      | false |

## Complexity Analysis
- **Time:** Amortized O(1) per operation; each element moves between stacks at most once.
- **Space:** O(n) for storing `n` elements across the two stacks.

## Follow-Up Questions
1. How would you implement a queue using a single stack?
2. Can you extend this design to support a `max()` operation in O(1) time?
3. What changes are needed if the queue must be thread‑safe?

## Key Takeaway
Two stacks can simulate a queue by reversing element order only when necessary, giving amortized constant‑time operations.
