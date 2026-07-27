# 661. Image Smoother

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/image-smoother](https://leetcode.com/problems/image-smoother)
**Companies:** Amazon, Apple, Meta, Microsoft, Roblox, Visa

---

## 1. Problem Description

Smooth an image by replacing each pixel with the floor average of itself and its 8 neighbors (where valid).

## 2. Approach: Brute Force Neighbors — O(m · n) ✅

```
FUNCTION imageSmoother(img):
    m, n = dimensions
    result = m×n zeros
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            total = count = 0
            FOR dr ← -1 TO 1:
                FOR dc ← -1 TO 1:
                    IF 0 <= r+dr < m AND 0 <= c+dc < n:
                        total += img[r+dr][c+dc]
                        count += 1
            result[r][c] = total / count
    RETURN result
```

## Key Takeaway

> For each cell, iterate the 3×3 neighborhood (with bounds checks), compute floor average. O(m·n) since neighbor count is constant.
