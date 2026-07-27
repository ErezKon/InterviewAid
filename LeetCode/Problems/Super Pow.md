# 372. Super Pow

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/super-pow](https://leetcode.com/problems/super-pow)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION superPow(a, b):
    MOD = 1337
    result = 1
    FOR digit IN b:
        result = pow(result, 10, MOD) * pow(a, digit, MOD) % MOD
    RETURN result
```

a^1234 = (a^123)^10 * a^4. Process digits left to right.
