# 1134. Armstrong Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/armstrong-number](https://leetcode.com/problems/armstrong-number)
**Companies:** Amazon

---

## 1. Problem Description

Given an integer `n`, determine if it is an Armstrong number. An Armstrong number of `k` digits satisfies: sum of each digit raised to the power `k` equals `n`.

---

## 2. Approach: Digit Extraction — O(k) ✅

```
FUNCTION isArmstrong(n):
    digits = str(n)
    k = len(digits)
    RETURN SUM(int(d) ** k for d in digits) == n
```

| Time | Space |
|------|-------|
| O(k) where k = number of digits | O(k) |

---

## Key Takeaway

> Convert to string (or extract digits), compute the sum of each digit^k, and compare with the original number.
