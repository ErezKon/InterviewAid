# 667. Beautiful Arrangement II

**Difficulty:** 🟡 Medium

**Companies:** Bloomberg, Google
---

```
FUNCTION constructArray(n, k):
    result = list(range(1, n - k + 1))
    lo, hi = n - k + 1, n + 1
    toggle = true
    WHILE lo < hi:
        IF toggle: result.ADD(lo); lo += 1
        ELSE: result.ADD(hi - 1); hi -= 1
        toggle = NOT toggle
    RETURN result
```
