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

You are given a 2D **0-indexed **integer array `dimensions`.

For all indices `i`, `0 <= i < dimensions.length`, `dimensions[i][0]` represents the length and `dimensions[i][1]` represents the width of the rectangle `i`.

Return *the **area** of the rectangle having the **longest** diagonal. If there are multiple rectangles with the longest diagonal, return the area of the rectangle having the **maximum** area.*

**Constraints:**
- `1 <= dimensions.length <= 100`
- `dimensions[i].length == 2`
- `1 <= dimensions[i][0], dimensions[i][1] <= 100`

---

## Examples

**Example 1:**
```
Input: dimensions = [[9,3],[8,6]]
Output: 48
Explanation: For index = 0, length = 9 and width = 3. Diagonal length = sqrt(9 * 9 + 3 * 3) = sqrt(90) ≈ 9.487.
For index = 1, length = 8 and width = 6. Diagonal length = sqrt(8 * 8 + 6 * 6) = sqrt(100) = 10.
So, the rectangle at index 1 has a greater diagonal length therefore we return area = 8 * 6 = 48.
```

**Example 2:**
```
Input: dimensions = [[3,4],[4,3]]
Output: 12
Explanation: Length of diagonal is the same for both which is 5, so maximum area = 12.
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
- Extend the problem to 3-D boxes where you compare space diagonals.

---

## Key Takeaway

> **Compare diagonals via squared length to avoid sqrt.** Simple greedy scan with tie-breaking by area.
