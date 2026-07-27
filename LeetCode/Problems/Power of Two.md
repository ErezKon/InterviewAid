# 231. Power of Two

**Difficulty:** 🟢 Easy
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/power-of-two](https://leetcode.com/problems/power-of-two)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Infosys, Meta, Microsoft, Nvidia, Qualcomm, Snapchat, Tcs

---

## 1. Problem Description

Given an integer `n`, return `true` if it is a power of two.

---

## 2. Approach: Bit Manipulation — O(1) ✅

A power of two has exactly one set bit: `n > 0 AND (n & (n-1)) == 0`.

```
FUNCTION isPowerOfTwo(n):
    RETURN n > 0 AND (n AND (n - 1)) == 0
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Key Takeaway

> Powers of two = exactly one set bit. `n & (n-1) == 0` checks this in O(1).
