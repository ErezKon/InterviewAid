# 365. Water and Jug Problem

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/water-and-jug-problem](https://leetcode.com/problems/water-and-jug-problem)
**Companies:** Amazon, Apple, Google, Lyft, Microsoft, Oracle, Tiktok, Uber

---

## Approach: GCD — O(log(min(x,y))) ✅

```
FUNCTION canMeasureWater(x, y, target):
    IF target > x + y: RETURN false
    RETURN target % GCD(x, y) == 0
```

By Bézout's identity, we can measure any multiple of GCD(x, y) up to x + y.
