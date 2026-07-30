# 232. Implement Queue using Stacks

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/implement-queue-using-stacks](https://leetcode.com/problems/implement-queue-using-stacks)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Meta, Microsoft, Qualcomm, Sap, Tiktok, Yandex

---

## Problem Description
Design a queue that supports the standard operations `push(x)`, `pop()`, `peek()`, and `empty()` using only two stacks. All operations should run in amortized O(1) time.

## Examples
**Example 1:**
```
MyQueue q = new MyQueue();
q.push(1); q.push(2);
q.peek(); // returns 1
q.pop();  // returns 1
q.empty(); // returns false
```
**Example 2:**
```
MyQueue q = new MyQueue();
q.empty(); // returns true
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
