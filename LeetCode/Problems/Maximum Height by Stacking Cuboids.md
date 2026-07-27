# 1691. Maximum Height by Stacking Cuboids

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-height-by-stacking-cuboids](https://leetcode.com/problems/maximum-height-by-stacking-cuboids)
**Companies:** Amazon, Google, Meta, Samsung

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + LIS-style DP — O(n²)](#approach-sort--lis-style-dp--on²-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Stack cuboids to maximize total height. A cuboid can be placed on another if all three dimensions are ≤ the cuboid below. You can rotate cuboids (choose which dimension is height).

---

## Key Insight

> Sort each cuboid's dimensions (so w ≤ l ≤ h). It's always optimal to use the largest dimension as height. Sort all cuboids, then apply LIS-style DP where cuboid j can go under cuboid i if all three sorted dimensions of j ≤ i.

---

## Approach: Sort + LIS-style DP — O(n²) ✅

```
FUNCTION maxHeight(cuboids):
    FOR c IN cuboids: c.SORT()
    cuboids.SORT()

    n = len(cuboids)
    dp = [c[2] for c in cuboids]

    FOR i ← 1 TO n - 1:
        FOR j ← 0 TO i - 1:
            IF cuboids[j][0] <= cuboids[i][0] AND
               cuboids[j][1] <= cuboids[i][1] AND
               cuboids[j][2] <= cuboids[i][2]:
                dp[i] = MAX(dp[i], dp[j] + cuboids[i][2])

    RETURN MAX(dp)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + DP | **O(n²)** | O(n) |

---

## Key Takeaway

> **Sort dimensions within each cuboid, then sort all cuboids. LIS-style DP with 3D dominance check.** Always optimal to orient the largest dimension as height.
