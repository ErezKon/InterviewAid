# 598. Range Addition II

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Ixl
---

```
FUNCTION maxCount(m, n, ops):
    FOR [a, b] IN ops: m = MIN(m, a); n = MIN(n, b)
    RETURN m * n
```
