# 3540. Minimum Time to Visit All Houses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-visit-all-houses](https://leetcode.com/problems/minimum-time-to-visit-all-houses)
**Companies:** Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sum of Consecutive Distances — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

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

```text
FUNCTION minTimeToVisitAllHouses(houses):
    total ← 0
    FOR i ← 1 TO LENGTH(houses) - 1:
        total ← total + ABS(houses[i] - houses[i-1])
    RETURN total
```

---

## 4. Examples

**Example 1:**
```
houses = [1, 3, 6]
```
Distance = |3-1| + |6-3| = 2 + 3 = **5** seconds.

**Example 2:**
```
houses = [10, 5, 8, 2]
```
Distance = |5-10| + |8-5| + |2-8| = 5 + 3 + 6 = **14** seconds.

---

## 5. Walkthrough

| i | houses[i] | houses[i-1] | Increment | Cumulative |
|---|-----------|-------------|-----------|------------|
| 1 | 3 | 1 | 2 | 2 |
| 2 | 6 | 3 | 3 | 5 |

The algorithm adds each absolute difference to `total` and returns 5.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would the solution change if the visiting order could be rearranged?
2. What if moving between houses incurs a variable speed or cost?
3. Can the problem be extended to a 2‑D plane with Euclidean distances?

---

## 8. Key Takeaway

> **Ordered traversal = sum of consecutive absolute differences.** No optimization needed when order is fixed.
