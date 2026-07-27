# 85. Maximal Rectangle

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximal-rectangle](https://leetcode.com/problems/maximal-rectangle)
**Companies:** Amazon, Arcesium, Bloomberg, Flipkart, Goldman Sachs, Google, Intuit, Meta, Microsoft, Salesforce, Sprinklr, Tcs, Visa, Zeta, Zoho

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Histogram per Row — O(m·n)](#approach-histogram-per-row--omn-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a binary matrix (`'0'` and `'1'`), find the largest rectangle containing only `1`'s and return its area.

**Constraints:**
- `1 ≤ rows, cols ≤ 200`
- `matrix[i][j]` is `'0'` or `'1'`

---

## Examples

**Example 1:**
```
Input:  matrix = [["1","0","1","0","0"],
                  ["1","0","1","1","1"],
                  ["1","1","1","1","1"],
                  ["1","0","0","1","0"]]
Output: 6
Explanation: The 2×3 rectangle in rows 1-2, cols 2-4.
```

**Example 2:**
```
Input:  matrix = [["0"]]
Output: 0
```

---

## Key Insight

> **Reduce 2D to 1D:** Treat each row as the base of a histogram. For each column, the histogram height is the count of consecutive 1's ending at that row. Then apply the O(n) **Largest Rectangle in Histogram** (LeetCode #84) algorithm per row.

```
Matrix:       Histograms:
1 0 1 0 0     Row 0: [1,0,1,0,0]
1 0 1 1 1     Row 1: [2,0,2,1,1]
1 1 1 1 1     Row 2: [3,1,3,2,2]  ← max rect here = 6
1 0 0 1 0     Row 3: [4,0,0,3,0]
```

---

## Approach: Histogram per Row — O(m·n) ✅

Build a histogram for each row, then apply Largest Rectangle in Histogram for each.

```
FUNCTION maximalRectangle(matrix):
    IF empty: RETURN 0
    m, n = dimensions
    heights = [0] * n
    maxArea = 0

    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            heights[c] = heights[c] + 1 IF matrix[r][c] == '1' ELSE 0

        maxArea = MAX(maxArea, largestRectangleInHistogram(heights))

    RETURN maxArea
```

Uses Largest Rectangle in Histogram (#84) as a subroutine.

---

## Walkthrough

```
Matrix:
1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0
```

| Row | heights       | Largest rect in histogram | maxArea |
|-----|---------------|--------------------------|---------|
| 0   | [1,0,1,0,0]  | 1                        | 1       |
| 1   | [2,0,2,1,1]  | 3 (1×3 from cols 2-4)    | 3       |
| 2   | [3,1,3,2,2]  | **6** (2×3 from cols 2-4)| **6**   |
| 3   | [4,0,0,3,0]  | 4 (4×1 at col 0)         | 6       |

**Result:** 6 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Histogram per Row | **O(m·n)** | O(n) |

Each row's histogram takes O(n) to build and O(n) for the largest rectangle computation (monotonic stack).

---

## Follow-Up Questions

**Q1: What is the "Largest Rectangle in Histogram" subroutine?**
Use a monotonic stack to find, for each bar, the leftmost and rightmost bars that are ≥ its height. Area = height × width. Overall O(n).

**Q2: Can you solve this with DP instead?**
Yes — for each cell, compute the `height`, `left boundary`, and `right boundary` of the rectangle ending at that cell. Same O(m·n) complexity but harder to understand.

**Q3: What about the largest square (LeetCode #221)?**
Different DP: `dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1`. The histogram approach generalizes to rectangles; the DP approach is simpler for squares.

**Q4: What if the matrix contains arbitrary characters and you want the largest rectangle of any single character?**
Run the histogram approach once for each distinct character, or maintain separate height arrays per character.

---

## Key Takeaway

> **"Maximal Rectangle in a binary matrix" reduces to running "Largest Rectangle in Histogram" on each row.** Build cumulative column heights row by row, resetting to 0 on a '0'. This 2D→1D reduction is one of the most elegant patterns in competitive programming.
