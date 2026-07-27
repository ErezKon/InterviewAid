# 1137. N-th Tribonacci Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/n-th-tribonacci-number](https://leetcode.com/problems/n-th-tribonacci-number)
**Companies:** Amazon, Bloomberg, Coursera, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Iterative — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

T(0) = 0, T(1) = 1, T(2) = 1. T(n) = T(n-1) + T(n-2) + T(n-3). Return T(n).

**Constraints:**
- `0 <= n <= 37`

---

## 2. Key Insight

> Like Fibonacci but summing 3 previous values. Use 3 rolling variables — no array needed.

---

## 3. Approach: Iterative — O(n) ✅

```
FUNCTION tribonacci(n):
    IF n == 0: RETURN 0
    IF n <= 2: RETURN 1
    a, b, c = 0, 1, 1
    FOR _ ← 3 TO n:
        a, b, c = b, c, a + b + c
    RETURN c
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Three rolling variables** — same pattern as Fibonacci but tracking one extra predecessor. O(1) space.
