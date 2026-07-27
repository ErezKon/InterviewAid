# 232. Implement Queue using Stacks

**Difficulty:** 🟢 Easy
**Acceptance:** 67.0%
**LeetCode:** [https://leetcode.com/problems/implement-queue-using-stacks](https://leetcode.com/problems/implement-queue-using-stacks)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Meta, Microsoft, Qualcomm, Sap, Tiktok, Yandex

---

## 1. Problem Description

Implement a FIFO queue using only two stacks.

---

## 2. Approach: Two Stacks — Amortized O(1) ✅

- **pushStack**: new elements go here.
- **popStack**: elements ready to dequeue.

When `popStack` is empty, pour all of `pushStack` into `popStack` (reversing order).

```
CLASS MyQueue:
    CONSTRUCTOR:
        pushStack = []
        popStack = []

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

## Key Takeaway

> Two stacks simulate a queue. The "lazy transfer" (only move when popStack is empty) gives amortized O(1). This is a classic data structure interview question.
