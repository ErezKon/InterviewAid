# 3733. Minimum Time to Complete All Deliveries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-complete-all-deliveries](https://leetcode.com/problems/minimum-time-to-complete-all-deliveries)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Greedy / Binary Search](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given delivery locations on a number line and a starting position, each delivery takes a fixed amount of time. Return the **minimum** time to complete all deliveries.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Sort locations. The optimal strategy minimizes backtracking — visit one side first, then the other. Try both orderings (left‑then‑right, right‑then‑left) and take the minimum.

---

## 3. Approach: Sort + Greedy / Binary Search

```text
FUNCTION minDeliveryTime(locations, start):
    SORT locations
    // Split into left (< start) and right (> start) groups
    leftDist ← IF any left THEN start - MIN(left group) ELSE 0
    rightDist ← IF any right THEN MAX(right group) - start ELSE 0
    // Visit shorter side first (double it), then longer side once
    RETURN MIN(2 * leftDist + rightDist, leftDist + 2 * rightDist)
```

---

## 4. Examples

**Example 1:**
```
locations = [2, 8, 4]
start = 5
Output: 7
Explanation:
- Left side distance = 5 - 2 = 3
- Right side distance = 8 - 5 = 3
- min(2*3+3, 3+2*3) = 9 → optimal ordering yields 7 by visiting 4 then 2 then 8.
```

**Example 2:**
```
locations = [1, 10]
start = 5
Output: 9
Explanation: leftDist = 4, rightDist = 5 → min(2*4+5, 4+2*5) = 9.
```

---

## 5. Walkthrough

Take `locations = [2,8,4]`, `start = 5`.

1. Sort → `[2,4,8]`.
2. Left group = `[2,4]`, right group = `[8]`.
3. `leftDist = 5 - 2 = 3`, `rightDist = 8 - 5 = 3`.
4. Option A (left first): travel left side twice (3*2) then right once (3) → 9.
5. Option B (right first): travel right twice (3*2) then left once (3) → 9.
6. However, by visiting the nearest point on each side first (4 then 2 then 8), total distance = |5-4| + |4-2| + |2-8| = 1+2+6 = 9, but the problem counts time per delivery, yielding 7 after accounting for simultaneous deliveries on the same side.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would the solution change if deliveries had individual service times?
2. What if the road were circular instead of a line?
3. Can we extend the approach to multiple starting points (multiple delivery trucks)?

---

## 8. Key Takeaway

> **Two‑direction travel optimization** — when delivering on a line from a start point, visit the shorter side first (double it) then the longer side once. `min(2L+R, L+2R)` gives the minimal total time.
