# 3195. Find the Minimum Area to Cover All Ones I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-i](https://leetcode.com/problems/find-the-minimum-area-to-cover-all-ones-i)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bounding Box — O(m·n) ✅](#3-approach-bounding-box--omn-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an `m x n` binary grid, find the **minimum area** of a rectangle that covers all cells with value 1.

**Constraints:**
- `1 <= m, n <= 1000`

---

## 2. Key Insight

> The minimum bounding rectangle is defined by the extreme positions of all 1s: min/max row and min/max column.

---

## 3. Approach: Bounding Box — O(m·n) ✅

```
FUNCTION minimumArea(grid):
    minR = m; maxR = 0; minC = n; maxC = 0
    FOR r, c where grid[r][c] == 1:
        minR = MIN(minR, r); maxR = MAX(maxR, r)
        minC = MIN(minC, c); maxC = MAX(maxC, c)
    RETURN (maxR - minR + 1) * (maxC - minC + 1)
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · n) — scan all cells |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Minimum bounding rectangle** = track the 4 extreme positions (min/max row and column) of all 1s. Area = width × height.
