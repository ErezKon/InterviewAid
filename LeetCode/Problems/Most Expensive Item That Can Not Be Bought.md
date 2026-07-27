# 2979. Most Expensive Item That Can Not Be Bought

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-expensive-item-that-can-not-be-bought](https://leetcode.com/problems/most-expensive-item-that-can-not-be-bought)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Chicken McNugget Theorem — O(1)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given two coprime primes `a` and `b`, find the **largest** amount that cannot be represented as `a*x + b*y` (x, y ≥ 0).

---

## 2. Key Insight

> By the **Chicken McNugget theorem** (Frobenius): for two coprime positive integers `a` and `b`, the largest non-representable number = `a*b - a - b`.

---

## 3. Approach: Formula — O(1) ✅

```
FUNCTION mostExpensiveItem(a, b):
    RETURN a * b - a - b
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Frobenius number = a·b - a - b** for coprime a, b. Classic number theory result for the "coin problem."
