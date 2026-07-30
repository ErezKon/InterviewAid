# 1691. Maximum Height by Stacking Cuboids

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-height-by-stacking-cuboids](https://leetcode.com/problems/maximum-height-by-stacking-cuboids)
**Companies:** Amazon, Google, Meta, Samsung

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + LIS-style DP — O(n²)](#approach-sort--lis-style-dp--on²-)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
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
    FOR c IN cuboids:
        SORT c ASCENDING   // w ≤ l ≤ h
    SORT cuboids ASCENDING BY (w, l, h)

    n ← LENGTH(cuboids)
    dp ← ARRAY OF SIZE n INITIALIZED TO 0
    FOR i ← 0 TO n-1:
        dp[i] ← cuboids[i][2]   // height of i alone
        FOR j ← 0 TO i-1:
            IF cuboids[j][0] <= cuboids[i][0] AND
               cuboids[j][1] <= cuboids[i][1] AND
               cuboids[j][2] <= cuboids[i][2]:
                dp[i] ← MAX(dp[i], dp[j] + cuboids[i][2])
    RETURN MAX(dp)
```

---

## Examples

**Example 1:**
```
Input: cuboids = [[50,45,20],[95,37,58],[45,23,12]]
Output: 190
Explanation: After sorting dimensions, stack all three cuboids.
```

**Example 2:**
```
Input: cuboids = [[1,1,1],[2,2,2],[3,3,3]]
Output: 6
Explanation: Stack in increasing order of dimensions.
```

---

## Walkthrough

Take **Example 1**.
1. Sort each cuboid: `[[20,45,50],[37,58,95],[12,23,45]]`.
2. Sort list: `[[12,23,45],[20,45,50],[37,58,95]]`.
3. DP initialization: `dp = [45,50,95]`.
4. i=1 (second cuboid): can sit on cuboid 0 because 12≤20,23≤45,45≤50 → `dp[1] = MAX(50, 45+50) = 95`.
5. i=2 (third cuboid): can sit on cuboid 0 (`dp = 45+95=140`) and on cuboid 1 (`dp = 95+95=190`). Choose max → `dp[2]=190`.
6. Result = max(dp) = 190.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + DP | **O(n²)** | O(n) |

---

## Key Takeaway

> **Sort dimensions within each cuboid, then sort all cuboids. LIS-style DP with 3D dominance check.** Always optimal to orient the largest dimension as height.
