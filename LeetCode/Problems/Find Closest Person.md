# 3516. Find Closest Person

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-closest-person](https://leetcode.com/problems/find-closest-person)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

Two people at positions `x` and `y`, target at `z`. Return which person is closer (1 or 2), or 0 if equidistant.

---

## Approach: Distance Comparison — O(1) ✅

```
FUNCTION closestPerson(x, y, z):
    d1 = ABS(x - z); d2 = ABS(y - z)
    IF d1 < d2: RETURN 1
    IF d2 < d1: RETURN 2
    RETURN 0
```

---

## Key Takeaway

> **Compare absolute distances. Return 0 on tie.**
