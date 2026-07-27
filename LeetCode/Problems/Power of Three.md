# 326. Power of Three

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/power-of-three](https://leetcode.com/problems/power-of-three)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft

---

```
FUNCTION isPowerOfThree(n):
    RETURN n > 0 AND 1162261467 % n == 0
```

1162261467 = 3^19 (largest power of 3 in int range). Any power of 3 divides it.
