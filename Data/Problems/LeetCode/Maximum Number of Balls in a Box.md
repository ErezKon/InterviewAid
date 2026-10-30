# 1742. Maximum Number of Balls in a Box

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-balls-in-a-box](https://leetcode.com/problems/maximum-number-of-balls-in-a-box)
**Companies:** Accenture, Appdynamics, Lucid

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are working in a ball factory where you have `n` balls numbered from `lowLimit` up to `highLimit` **inclusive** (i.e., `n == highLimit - lowLimit + 1`), and an infinite number of boxes numbered from `1` to `infinity`.

Your job at this factory is to put each ball in the box with a number equal to the sum of digits of the ball's number. For example, the ball number `321` will be put in the box number `3 + 2 + 1 = 6` and the ball number `10` will be put in the box number `1 + 0 = 1`.

Given two integers `lowLimit` and `highLimit`, return *the number of balls in the box with the most balls.*

**Constraints:**
- `1 <= lowLimit <= highLimit <= 10^5`

---

## Examples

```
Example 1:
  Input: lowLimit = 1, highLimit = 10
  Output: 2
  Explanation:
    Box Number:  1 2 3 4 5 6 7 8 9 10 11 ...
    Ball Count:  2 1 1 1 1 1 1 1 1 0  0  ...
    Box 1 has the most number of balls with 2 balls.
```

```
Example 2:
  Input: lowLimit = 5, highLimit = 15
  Output: 2
  Explanation:
    Box Number:  1 2 3 4 5 6 7 8 9 10 11 ...
    Ball Count:  1 1 1 1 2 2 1 1 1 0  0  ...
    Boxes 5 and 6 have the most number of balls with 2 balls in each.
```

```
Example 3:
  Input: lowLimit = 19, highLimit = 28
  Output: 2
  Explanation:
    Box Number:  1 2 3 4 5 6 7 8 9 10 11 12 ...
    Ball Count:  0 1 1 1 1 1 1 1 1 2  0  0  ...
    Box 10 has the most number of balls with 2 balls.
```

---

## Key Insight

> Compute the **digit sum** of each number and count frequencies. The max digit sum for numbers up to 10^5 is 9+9+9+9+9 = 45, so we only need a small array.

---

## Approach

```
FUNCTION countBalls(lowLimit, highLimit)
    count ← array of 46 zeros   // digit sum range [1..45]

    FOR i ← lowLimit TO highLimit DO
        digitSum ← SUM of digits of i
        count[digitSum] ← count[digitSum] + 1

    RETURN MAX(count)
END FUNCTION
```

---

## Walkthrough

```
lowLimit = 1, highLimit = 10
```

| Ball | Digit Sum | Box |
|------|-----------|-----|
| 1    | 1         | 1   |
| 2    | 2         | 2   |
| ...  | ...       | ... |
| 9    | 9         | 9   |
| 10   | 1         | 1   |

Box 1 has balls {1, 10} → count = **2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n × d)** — n numbers, d digits each (d ≤ 6) |
| Space  | **O(1)** — fixed-size count array (46 slots) |

---

## Follow-Up Questions

1. **Could we avoid iterating every number?**
   For small ranges (≤10^5), direct iteration is fine. For huge ranges, digit DP could count directly.

2. **What if the range were up to 10^18?**
   Would need digit DP to count how many numbers in [low, high] have each digit sum.

3. **What's the maximum possible digit sum?**
   For 10^5: at most 5 digits of 9 = 45. For 10^18: 18×9 = 162.

---

## Key Takeaway

> **Digit sum + frequency counting** — when the output space is small (digit sums ≤ 45), direct enumeration with a compact counter is perfectly efficient.
