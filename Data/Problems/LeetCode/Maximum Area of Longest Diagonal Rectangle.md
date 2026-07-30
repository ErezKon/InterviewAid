# 3000. Maximum Area of Longest Diagonal Rectangle

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-area-of-longest-diagonal-rectangle](https://leetcode.com/problems/maximum-area-of-longest-diagonal-rectangle)
**Companies:** Accenture, Atlassian, Google, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Linear Scan — O(n)](#approach-linear-scan--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of rectangle dimensions `[length, width]`, find the rectangle with the **longest diagonal**. If there's a tie, return the one with the **largest area**.

**Constraints:**
- `1 ≤ dimensions.length ≤ 100`

---

## Examples

**Example 1:**
```
Input: dimensions = [[3,4],[5,12],[8,15]]
Output: 60
Explanation: Diagonals are 5, 13, and 17. The longest is 17 (8,15) with area 120, but 5‑12 has diagonal 13 and area 60, which is the longest diagonal among given rectangles. Hence, return 60.
```

**Example 2:**
```
Input: dimensions = [[1,1],[2,2]]
Output: 4
Explanation: Diagonals are √2 and √8≈2.83. The rectangle [2,2] has the longer diagonal and area 4.
```

---

## Key Insight

> Compare diagonals by their squared length (l² + w²) to avoid floating point. Break ties by area (l × w).

---

## Approach: Linear Scan — O(n) ✅

```text
FUNCTION areaOfMaxDiagonal(dimensions):
    SET maxDiag ← 0
    SET maxArea ← 0
    FOR [l, w] IN dimensions:
        SET diag ← l*l + w*w
        IF diag > maxDiag OR (diag == maxDiag AND l*w > maxArea):
            SET maxDiag ← diag
            SET maxArea ← l * w
    RETURN maxArea
```

---

## Walkthrough

Consider the first example `[[3,4],[5,12],[8,15]]`:
| Step | l | w | diag = l²+w² | maxDiag | maxArea |
|------|---|---|-------------|----------|----------|
| Init | - | - | - | 0 | 0 |
| 1 | 3 | 4 | 9+16=25 | 25 | 12 |
| 2 | 5 | 12 | 25+144=169 | 169 | 60 |
| 3 | 8 | 15 | 64+225=289 | 289 | 120 |
The algorithm returns `120`, the area of the rectangle with the longest diagonal.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Linear scan | **O(n)** | O(1) |

---

## Follow-Up Questions

- How would you modify the solution to also return the dimensions of the chosen rectangle?
- What if the input size grows to millions of rectangles? Discuss streaming or parallel approaches.
- Extend the problem to 3‑D boxes where you compare space diagonals.

---

## Key Takeaway

> **Compare diagonals via squared length to avoid sqrt.** Simple greedy scan with tie‑breaking by area.
