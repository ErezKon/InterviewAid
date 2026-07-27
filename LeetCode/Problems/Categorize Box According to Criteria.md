# 2525. Categorize Box According to Criteria

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/categorize-box-according-to-criteria](https://leetcode.com/problems/categorize-box-according-to-criteria)
**Companies:** Microsoft, Zendesk

---

## 1. Problem Description

Given a box's length, width, height, and mass, categorize it as "Bulky" (any dimension ≥ 10⁴ or volume ≥ 10⁹), "Heavy" (mass ≥ 100), "Both", or "Neither".

---

## 2. Approach: Conditional Check — O(1) ✅

```
FUNCTION categorizeBox(length, width, height, mass):
    bulky = (length >= 10000 OR width >= 10000 OR height >= 10000
             OR length * width * height >= 1000000000)
    heavy = (mass >= 100)
    IF bulky AND heavy: RETURN "Both"
    IF bulky: RETURN "Bulky"
    IF heavy: RETURN "Heavy"
    RETURN "Neither"
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Key Takeaway

> Pure if/else classification. Watch for integer overflow when computing volume — use long/64-bit.
