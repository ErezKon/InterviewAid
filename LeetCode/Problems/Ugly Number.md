# 263. Ugly Number

**Difficulty:** 🟢 Easy
**Acceptance:** 42.0%
**LeetCode:** [https://leetcode.com/problems/ugly-number](https://leetcode.com/problems/ugly-number)
**Companies:** Amazon, Bloomberg, Github, Google, Meta, Microsoft, Tcs

---

## Approach: Divide by 2, 3, 5 — O(log n) ✅

```
FUNCTION isUgly(n):
    IF n <= 0: RETURN false
    FOR factor IN [2, 3, 5]:
        WHILE n % factor == 0:
            n /= factor
    RETURN n == 1
```
