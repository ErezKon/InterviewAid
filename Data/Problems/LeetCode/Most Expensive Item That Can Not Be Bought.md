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

You are given two **distinct prime** numbers `primeOne` and `primeTwo`.

Alice and Bob are visiting a market. The market has an **infinite** number of items, for **any** positive integer `x` there exists an item whose price is `x`. Alice wants to buy some items from the market to gift to Bob. She has an **infinite** number of coins in the denomination `primeOne` and `primeTwo`. She wants to know the **most expensive** item she can **not** buy to gift to Bob.

Return *the price of the **most expensive** item which Alice can not gift to Bob*.

**Constraints:**
- `1 < primeOne, primeTwo < 10⁴`
- `primeOne`, `primeTwo` are prime numbers.
- `primeOne * primeTwo < 10⁵`

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

```
Example 1:
  Input: primeOne = 2, primeTwo = 5
  Output: 3
  Explanation: The prices of items which cannot be bought are [1,3]. It can be shown that all items with a price greater than 3 can be bought using a combination of coins of denominations 2 and 5.
```

```
Example 2:
  Input: primeOne = 5, primeTwo = 7
  Output: 23
  Explanation: The prices of items which cannot be bought are [1,2,3,4,6,8,9,11,13,16,18,23]. It can be shown that all items with a price greater than 23 can be bought.
```

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
