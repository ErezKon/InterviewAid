# 3733. Minimum Time to Complete All Deliveries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-complete-all-deliveries](https://leetcode.com/problems/minimum-time-to-complete-all-deliveries)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Greedy / Binary Search](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given delivery locations on a number line and a starting position, each delivery takes a fixed amount of time. Return the **minimum** time to complete all deliveries.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Sort locations. The optimal strategy minimizes backtracking — visit one side first, then the other. Try both orderings (left-then-right, right-then-left) and take the minimum.

---

## 3. Approach: Sort + Two-Direction — O(n log n) ✅

```
FUNCTION minDeliveryTime(locations, start):
    SORT locations
    // Split into left (< start) and right (> start) groups
    // Option 1: go left first, then right
    // Option 2: go right first, then left
    // Time = 2 * shorter side + longer side (travel distances)
    leftDist = start - locations[0] IF any left ELSE 0
    rightDist = locations[-1] - start IF any right ELSE 0
    RETURN MIN(2 * leftDist + rightDist, leftDist + 2 * rightDist)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Two-direction travel optimization** — when delivering on a line from a start point, visit the shorter side first (double it) then the longer side once. `min(2L+R, L+2R)`.
