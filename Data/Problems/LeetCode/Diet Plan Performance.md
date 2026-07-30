# 1176. Diet Plan Performance

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/diet-plan-performance](https://leetcode.com/problems/diet-plan-performance)
**Companies:** Amazon

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sliding Window](#approach-sliding-window)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A dieter consumes `calories[i]` calories on day `i`. Given integers `k` (window size), `lower`, and `upper`:
- For every **consecutive** `k`-day window, compute total calories `T`.
- If `T < lower`: lose 1 point.
- If `T > upper`: gain 1 point.
- Otherwise: no change.

Return the total points after evaluating all windows.

**Constraints:**
- `1 <= k <= calories.length <= 10^5`
- `0 <= calories[i] <= 20000`
- `0 <= lower <= upper`

---

## Examples

**Example 1:**
```
Input: calories = [1,2,3,4,5], k = 1, lower = 3, upper = 3
Output: 0
Explanation: Windows: [1]→-1, [2]→-1, [3]→0, [4]→+1, [5]→+1 → total = 0
```

**Example 2:**
```
Input: calories = [3,2], k = 2, lower = 0, upper = 1
Output: 1
Explanation: Window [3,2] sum=5 > 1 → +1 point.
```

---

## Key Insight

> Classic fixed-size **sliding window**. Maintain a running sum, slide it across, and evaluate each window against the thresholds.

---

## Approach: Sliding Window ✅

```
FUNCTION dietPlanPerformance(calories, k, lower, upper):
    windowSum ← SUM(calories[0..k-1])
    points ← 0

    FOR i ← 0 TO length(calories) - k DO
        IF i > 0 THEN
            windowSum ← windowSum + calories[i + k - 1] - calories[i - 1]

        IF windowSum < lower THEN points ← points - 1
        ELSE IF windowSum > upper THEN points ← points + 1

    RETURN points
END FUNCTION
```

---

## Walkthrough

```
calories = [1,2,3,4,5], k = 1, lower = 3, upper = 3
```

| Window | Sum | < 3? | > 3? | Points |
|--------|-----|------|------|--------|
| [1]    | 1   | ✅    |      | -1     |
| [2]    | 2   | ✅    |      | -2     |
| [3]    | 3   |      |      | -2     |
| [4]    | 4   |      | ✅    | -1     |
| [5]    | 5   |      | ✅    | 0      |

Result: **0** ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Single pass with sliding window |
| **Space** | O(1) | Only running sum and counter |

---

## Key Takeaway

> **Fixed-size sliding window + threshold evaluation — maintain a running sum, add the incoming element, remove the outgoing one, and classify each window.**
