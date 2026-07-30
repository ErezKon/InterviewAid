# 2943. Maximize Area of Square Hole in Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-area-of-square-hole-in-grid](https://leetcode.com/problems/maximize-area-of-square-hole-in-grid)
**Companies:** Amazon, Google, Meta, Swiggy

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Consecutive Bar Count — O(h log h + v log v)](#approach-consecutive-bar-count--oh-log-h--v-log-v-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You have an `(n+2) × (m+2)` grid of bars. You can remove some horizontal bars (`hBars`) and some vertical bars (`vBars`). Removing consecutive bars creates a hole. Return the **maximum area of a square hole** you can create.

Removing `k` consecutive horizontal bars creates a gap of height `k+1` (the space between the bars above and below). Similarly for vertical. The square hole side = `min(maxHorizontalGap, maxVerticalGap)`.

**Constraints:**
- `1 ≤ n, m ≤ 10⁹`
- `1 ≤ hBars.length, vBars.length ≤ 10³`

---

## Examples

**Example 1:**
```
Input:  n = 2, m = 1, hBars = [2,3], vBars = [2]
Output: 4
Explanation: Remove bars 2,3 horizontally → gap of 3. Remove bar 2 vertically → gap of 2.
             Square side = min(3, 2) = 2 → area = 4.
```

---

## Key Insight

> The largest square hole is limited by the smaller of the max horizontal and max vertical gaps. Each gap = (longest run of consecutive removable bars) + 1. Sort the bars, find the longest consecutive run, add 1 for the gap size.

---

## Approach: Consecutive Bar Count — O(h log h + v log v) ✅

```
FUNCTION maximizeSquareHoleArea(n, m, hBars, vBars):
    FUNCTION maxConsecutive(bars):
        SORT bars; maxLen = 1; curr = 1
        FOR i ← 1 TO len(bars) - 1:
            IF bars[i] == bars[i-1] + 1: curr += 1
            ELSE: curr = 1
            maxLen = MAX(maxLen, curr)
        RETURN maxLen + 1

    h = maxConsecutive(hBars)
    v = maxConsecutive(vBars)
    side = MIN(h, v)
    RETURN side * side
```

---

## Walkthrough

```
hBars = [2, 3], vBars = [2]
```

**Horizontal:** sorted = [2, 3]. Consecutive run: 2→3, length 2. Gap = 2 + 1 = 3.
**Vertical:** sorted = [2]. Single bar, run length 1. Gap = 1 + 1 = 2.

Square side = min(3, 2) = 2 → area = **4** ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + scan | **O(h log h + v log v)** | O(1) |

---

## Follow-Up Questions

**Q1: Why add 1 to the consecutive run length?**
If you remove k consecutive bars, the gap spans from the bar before the first removed one to the bar after the last — that's k+1 unit spaces.

**Q2: What if we want the largest rectangular hole, not square?**
Return `maxH * maxV` instead of `min(maxH, maxV)²`.

**Q3: What if some bars cannot be removed?**
Filter those out before finding consecutive runs. The logic remains the same.

---

## Key Takeaway

> **The square hole size is determined by the minimum of the max horizontal and vertical gaps, where each gap = longest consecutive removable bar run + 1.** A simple sort-and-scan finds the answer.
