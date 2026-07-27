# 2280. Minimum Lines to Represent a Line Chart

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-lines-to-represent-a-line-chart](https://leetcode.com/problems/minimum-lines-to-represent-a-line-chart)
**Companies:** Google

---

## Problem Description

Given stock prices at different days, return the **minimum number of line segments** to represent the line chart.

## Key Insight

> Sort by day. A new line segment starts whenever the slope changes. Compare slopes using cross multiplication to avoid floating-point: `(y2-y1)*(x3-x2) != (y3-y2)*(x2-x1)`.

## Approach: Sort + Slope Comparison — O(n log n) ✅

```
FUNCTION minimumLines(stockPrices):
    SORT stockPrices by day
    IF len(stockPrices) <= 1: RETURN 0
    lines ← 1
    FOR i ← 2 TO n-1:
        (x1,y1), (x2,y2), (x3,y3) = stockPrices[i-2], stockPrices[i-1], stockPrices[i]
        // Cross multiply to avoid float comparison
        IF (y2-y1) * (x3-x2) != (y3-y2) * (x2-x1):
            lines += 1
    RETURN lines
```

| Time | Space |
|------|-------|
| O(n log n) | O(1) |

## Key Takeaway

> Count slope changes in sorted points. Use **cross multiplication** instead of division to compare slopes exactly and avoid floating-point errors.
