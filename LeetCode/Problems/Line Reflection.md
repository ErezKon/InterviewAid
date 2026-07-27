# 356. Line Reflection

**Difficulty:** 🟡 Medium
**Companies:** Google, Yandex

---

## 1. Problem Description

Given a set of 2D points, determine if there exists a vertical line `x = c` such that reflecting all points across it maps each point to another point in the set.

---

## 2. Approach: Hash Set — O(n) ✅

The reflection line must be at `x = (minX + maxX) / 2`. Check every point has its mirror.

```
FUNCTION isReflected(points):
    pts = SET((x, y) for x, y in points)
    minX = MIN(x for x, y in pts)
    maxX = MAX(x for x, y in pts)
    total = minX + maxX
    RETURN all((total - x, y) in pts for x, y in pts)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> The reflection axis is fixed at `(min + max) / 2`. For each point `(x, y)`, check if `(total - x, y)` exists. Use a set for O(1) lookup.
