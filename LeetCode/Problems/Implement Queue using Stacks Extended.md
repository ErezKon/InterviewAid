# 232. Implement Queue using Stacks

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/implement-queue-using-stacks](https://leetcode.com/problems/implement-queue-using-stacks)
**Companies:** Amazon, Apple, Bloomberg, Google, Infosys, Meta, Microsoft, Qualcomm, Sap, Tiktok, Yandex

---

## Approach: Two Stacks — O(1) amortized ✅

```
CLASS MyQueue:
    CONSTRUCTOR:
        pushStack = []
        popStack = []

    FUNCTION push(x):
        pushStack.PUSH(x)

    FUNCTION pop():
        IF popStack is empty:
            WHILE pushStack:
                popStack.PUSH(pushStack.POP())
        RETURN popStack.POP()

    FUNCTION peek():
        IF popStack is empty:
            WHILE pushStack:
                popStack.PUSH(pushStack.POP())
        RETURN popStack.TOP()

    FUNCTION empty():
        RETURN pushStack is empty AND popStack is empty
```

Amortized O(1): each element transferred at most once from push to pop stack.
