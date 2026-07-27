# 50. Pow(x, n)

**Difficulty:** 🟡 Medium
**Acceptance:** 36.0%
**LeetCode:** [https://leetcode.com/problems/powx-n](https://leetcode.com/problems/powx-n)
**Companies:** Accenture, Adobe, Amazon, Bloomberg, Cisco, Citadel, Ebay, Epam Systems, Goldman Sachs, Google, Infosys, Linkedin, Meta, Microsoft, Nvidia, Oracle, Qualcomm, Servicenow, Tcs, Tiktok, Walmart Labs, Wix

---

## 1. Problem Description

Implement `pow(x, n)`, which calculates `x` raised to the power `n`.

---

## 2. Approach: Fast Power (Binary Exponentiation) — O(log n) ✅

```
FUNCTION myPow(x, n):
    IF n < 0:
        x = 1 / x
        n = -n

    result = 1
    WHILE n > 0:
        IF n is odd:
            result *= x
        x *= x
        n = n / 2

    RETURN result
```

### Why It Works

Express n in binary. For each bit, square x. If the bit is 1, multiply result by x. E.g., x¹³ = x⁸ · x⁴ · x¹ (13 = 1101₂).

| Time | Space |
|------|-------|
| O(log n) | O(1) |

---

## Follow-Up: Handle n = INT_MIN?

`-INT_MIN` overflows. Handle by converting to long, or special-case: `pow(x, INT_MIN) = 1/(x * pow(x, INT_MAX))`.

---

## Key Takeaway

> Binary exponentiation (repeated squaring) reduces O(n) multiplications to O(log n). This is fundamental in number theory, cryptography, and matrix exponentiation for Fibonacci/DP problems.
