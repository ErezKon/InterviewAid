# 371. Sum of Two Integers

**Difficulty:** 🟡 Medium
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/sum-of-two-integers](https://leetcode.com/problems/sum-of-two-integers)
**Companies:** Amazon, Bloomberg, Google, Hulu, Ibm, Meta, Microsoft, Swiggy

---

## 1. Problem Description

Given two integers `a` and `b`, return their sum **without** using the `+` or `-` operators. The solution must handle positive and negative numbers using only bitwise operations.

---

## 2. Approach: Bit Manipulation — O(1) ✅

```text
FUNCTION getSum(a, b):
    // Iterate until there is no carry
    WHILE b ≠ 0:
        // carry contains common set bits of a and b
        SET carry ← a AND b
        // Sum bits where at most one is set
        SET a ← a XOR b
        // Shift carry left to add it in the next higher bit
        SET b ← carry LEFT_SHIFT 1
    RETURN a
```

---

## 3. Examples

| a | b | Output |
|---|---|--------|
| 1 | 2 | 3 |
| -2 | 3 | 1 |
| -1 | -1 | -2 |

---

## 4. Walkthrough

For `a = 1 (01)` and `b = 2 (10)`:

1. `carry = 01 AND 10 = 00`
2. `a = 01 XOR 10 = 11` (binary 3)
3. `b = 00 LEFT_SHIFT 1 = 00`
4. Loop ends (`b = 0`), return `a = 3`.

When a carry occurs, e.g., `a = 1 (01)`, `b = 1 (01)`:

1. `carry = 01 AND 01 = 01`
2. `a = 01 XOR 01 = 00`
3. `b = 01 LEFT_SHIFT 1 = 10`
4. Next iteration: `carry = 00 AND 10 = 00`, `a = 00 XOR 10 = 10`, `b = 00`. Return `2`.

---

## 5. Complexity Analysis

- **Time:** O(1) – at most 32 iterations for 32‑bit integers (constant bound).
- **Space:** O(1) – only a few integer variables.

---

## 6. Follow-Up Questions

- How would you adapt the algorithm for languages without fixed‑width integers (e.g., Python) to avoid overflow?
- Can you extend this to compute subtraction, multiplication, or division using only bitwise operators?

---

## Key Takeaway

> Using `XOR` for sum without carry and `AND` + left‑shift for the carry mimics how hardware adders work, enabling addition without `+` or `-`.
