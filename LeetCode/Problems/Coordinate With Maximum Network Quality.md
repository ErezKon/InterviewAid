# 1620. Coordinate With Maximum Network Quality

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/coordinate-with-maximum-network-quality](https://leetcode.com/problems/coordinate-with-maximum-network-quality)
**Companies:** Lyft, Peak6

---

```
FUNCTION bestCoordinate(towers, radius):
    maxQuality = 0; bestX = bestY = 0
    FOR x ← 0 TO 50:
        FOR y ← 0 TO 50:
            quality = 0
            FOR [xi, yi, qi] IN towers:
                d = sqrt((x-xi)^2 + (y-yi)^2)
                IF d <= radius:
                    quality += floor(qi / (1 + d))
            IF quality > maxQuality:
                maxQuality = quality
                bestX, bestY = x, y
    RETURN [bestX, bestY]
```

Brute force all coordinates 0-50. Compute signal quality from each tower within radius.
