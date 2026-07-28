# 2648. Generate Fibonacci Sequence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/generate-fibonacci-sequence](https://leetcode.com/problems/generate-fibonacci-sequence)
**Companies:** Bloomberg, Google

---

## 1. Problem Description

Write a generator function that yields the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, ... (JavaScript problem)

---

## 2. Examples

| Call | First few outputs |
|------|--------------------|
| `gen = fibonacciGenerator()` | `0, 1, 1, 2, 3, 5, 8, ...` |
| `next(gen)` repeatedly | yields successive Fibonacci numbers |

---

## 3. Approach: Generator Function ✅

```text
FUNCTION fibonacciGenerator():
    a ← 0
    b ← 1
    WHILE TRUE:
        YIELD a
        SET temp ← a + b
        a ← b
        b ← temp
```

---

## 4. Walkthrough

1. Initialize `a = 0`, `b = 1`.
2. First iteration yields `a` (0), then updates `a` to 1 and `b` to 1.
3. Second iteration yields `a` (1), updates `a` to 1, `b` to 2.
4. Continue indefinitely, each step producing the next Fibonacci number.

---

## 5. Complexity Analysis

- **Time:** O(1) amortized per generated number – each iteration performs a constant amount of work.
- **Space:** O(1) – only a few variables are maintained regardless of how many numbers are produced.

---

## 6. Follow-Up Questions

- How would you modify the generator to stop after producing `n` numbers?
- Can you compute the `n`‑th Fibonacci number in O(log n) time using matrix exponentiation?

---

## Key Takeaway

> A simple generator with two rolling variables yields the infinite Fibonacci sequence with constant time and space per value.
