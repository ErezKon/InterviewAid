# 365. Water and Jug Problem

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/water-and-jug-problem](https://leetcode.com/problems/water-and-jug-problem)
**Companies:** Amazon, Apple, Google, Lyft, Microsoft, Oracle, Tiktok, Uber
---

## Problem Description
Given two jugs with capacities `x` and `y` liters and an infinite water source, determine whether it is possible to measure exactly `target` liters using any sequence of fill, empty, and pour operations.

## Examples
- Input: `x = 3, y = 5, target = 4` → Output: `true`
- Input: `x = 2, y = 6, target = 5` → Output: `false`

## Approach
By Bézout's identity, a measurable amount must be a multiple of `g = GCD(x, y)` and cannot exceed the total capacity `x + y`. Therefore, check `target <= x + y` and `target % g == 0`.

```text
FUNCTION canMeasureWater(x, y, target):
    IF target > x + y:
        RETURN false
    SET g ← GCD(x, y)
    RETURN (target MOD g) = 0
```

## Walkthrough
| Values | GCD | Condition |
|--------|-----|-----------|
| x=3, y=5 | 1 | target 4 ≤ 8 and 4 % 1 = 0 → true |
| x=2, y=6 | 2 | target 5 ≤ 8 but 5 % 2 ≠ 0 → false |

## Complexity Analysis
- Time: O(log min(x, y)) for Euclidean GCD.
- Space: O(1).

## Follow-Up Questions
- How would you construct the actual sequence of operations?
- What if you have more than two jugs?
- Can you extend the solution to minimize the number of steps?

## Key Takeaway
The feasibility reduces to a simple GCD check combined with a capacity bound.
