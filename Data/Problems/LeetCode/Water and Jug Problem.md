# 365. Water and Jug Problem

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/water-and-jug-problem](https://leetcode.com/problems/water-and-jug-problem)
**Companies:** Amazon, Apple, Google, Lyft, Microsoft, Oracle, Tiktok, Uber

---

## Problem Description

You are given two jugs with capacities `x` liters and `y` liters. You have an infinite water supply. Return whether the total amount of water in both jugs may reach `target` using the following operations:

- Fill either jug completely with water.
- Completely empty either jug.
- Pour water from one jug into another until the receiving jug is full, or the transferring jug is empty.

**Constraints:**
- `1 <= x, y, target <= 10^3`

## Examples

**Example 1:**
```
Input: x = 3, y = 5, target = 4
Output: true
Explanation: Follow these steps to reach a total of 4 liters:
1. Fill the 5-liter jug (0, 5).
2. Pour from the 5-liter jug into the 3-liter jug, leaving 2 liters (3, 2).
3. Empty the 3-liter jug (0, 2).
4. Transfer the 2 liters from the 5-liter jug to the 3-liter jug (2, 0).
5. Fill the 5-liter jug again (2, 5).
6. Pour from the 5-liter jug into the 3-liter jug until the 3-liter jug is full. This leaves 4 liters in the 5-liter jug (3, 4).
7. Empty the 3-liter jug. Now, you have exactly 4 liters in the 5-liter jug (0, 4).
Reference: The Die Hard example.
```

**Example 2:**
```
Input: x = 2, y = 6, target = 5
Output: false
```

**Example 3:**
```
Input: x = 1, y = 2, target = 3
Output: true
Explanation: Fill both jugs. The total amount of water in both jugs is equal to 3 now.
```

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
