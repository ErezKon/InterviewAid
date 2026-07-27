# 246. Strobogrammatic Number

**Difficulty:** 🟢 Easy

**Companies:** Google, Meta
---

```
FUNCTION isStrobogrammatic(num):
    pairs = {'0':'0','1':'1','6':'9','8':'8','9':'6'}
    lo, hi = 0, len(num) - 1
    WHILE lo <= hi:
        IF num[lo] NOT IN pairs OR pairs[num[lo]] != num[hi]: RETURN false
        lo += 1; hi -= 1
    RETURN true
```
