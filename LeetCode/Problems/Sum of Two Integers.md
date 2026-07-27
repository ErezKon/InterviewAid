# 371. Sum of Two Integers

**Difficulty:** 🟡 Medium
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/sum-of-two-integers](https://leetcode.com/problems/sum-of-two-integers)
**Companies:** Amazon, Bloomberg, Google, Hulu, Ibm, Meta, Microsoft, Swiggy

---

## 1. Problem Description

Calculate the sum of two integers without using `+` or `-` operators.

---

## 2. Approach: Bit Manipulation — O(1) ✅

```
FUNCTION getSum(a, b):
    WHILE b != 0:
        carry = a AND b
        a = a XOR b
        b = carry << 1
    RETURN a
```

### How It Works

- `a XOR b` = sum without carry
- `(a AND b) << 1` = carry bits, shifted left
- Repeat until no carry remains

For languages with fixed-width integers (Python needs masking):
```python
MASK = 0xFFFFFFFF
while b & MASK:
    carry = a & b
    a = a ^ b
    b = carry << 1
return a if a <= 0x7FFFFFFF else ~(a ^ MASK)
```

| Time | Space |
|------|-------|
| O(1) — at most 32 iterations | O(1) |

---

## Key Takeaway

> XOR = addition without carry. AND + shift = carry. Iterate until carry is zero. This is how hardware adders work.
