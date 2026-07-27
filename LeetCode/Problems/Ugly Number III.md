# 1201. Ugly Number III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ugly-number-iii](https://leetcode.com/problems/ugly-number-iii)
**Companies:** Amazon, American Express, Meta

---

```
FUNCTION nthUglyNumber(n, a, b, c):
    ab = lcm(a, b); ac = lcm(a, c); bc = lcm(b, c); abc = lcm(ab, c)
    lo, hi = 1, 2 * 10^9
    WHILE lo < hi:
        mid = (lo + hi) / 2
        count = mid//a + mid//b + mid//c - mid//ab - mid//ac - mid//bc + mid//abc
        IF count < n: lo = mid + 1
        ELSE: hi = mid
    RETURN lo
```

Inclusion-exclusion + binary search.
