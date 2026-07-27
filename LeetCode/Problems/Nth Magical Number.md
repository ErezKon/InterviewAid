# 878. Nth Magical Number

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/nth-magical-number](https://leetcode.com/problems/nth-magical-number)
**Companies:** Amazon, Google, Meta

---

```
FUNCTION nthMagicalNumber(n, a, b):
    MOD = 10^9 + 7
    lcm = a * b / GCD(a, b)
    lo, hi = 1, n * MIN(a, b)
    WHILE lo < hi:
        mid = (lo + hi) / 2
        count = mid // a + mid // b - mid // lcm
        IF count < n: lo = mid + 1
        ELSE: hi = mid
    RETURN lo % MOD
```
