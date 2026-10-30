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

The Tribonacci sequence T_n is defined as follows:

T_0 = 0, T_1 = 1, T_2 = 1, and T_n+3 = T_n + T_n+1 + T_n+2 for n >= 0.

Given `n`, return the value of T_n.

**Constraints:**
- `0 <= n <= 37`
- The answer is guaranteed to fit within a 32-bit integer, ie. `answer <= 2^31 - 1`.

---

## 2. Examples

**Example 1:**
```
Input: n = 4
Output: 4
Explanation: T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4
```

**Example 2:**
```
Input: n = 25
Output: 1389537
```

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
