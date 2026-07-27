# 190. Reverse Bits

**Difficulty:** 🟢 Easy
**Acceptance:** 56.0%
**LeetCode:** [https://leetcode.com/problems/reverse-bits](https://leetcode.com/problems/reverse-bits)
**Companies:** Accenture, Airbnb, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Nvidia, Qualcomm

---

## 1. Problem Description

Reverse bits of a given 32 bits unsigned integer.

---

## 2. Approach: Bit by Bit — O(32) = O(1) ✅

```
FUNCTION reverseBits(n):
    result = 0
    FOR i ← 0 TO 31:
        result = (result << 1) | (n & 1)
        n >>= 1
    RETURN result
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Key Takeaway

> Extract the last bit with `n & 1`, build the result by shifting left and OR-ing. 32 iterations for a 32-bit integer.
