# 3000. Maximum Area of Longest Diagonal Rectangle

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-area-of-longest-diagonal-rectangle](https://leetcode.com/problems/maximum-area-of-longest-diagonal-rectangle)
**Companies:** Accenture, Atlassian, Google, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Linear Scan — O(n)](#approach-linear-scan--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of rectangle dimensions `[length, width]`, find the rectangle with the **longest diagonal**. If there's a tie, return the one with the **largest area**.

**Constraints:**
- `1 ≤ dimensions.length ≤ 100`

---

## Key Insight

> Compare diagonals by their squared length (l² + w²) to avoid floating point. Break ties by area (l × w).

---

## Approach: Linear Scan — O(n) ✅

```
FUNCTION areaOfMaxDiagonal(dimensions):
    maxDiag = 0; maxArea = 0
    FOR [l, w] IN dimensions:
        diag = l*l + w*w
        IF diag > maxDiag OR (diag == maxDiag AND l*w > maxArea):
            maxDiag = diag; maxArea = l * w
    RETURN maxArea
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Linear scan | **O(n)** | O(1) |

---

## Key Takeaway

> **Compare diagonals via squared length to avoid sqrt.** Simple greedy scan with tie-breaking by area.
