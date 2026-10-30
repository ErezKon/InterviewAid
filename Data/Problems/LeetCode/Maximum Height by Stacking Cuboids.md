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

Given `n` `cuboids` where the dimensions of the `i^th` cuboid is `cuboids[i] = [width_i, length_i, height_i]` (**0-indexed**). Choose a **subset** of `cuboids` and place them on each other.

You can place cuboid `i` on cuboid `j` if `width_i <= width_j` and `length_i <= length_j` and `height_i <= height_j`. You can rearrange any cuboid's dimensions by rotating it to put it on another cuboid.

Return *the **maximum height** of the stacked* `cuboids`.

**Constraints:**
- `n == cuboids.length`
- `1 <= n <= 100`
- `1 <= width_i, length_i, height_i <= 100`

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
![img](https://assets.leetcode.com/uploads/2019/10/21/image.jpg)
Input: cuboids = [[50,45,20],[95,37,53],[45,23,12]]
Output: 190
Explanation: Cuboid 1 is placed on the bottom with the 53x37 side facing down with height 95.
Cuboid 0 is placed next with the 45x20 side facing down with height 50.
Cuboid 2 is placed next with the 23x12 side facing down with height 45.
The total height is 95 + 50 + 45 = 190.
```

**Example 2:**
```
Input: cuboids = [[38,25,45],[76,35,3]]
Output: 76
Explanation: You can't place any of the cuboids on the other.
We choose cuboid 1 and rotate it so that the 35x3 side is facing down and its height is 76.
```

**Example 3:**
```
Input: cuboids = [[7,11,17],[7,17,11],[11,7,17],[11,17,7],[17,7,11],[17,11,7]]
Output: 102
Explanation: After rearranging the cuboids, you can see that all cuboids have the same dimension.
You can place the 11x7 side down on all cuboids so their heights are 17.
The maximum height of stacked cuboids is 6 * 17 = 102.
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
