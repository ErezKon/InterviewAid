# 247. Strobogrammatic Number II

**Difficulty:** 🟡 Medium

**Companies:** Google, Meta
---

```
FUNCTION findStrobogrammatic(n):
    FUNCTION helper(n, isOuter):
        IF n == 0: RETURN ['']
        IF n == 1: RETURN ['0','1','8']
        middles = helper(n - 2, false)
        result = []
        FOR m IN middles:
            FOR a, b IN [('0','0'),('1','1'),('6','9'),('8','8'),('9','6')]:
                IF isOuter AND a == '0': CONTINUE
                result.ADD(a + m + b)
        RETURN result
    RETURN helper(n, true)
```
