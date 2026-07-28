# 2235. Add Two Integers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/add-two-integers](https://leetcode.com/problems/add-two-integers)
**Companies:** Accenture, Akamai, Amazon, Bloomberg, Google, Jane Street, Meta, Microsoft, Tiktok

---

## 1. Problem Description

Given two integers `num1` and `num2`, return their sum.

**Constraints:**
- `-100 ≤ num1, num2 ≤ 100`

---

## 2. Examples

**Example 1**
```
Input: num1 = 2, num2 = 3
Output: 5
```

**Example 2**
```
Input: num1 = -1, num2 = 4
Output: 3
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
