# 890. Find and Replace Pattern

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google
---

```
FUNCTION findAndReplacePattern(words, pattern):
    FUNCTION matches(w, p):
        m1, m2 = {}, {}
        FOR a, b IN zip(w, p):
            IF m1.get(a, b) != b OR m2.get(b, a) != a: RETURN false
            m1[a] = b; m2[b] = a
        RETURN true
    RETURN [w for w in words if matches(w, pattern)]
```
