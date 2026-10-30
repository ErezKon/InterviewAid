# 2235. Add Two Integers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/add-two-integers](https://leetcode.com/problems/add-two-integers)
**Companies:** Accenture, Akamai, Amazon, Bloomberg, Google, Jane Street, Meta, Microsoft, Tiktok

---

## 1. Problem Description

Given two integers `num1` and `num2`, return *the **sum** of the two integers*.

**Constraints:**
- `-100 ≤ num1, num2 ≤ 100`

---

## 2. Examples

```
Example 1:
  Input: num1 = 12, num2 = 5
  Output: 17
  Explanation: num1 is 12, num2 is 5, and their sum is 12 + 5 = 17, so 17 is returned.
```
```
Example 2:
  Input: num1 = -10, num2 = 4
  Output: -6
  Explanation: num1 + num2 = -6, so -6 is returned.
```

---

## 3. Approach: Direct — O(1) ✅

```text
FUNCTION sum(num1, num2):
    RETURN num1 + num2
```

---

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Receive `num1` and `num2` as input. |
| 2 | Apply the addition operator to compute `num1 + num2`. |
| 3 | Return the resulting sum. |

---

## 5. Complexity Analysis

- **Time:** O(1) – a single arithmetic operation.
- **Space:** O(1) – only a few primitive variables are used.

---

## 6. Follow-Up Questions

1. How would you implement addition without using the `+` operator? (Hint: use bitwise XOR and AND.)
2. How does the solution change if the integers can be arbitrarily large (beyond built‑in types)?
3. What if you need to add two numbers represented as linked lists of digits?

---

## Key Takeaway

> Adding two integers is O(1) arithmetic, but the problem can be extended to explore bit‑wise addition or handling of large numbers.
