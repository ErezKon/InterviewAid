# 2011. Final Value of Variable After Performing Operations

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/final-value-of-variable-after-performing-operations](https://leetcode.com/problems/final-value-of-variable-after-performing-operations)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an array of operation strings `["++X", "X++", "--X", "X--"]`, start with `X = 0` and apply each operation in order. Increment or decrement `X` accordingly and return its final value.

---

## Examples

**Example 1:**
```
operations = ["++X","X++","--X"]
Result: 1
```
*Explanation:* `X` goes 0→1→2→1.

**Example 2:**
```
operations = ["X--","X--","X++"]
Result: -1
```
*Explanation:* 0→-1→-2→-1.

---

## Approach: Simple Scan — O(n) ✅

```
FUNCTION finalValueAfterOperations(operations):
    x ← 0
    FOR op IN operations:
        IF '+' IN op:
            x ← x + 1
        ELSE:
            x ← x - 1
    RETURN x
```

---

## Walkthrough

| Step | Operation | X before | X after |
|------|-----------|----------|---------|
| 1 | ++X | 0 | 1 |
| 2 | X++ | 1 | 2 |
| 3 | --X | 2 | 1 |

---

## Complexity Analysis

- **Time:** O(n) – one pass over the operations.
- **Space:** O(1) – only a constant integer variable.

---

## Follow-Up Questions

1. How would you handle operations that include `+=` or `-=` with arbitrary integers?
2. Can you extend the solution to support multiple variables simultaneously?
3. What changes are needed if the operations are given as a single concatenated string?

---

## Key Takeaway

> **Check if `'+'` is in the operation string — both `"++X"` and `"X++"` contain `'+'`. Simplest possible parsing.**