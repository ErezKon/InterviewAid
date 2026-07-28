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

```text
FUNCTION isPowerOfTwo(n):
    RETURN n > 0 AND (n AND (n - 1)) == 0
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Examples

| n | Output |
|---|--------|
| 1 | true |
| 3 | false |
| 16 | true |
| 0 | false |

## Walkthrough

1. For `n = 16` (binary `10000`): `n-1 = 15` (binary `01111`). `n & (n-1) = 0`, and `n > 0`, so return `true`.
2. For `n = 3` (binary `11`): `n-1 = 2` (binary `10`). `n & (n-1) = 2` (non‑zero), so return `false`.
3. The check works for any positive integer; zero fails the `n > 0` condition.

## Complexity Analysis

- **Time:** O(1) – constant‑time bit operation.
- **Space:** O(1) – only a few variables.

---

## Key Takeaway

> Powers of two = exactly one set bit. `n & (n-1) == 0` checks this in O(1).
