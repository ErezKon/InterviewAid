# 2979. Most Expensive Item That Can Not Be Bought

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-expensive-item-that-can-not-be-bought](https://leetcode.com/problems/most-expensive-item-that-can-not-be-bought)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Chicken McNugget Theorem — O(1)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given two coprime positive integers `a` and `b`, find the **largest** amount that cannot be expressed as `a*x + b*y` where `x, y ≥ 0`.

**Constraints:**
- `1 <= a, b <= 10⁹`
- `gcd(a, b) = 1`

---

## 2. Key Insight

> By the **Chicken McNugget theorem** (Frobenius number) for two coprime integers, the greatest unattainable value is `a*b - a - b`.

---

## 3. Approach: Chicken McNugget Theorem — O(1) ✅

```text
FUNCTION mostExpensiveItem(a, b):
    // Direct formula from the theorem
    RETURN a * b - a - b
```

---

## 4. Examples

**Example 1:**
```
a = 2, b = 3
```
- Largest non‑representable amount = `2*3 - 2 - 3 = 1`.
**Output:** `1`

**Example 2:**
```
a = 5, b = 7
```
- Largest non‑representable amount = `5*7 - 5 - 7 = 23`.
**Output:** `23`

---

## 5. Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Verify `gcd(5,7) = 1` (coprime) | ✅ |
| 2 | Compute product `5*7 = 35` | — |
| 3 | Subtract `a` and `b`: `35 - 5 - 7 = 23` | — |
| 4 | Return `23` as the largest unattainable amount |

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) — constant‑time arithmetic |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would the solution change if `a` and `b` are not guaranteed to be coprime?
2. What is the formula for the Frobenius number when there are more than two coin denominations?
3. Can you extend the approach to list *all* unattainable amounts up to the Frobenius number?

---

## 8. Key Takeaway

> **Frobenius number = a·b - a - b** for two coprime integers `a` and `b`. A constant‑time formula solves the classic “coin problem”.
