# 84. Largest Rectangle in Histogram

**Difficulty:** 🔴 Hard
**Acceptance:** 45.0%
**LeetCode:** [https://leetcode.com/problems/largest-rectangle-in-histogram](https://leetcode.com/problems/largest-rectangle-in-histogram)
**Companies:** Adobe, Amazon, Apple, Bitgo, Bloomberg, Capital One, Cisco, Coupang, Devrev, Doordash, Flipkart, Goldman Sachs, Google, Infosys, Josh Technology, Linkedin, Maq Software, Meta, Microsoft, Myntra, Oracle, Roblox, Tcs, Thoughtspot, Tiktok, Uber, Visa, Walmart Labs, Waymo, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Brute Force — O(n²)](#3-approach-1-brute-force--on²)
4. [Approach 2: Monotonic Stack — O(n) ✅](#4-approach-2-monotonic-stack--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an array of integers `heights` representing the histogram's bar heights (each bar has width 1), find the area of the **largest rectangle** in the histogram.

**Constraints:**
- `1 <= heights.length <= 10⁵`
- `0 <= heights[i] <= 10⁴`

---

## 2. Examples

```
Example 1:
  Input:  heights = [2,1,5,6,2,3]
  Output: 10
  Reason: The rectangle spans bars at indices 2-3, height=5, width=2.

Example 2:
  Input:  heights = [2,4]
  Output: 4
```

---

## 3. Approach 1: Brute Force — O(n²)

For each bar, expand left and right while heights ≥ current bar's height.

```
FUNCTION largestRectangleArea(heights):
    maxArea = 0
    FOR i ← 0 TO n - 1:
        minHeight = heights[i]
        FOR j ← i TO n - 1:
            minHeight = MIN(minHeight, heights[j])
            maxArea = MAX(maxArea, minHeight * (j - i + 1))
    RETURN maxArea
```

---

## 4. Approach 2: Monotonic Stack — O(n) ✅

### Key Insight

Use a **monotonically increasing stack** of indices. When we encounter a bar shorter than the stack top, the top bar can't extend further right — we calculate its area.

The key: when popping bar `i`, its right boundary is the current index, and its left boundary is the new stack top (or -1 if empty).

### Pseudocode

```
FUNCTION largestRectangleArea(heights):
    stack = []          // stores indices, monotonically increasing heights
    maxArea = 0
    n = len(heights)

    FOR i ← 0 TO n:     // n is intentional (sentinel)
        currHeight = 0 IF i == n ELSE heights[i]

        WHILE stack is not empty AND heights[stack.TOP()] > currHeight:
            height = heights[stack.POP()]
            width = i IF stack is empty ELSE (i - stack.TOP() - 1)
            maxArea = MAX(maxArea, height * width)

        stack.PUSH(i)

    RETURN maxArea
```

---

## 5. Walkthrough

```
heights = [2, 1, 5, 6, 2, 3]

i=0: push 0, stack=[0]
i=1: heights[0]=2 > 1 → pop 0, area=2*1=2, maxArea=2
     push 1, stack=[1]
i=2: push 2, stack=[1,2]
i=3: push 3, stack=[1,2,3]
i=4: heights[3]=6 > 2 → pop 3, width=4-2-1=1, area=6*1=6, maxArea=6
     heights[2]=5 > 2 → pop 2, width=4-1-1=2, area=5*2=10, maxArea=10
     push 4, stack=[1,4]
i=5: push 5, stack=[1,4,5]
i=6 (sentinel, h=0):
     pop 5: height=3, width=6-4-1=1, area=3
     pop 4: height=2, width=6-1-1=4, area=8
     pop 1: height=1, width=6, area=6

maxArea = 10 ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n²) | O(1) |
| **Monotonic Stack** | **O(n)** | **O(n)** |

Each bar is pushed and popped exactly once → O(n) total.

---

## 7. Follow-Up Questions

### 7.1 Maximal Rectangle (LeetCode #85)?

Build a histogram for each row of a binary matrix (heights of consecutive 1s above). Apply Largest Rectangle in Histogram to each row. Overall O(m·n).

### 7.2 Trapping Rain Water (LeetCode #42)?

Related stack problem but tracks water between bars. Can also use the monotonic stack approach.

### 7.3 What if bars have different widths?

Track cumulative widths. When calculating area, use the cumulative width between boundaries instead of `index difference`.

---

## Key Takeaway

> The **monotonic stack** is the optimal tool for "find the nearest smaller element" problems. In this histogram problem, the stack naturally identifies how far each bar can extend left and right. The sentinel value (appending height 0) ensures all bars are processed.
