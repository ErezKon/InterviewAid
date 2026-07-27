# 869. Reordered Power of 2

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reordered-power-of-2](https://leetcode.com/problems/reordered-power-of-2)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION reorderedPowerOf2(n):
    target = sorted(str(n))
    FOR i ← 0 TO 30:
        IF sorted(str(1 << i)) == target:
            RETURN true
    RETURN false
```

Check if digit-sorted form of n matches any power of 2.
