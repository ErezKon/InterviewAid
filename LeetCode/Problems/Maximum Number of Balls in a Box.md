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

You have `n` balls numbered from `lowLimit` to `highLimit` inclusive. Each ball goes into a box numbered equal to the **sum of its digits**. Return the **maximum number of balls** in any box.

**Constraints:**
- `1 <= lowLimit <= highLimit <= 10^5`

---

## Examples

**Example 1:**
```
Input:  lowLimit = 1, highLimit = 10
Output: 2
Explanation: Boxes: 1→[1,10], 2→[2], ..., 9→[9]. Box 1 has 2 balls.
```

**Example 2:**
```
Input:  lowLimit = 5, highLimit = 15
Output: 2
Explanation: Box 6→[6,15], box 7→[7], ..., multiple boxes have 2.
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
