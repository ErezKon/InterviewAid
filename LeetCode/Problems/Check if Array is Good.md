# 2784. Check if Array is Good

**Difficulty:** 🟢 Easy

**Companies:** Bloomberg, Google, Microsoft
---

```
FUNCTION isGood(nums):
    n = len(nums) - 1
    RETURN sorted(nums) == list(range(1, n)) + [n, n]
```
