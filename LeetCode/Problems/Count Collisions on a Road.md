# 2211. Count Collisions on a Road

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Arcesium, Google
---

```
FUNCTION countCollisions(directions):
    // Remove leading L and trailing R (they escape)
    s = directions.lstrip('L').rstrip('R')
    RETURN len(s) - s.count('S')
```
