# 2280. Minimum Lines to Represent a Line Chart

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-lines-to-represent-a-line-chart](https://leetcode.com/problems/minimum-lines-to-represent-a-line-chart)
**Companies:** Google

---

## Problem Description

You are given a 2D integer array `stockPrices` where `stockPrices[i] = [day_i, price_i]` indicates the price of the stock on day `day_i` is `price_i`. A **line chart** is created from the array by plotting the points on an XY plane with the X-axis representing the day and the Y-axis representing the price and connecting adjacent points. One such example is shown below:
![img](https://assets.leetcode.com/uploads/2022/03/30/1920px-pushkin_population_historysvg.png)
Return *the **minimum number of lines** needed to represent the line chart*.

**Constraints:**
- `1 <= stockPrices.length <= 10^5`
- `stockPrices[i].length == 2`
- `1 <= day_i, price_i <= 10^9`
- All `day_i` are **distinct**.

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

**Example 1:**
```
Input: stockPrices = [[1,7],[2,6],[3,5],[4,4],[5,4],[6,3],[7,2],[8,1]]
Output: 3
Explanation: The diagram above represents the input, with the X-axis representing the day and Y-axis representing the price.
The following 3 lines can be drawn to represent the line chart:
- Line 1 (in red) from (1,7) to (4,4) passing through (1,7), (2,6), (3,5), and (4,4).
- Line 2 (in blue) from (4,4) to (5,4).
- Line 3 (in green) from (5,4) to (8,1) passing through (5,4), (6,3), (7,2), and (8,1).
It can be shown that it is not possible to represent the line chart using less than 3 lines.
```

**Example 2:**
```
Input: stockPrices = [[3,4],[1,2],[7,8],[2,3]]
Output: 1
Explanation: As shown in the diagram above, the line chart can be represented with a single line.
```

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
