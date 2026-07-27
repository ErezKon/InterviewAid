# 2011. Final Value of Variable After Performing Operations

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/final-value-of-variable-after-performing-operations](https://leetcode.com/problems/final-value-of-variable-after-performing-operations)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given operations `["++X", "X++", "--X", "X--"]`, start with `X = 0` and apply each. Return final value.

---

## Approach: Simple Scan — O(n) ✅

```
FUNCTION finalValueAfterOperations(operations):
    x = 0
    FOR op IN operations:
        IF '+' IN op: x += 1
        ELSE: x -= 1
    RETURN x
```

---

## Key Takeaway

> **Check if `'+'` is in the operation string — both `"++X"` and `"X++"` contain `'+'`. Simplest possible parsing.**
