# 1780. Check if Number is a Sum of Powers of Three

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three](https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three)
**Companies:** Amazon, Bloomberg, Google, Meta

---

```
FUNCTION checkPowersOfThree(n):
    WHILE n > 0:
        IF n % 3 == 2: RETURN false
        n //= 3
    RETURN true
```

In base 3, each digit must be 0 or 1 (each power used at most once).
