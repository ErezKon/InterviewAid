# 69. Sqrt(x)

**Difficulty:** 🟢 Easy
**Acceptance:** 39.0%
**LeetCode:** [https://leetcode.com/problems/sqrtx](https://leetcode.com/problems/sqrtx)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Citadel, Goldman Sachs, Google, Grammarly, Infosys, Linkedin, Meta, Microsoft, Nvidia, Oracle, Tcs, Tiktok, Uber, Zoho

---

## 1. Problem Description

Given a non-negative integer `x`, return *the square root of* `x` *rounded down to the nearest integer*. The returned integer should be **non-negative** as well.

You **must not use** any built-in exponent function or operator.

- For example, do not use `pow(x, 0.5)` in c++ or `x ** 0.5` in python.

**Constraints:**
- `0 <= x <= 2^31 - 1`

---

## 2. Examples

**Example 1:**
```
Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
```

**Example 2:**
```
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
```

---

## 3. Approach: Binary Search — O(log x) ✅

```text
FUNCTION mySqrt(x):
    // Edge cases for 0 and 1
    IF x < 2: RETURN x

    lo ← 1
    hi ← x / 2

    WHILE lo ≤ hi:
        mid ← (lo + hi) / 2
        // Use division to avoid overflow
        IF mid ≤ x / mid:
            lo ← mid + 1
        ELSE:
            hi ← mid - 1

    RETURN hi
```

---

## 4. Walkthrough

Consider `x = 8`:

1. `lo = 1`, `hi = 4` (since `8/2 = 4`).
2. `mid = (1+4)/2 = 2`. `2 ≤ 8/2 = 4` → move `lo` to `3`.
3. `mid = (3+4)/2 = 3`. `3 ≤ 8/3 ≈ 2` is false → move `hi` to `2`.
4. Loop ends (`lo > hi`). Return `hi = 2`, which is the floor of √8.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(log x) — binary search halves the range each iteration |
| Space  | O(1) — only constant extra variables |

---

## 6. Follow-Up Questions

- How would you modify the algorithm to compute the square root with a precision of `10⁻⁶`?
- Can you solve the problem using Newton's method and what would be its time complexity?
- How would you handle very large integers that do not fit in standard 64‑bit types?

---

## Key Takeaway

> Binary search on the answer. The floor of √x is the largest integer `m` where `m² ≤ x`.
