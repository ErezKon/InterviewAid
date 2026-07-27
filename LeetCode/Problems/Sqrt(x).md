# 69. Sqrt(x)

**Difficulty:** 🟢 Easy
**Acceptance:** 39.0%
**LeetCode:** [https://leetcode.com/problems/sqrtx](https://leetcode.com/problems/sqrtx)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Citadel, Goldman Sachs, Google, Grammarly, Infosys, Linkedin, Meta, Microsoft, Nvidia, Oracle, Tcs, Tiktok, Uber, Zoho

---

## 1. Problem Description

Given a non-negative integer `x`, return the integer part of its square root (floor of √x).

---

## 2. Approach: Binary Search — O(log x) ✅

```
FUNCTION mySqrt(x):
    IF x < 2: RETURN x

    lo, hi = 1, x / 2

    WHILE lo <= hi:
        mid = (lo + hi) / 2
        IF mid * mid == x: RETURN mid
        ELSE IF mid * mid < x: lo = mid + 1
        ELSE: hi = mid - 1

    RETURN hi
```

Use `mid <= x / mid` instead of `mid * mid <= x` to avoid overflow.

| Time | Space |
|------|-------|
| O(log x) | O(1) |

---

## Key Takeaway

> Binary search on the answer. The floor of √x is the largest integer `m` where `m² ≤ x`.
