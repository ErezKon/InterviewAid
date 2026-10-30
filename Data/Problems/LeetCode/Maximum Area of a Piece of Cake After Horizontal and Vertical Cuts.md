# 1465. Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts](https://leetcode.com/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts)
**Companies:** Bny Mellon, Expedia, Google, Ixl

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sort + Max Gap — O(n log n)](#approach-sort--max-gap--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a rectangular cake of size `h x w` and two arrays of integers `horizontalCuts` and `verticalCuts` where:

- `horizontalCuts[i]` is the distance from the top of the rectangular cake to the `i^th` horizontal cut and similarly, and
- `verticalCuts[j]` is the distance from the left of the rectangular cake to the `j^th` vertical cut.

Return *the maximum area of a piece of cake after you cut at each horizontal and vertical position provided in the arrays* `horizontalCuts` *and* `verticalCuts`. Since the answer can be a large number, return this **modulo** `10^9 + 7`.

**Constraints:**
- `2 <= h, w <= 10^9`
- `1 <= horizontalCuts.length <= min(h - 1, 10^5)`
- `1 <= verticalCuts.length <= min(w - 1, 10^5)`
- `1 <= horizontalCuts[i] < h`
- `1 <= verticalCuts[i] < w`
- All the elements in `horizontalCuts` are distinct.
- All the elements in `verticalCuts` are distinct.

---

## Examples

**Example 1:**
```
Input: h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]
Output: 4
Explanation: The figure above represents the given rectangular cake. Red lines are the horizontal and vertical cuts. After you cut the cake, the green piece of cake has the maximum area.
```

**Example 2:**
```
Input: h = 5, w = 4, horizontalCuts = [3,1], verticalCuts = [1]
Output: 6
Explanation: The figure above represents the given rectangular cake. Red lines are the horizontal and vertical cuts. After you cut the cake, the green and yellow pieces of cake have the maximum area.
```

**Example 3:**
```
Input: h = 5, w = 4, horizontalCuts = [3], verticalCuts = [3]
Output: 9
```

---

## Key Insight

> Cuts are independent along each axis. The maximum piece area = **max horizontal gap × max vertical gap**. Sort cuts, include boundaries (0 and h/w), find the maximum consecutive difference in each direction.

---

## Approach: Sort + Max Gap — O(n log n) ✅

```
FUNCTION maxArea(h, w, horizontalCuts, verticalCuts):
    MOD = 10^9 + 7
    horizontalCuts.SORT(); verticalCuts.SORT()
    hCuts = [0] + horizontalCuts + [h]
    vCuts = [0] + verticalCuts + [w]
    maxH = MAX(hCuts[i+1] - hCuts[i] for i)
    maxV = MAX(vCuts[i+1] - vCuts[i] for i)
    RETURN (maxH * maxV) % MOD
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + max gap | **O(n log n)** | O(n) |

---

## Key Takeaway

> **Orthogonal cuts are independent — max area = max horizontal gap × max vertical gap.** Sort the cuts and find the maximum gap in each dimension.
