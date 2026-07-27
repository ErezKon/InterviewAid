# 3099. Harshad Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/harshad-number](https://leetcode.com/problems/harshad-number)
**Companies:** Microsoft

---

## 1. Problem Description

A Harshad number is divisible by the sum of its digits. Return the sum of digits if `x` is Harshad, else -1.

## 2. Approach: Digit Sum Check — O(log x) ✅

```
FUNCTION sumOfTheDigitsOfHarshadNumber(x):
    digitSum ← sum of digits of x
    IF x % digitSum == 0: RETURN digitSum
    ELSE: RETURN -1
```

## Key Takeaway

> Compute digit sum, check divisibility. O(log x) for digit extraction.
