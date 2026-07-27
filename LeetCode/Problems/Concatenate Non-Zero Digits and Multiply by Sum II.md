# 3756. Concatenate Non-Zero Digits and Multiply by Sum II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii](https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii)
**Companies:** Google

---

## 1. Problem Description

Given a number, concatenate its non-zero digits to form a new number, multiply by the digit sum, and repeat until the result stabilizes or meets a condition. Return the final result.

---

## 2. Approach: Simulation — O(digits) ✅

```
FUNCTION process(num):
    WHILE num has more than one digit or condition not met:
        digits = [d for d in str(num) if d != '0']
        concatenated = int("".join(digits))
        digitSum = SUM(int(d) for d in str(num))
        num = concatenated * digitSum
    RETURN num
```

| Time | Space |
|------|-------|
| O(number of iterations × digits) | O(digits) |

---

## Key Takeaway

> Filter out zeros, concatenate remaining digits, multiply by digit sum. The number shrinks rapidly each iteration.
