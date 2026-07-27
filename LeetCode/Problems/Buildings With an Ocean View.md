# 1762. Buildings With an Ocean View

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/buildings-with-an-ocean-view](https://leetcode.com/problems/buildings-with-an-ocean-view)
**Companies:** Amazon, Anduril, Coupang, Google, Meta, Microsoft

---

```
FUNCTION findBuildings(heights):
    result = []
    maxHeight = 0
    FOR i ← n - 1 DOWN TO 0:
        IF heights[i] > maxHeight:
            result.ADD(i)
            maxHeight = heights[i]
    RETURN REVERSE(result)
```

Scan right to left. A building has ocean view if it's taller than all to its right.
