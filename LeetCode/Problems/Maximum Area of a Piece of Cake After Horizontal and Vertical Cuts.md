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

Given a cake of height `h` and width `w`, with horizontal and vertical cut positions, find the maximum area of any piece after all cuts. Return result modulo 10⁹+7.

**Constraints:**
- `2 ≤ h, w ≤ 10⁹`
- `1 ≤ cuts ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]
Output: 4
Explanation: Max horizontal gap = 2, max vertical gap = 2 → area = 4.
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
