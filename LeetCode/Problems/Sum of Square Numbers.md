# 633. Sum of Square Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-square-numbers](https://leetcode.com/problems/sum-of-square-numbers)
**Companies:** Amazon, Apple, Bloomberg, Google, Linkedin, Meta, Microsoft

---

## Approach: Two Pointers — O(√c) ✅

```
FUNCTION judgeSquareSum(c):
    a = 0; b = floor(sqrt(c))
    WHILE a <= b:
        sum = a*a + b*b
        IF sum == c: RETURN true
        IF sum < c: a += 1
        ELSE: b -= 1
    RETURN false
```
