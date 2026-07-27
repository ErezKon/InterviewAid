# 1274. Number of Ships in a Rectangle

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ships-in-a-rectangle](https://leetcode.com/problems/number-of-ships-in-a-rectangle)
**Companies:** Applied Intuition, Bloomberg

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Divide and Conquer — O(S · log(area))](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

API: `hasShips(topRight, bottomLeft)` returns true if ships exist in the rectangle. Find total ship count using minimal API calls.

---

## 2. Key Insight

> Divide the rectangle into 4 quadrants. Recursively search quadrants that `hasShips()` returns true for. Base case: single point → 1 if has ships, else 0.

---

## 3. Approach: Divide and Conquer — O(S · log(area)) ✅

```
FUNCTION countShips(topRight, bottomLeft):
    IF bottomLeft.x > topRight.x OR bottomLeft.y > topRight.y: RETURN 0
    IF NOT hasShips(topRight, bottomLeft): RETURN 0
    IF topRight == bottomLeft: RETURN 1

    midX = (bottomLeft.x + topRight.x) / 2
    midY = (bottomLeft.y + topRight.y) / 2

    RETURN countShips((midX, midY), bottomLeft) +
           countShips((midX, topRight.y), (bottomLeft.x, midY+1)) +
           countShips(topRight, (midX+1, midY+1)) +
           countShips((topRight.x, midY), (midX+1, bottomLeft.y))
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(S · log(area)) where S = ships |
| **Space** | O(log(area)) recursion |

---

## 5. Key Takeaway

> **Quad-tree search with API pruning.** Divide into 4 quadrants, skip empty regions. Ships are sparse so pruning is very effective.
