# 1304. Find N Unique Integers Sum up to Zero

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-n-unique-integers-sum-up-to-zero](https://leetcode.com/problems/find-n-unique-integers-sum-up-to-zero)
**Companies:** Amazon, American Express, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION sumZero(n):
    result = []
    FOR i ← 1 TO n / 2:
        result.ADD(i)
        result.ADD(-i)
    IF n % 2 == 1: result.ADD(0)
    RETURN result
```
