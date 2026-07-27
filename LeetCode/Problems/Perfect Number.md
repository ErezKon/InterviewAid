# 507. Perfect Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/perfect-number](https://leetcode.com/problems/perfect-number)
**Companies:** Accenture, Amazon, Bloomberg, Fallible, Google, Grammarly, Meta, Microsoft

---

```
FUNCTION checkPerfectNumber(num):
    IF num <= 1: RETURN false
    sum = 1
    FOR i ← 2 TO sqrt(num):
        IF num % i == 0:
            sum += i + num / i
    RETURN sum == num
```
