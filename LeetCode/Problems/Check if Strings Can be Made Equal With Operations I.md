# 2839. Check if Strings Can be Made Equal With Operations I

**Difficulty:** 🟢 Easy

**Companies:** Citrix, Google, Microsoft
---

```
FUNCTION canBeEqual(s1, s2):
    RETURN sorted(s1[::2]) == sorted(s2[::2]) AND sorted(s1[1::2]) == sorted(s2[1::2])
```
