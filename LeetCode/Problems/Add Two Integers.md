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

## 2. Approach: Direct — O(1) ✅

```
FUNCTION sum(num1, num2):
    RETURN num1 + num2
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Key Takeaway

> Trivial problem — useful as a warm-up or to verify your environment setup. In an interview, if asked "without the + operator," use bit manipulation: `a XOR b` for sum without carry, `(a AND b) << 1` for carry, repeat until carry is 0.
