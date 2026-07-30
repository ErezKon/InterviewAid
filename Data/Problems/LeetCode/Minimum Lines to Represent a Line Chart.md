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

```text
FUNCTION minimumLines(stockPrices):
    // stockPrices is a list of [day, price] pairs
    SORT stockPrices BY day ASCENDING
    IF LENGTH(stockPrices) <= 1:
        RETURN 0
    lines ← 1
    FOR i ← 2 TO LENGTH(stockPrices) - 1:
        (x1, y1) ← stockPrices[i-2]
        (x2, y2) ← stockPrices[i-1]
        (x3, y3) ← stockPrices[i]
        // Compare slopes without division
        IF (y2 - y1) * (x3 - x2) != (y3 - y2) * (x2 - x1):
            lines ← lines + 1
    RETURN lines
```

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[[1,2],[2,3],[3,4],[4,5]]` | `1` | All points lie on the same line, so only one segment is needed. |
| `[[1,1],[2,2],[3,1],[4,2]]` | `3` | Slopes change at each point, resulting in three line segments. |
| `[[0,0],[1,1],[2,2],[3,5]]` | `2` | First three points are collinear, the last point creates a new segment. |

## Walkthrough

Consider the second example `[[1,1],[2,2],[3,1],[4,2]]`:
1. After sorting (already sorted), start with `lines = 1`.
2. Compare points (1,1)-(2,2)-(3,1): slopes ` (2-1)/(2-1)=1` and `(1-2)/(3-2)=-1` differ → `lines = 2`.
3. Compare points (2,2)-(3,1)-(4,2): slopes `-1` and `(2-1)/(4-3)=1` differ → `lines = 3`.
4. No more points; return `3`.

## Complexity Analysis

| Time Complexity | Space Complexity |
|-----------------|------------------|
| O(n log n) – sorting the points | O(1) – only a few variables are used |

## Follow-Up Questions

- How would you handle duplicate days with different prices?
- Can the algorithm be adapted to return the actual line segments?
- What if the points are given in a streaming fashion?

## Key Takeaway

> Count slope changes in sorted points. Use **cross multiplication** instead of division to compare slopes exactly and avoid floating-point errors.
