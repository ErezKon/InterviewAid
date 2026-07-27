# 3540. Minimum Time to Visit All Houses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-visit-all-houses](https://leetcode.com/problems/minimum-time-to-visit-all-houses)
**Companies:** Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sum of Consecutive Distances — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given houses at positions on a number line to visit in order, return the **minimum** time. Moving one unit takes one second.

**Constraints:**
- `1 <= houses.length <= 10⁵`

---

## 2. Key Insight

> Must visit in order, so total time = sum of distances between consecutive houses: `Σ|houses[i] - houses[i-1]|`.

---

## 3. Approach: Sum of Distances — O(n) ✅

```
FUNCTION minTimeToVisitAllHouses(houses):
    total = 0
    FOR i ← 1 TO n - 1:
        total += ABS(houses[i] - houses[i-1])
    RETURN total
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Ordered traversal = sum of consecutive absolute differences.** No optimization needed when order is fixed.
