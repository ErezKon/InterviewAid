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

| Operation | Queue State |
|-----------|-------------|
| `push(1)` | [1] |
| `push(2)` | [1,2] |
| `peek()` → 1 | [1,2] |
| `pop()` → 1 | [2] |
| `empty()` → false | [2] |

---

## 4. Walkthrough

1. **push(1)**: `pushStack` = [1]; `popStack` = []
2. **push(2)**: `pushStack` = [1,2]
3. **peek()**: `popStack` empty, transfer → `popStack` = [2,1]; return top = 1
4. **pop()**: `popStack` now [2]; returns 1
5. **empty()**: both stacks not empty → false

---

## 5. Complexity Analysis

- **Time**: Amortized O(1) per operation; worst‑case O(n) when transferring.
- **Space**: O(n) for storing elements across two stacks.

---

## Key Takeaway

> Two stacks simulate a queue. The "lazy transfer" (only move when popStack is empty) gives amortized O(1). This is a classic data structure interview question.
