# 1137. N-th Tribonacci Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/n-th-tribonacci-number](https://leetcode.com/problems/n-th-tribonacci-number)
**Companies:** Amazon, Bloomberg, Coursera, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Iterative — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

T(0) = 0, T(1) = 1, T(2) = 1. T(n) = T(n-1) + T(n-2) + T(n-3). Return T(n).

**Constraints:**
- `0 <= n <= 37`

---

## 2. Examples

| n | Output |
|---|--------|
| 0 | 0 |
| 1 | 1 |
| 2 | 1 |
| 4 | 4 |
| 25 | 1389537 |

*Explanation*: For `n = 4`, the sequence is `[0,1,1,2,4]`; the 4th term is `4`.

---

## 3. Approach: Iterative — O(n) ✅

```text
FUNCTION tribonacci(n):
    IF n == 0: RETURN 0
    IF n <= 2: RETURN 1
    a ← 0
    b ← 1
    c ← 1
    FOR i ← 3 TO n:
        next ← a + b + c
        a ← b
        b ← c
        c ← next
    RETURN c
```

---

## 4. Walkthrough

Trace the algorithm for `n = 4`.

| Step | a | b | c | next | Returned Value |
|------|---|---|---|------|----------------|
| Init | 0 | 1 | 1 | - | - |
| i=3 | 1 | 1 | 2 | 2 | - |
| i=4 | 1 | 2 | 4 | 4 | - |
| End | - | - | **4** | - | 4 |

The loop updates the three rolling variables, and after the final iteration `c` holds `T(4) = 4`.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would you compute the Tribonacci number for very large `n` (e.g., `n = 10^9`)?
2. Can you derive a matrix exponentiation solution to achieve O(log n) time?
3. How does the problem change if the recurrence uses different coefficients?

---

## 7. Key Takeaway

> **Three rolling variables** — same pattern as Fibonacci but tracking one extra predecessor. O(1) space.
