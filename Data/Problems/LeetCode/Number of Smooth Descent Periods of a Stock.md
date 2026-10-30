# 2110. Number of Smooth Descent Periods of a Stock

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-smooth-descent-periods-of-a-stock](https://leetcode.com/problems/number-of-smooth-descent-periods-of-a-stock)

**Companies:** Amazon, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given an integer array `prices` representing the daily price history of a stock, where `prices[i]` is the stock price on the `i^th` day.

A **smooth descent period** of a stock consists of **one or more contiguous** days such that the price on each day is **lower** than the price on the **preceding day** by **exactly** `1`. The first day of the period is exempted from this rule.

Return *the number of **smooth descent periods***.

**Constraints:**
- `1 <= prices.length <= 10^5`
- `1 <= prices[i] <= 10^5`

---

## 2. Examples

**Example 1:**
```
Input: prices = [3,2,1,4]
Output: 7
Explanation: There are 7 smooth descent periods:
[3], [2], [1], [4], [3,2], [2,1], and [3,2,1]
Note that a period with one day is a smooth descent period by the definition.
```

**Example 2:**
```
Input: prices = [8,6,7,7]
Output: 4
Explanation: There are 4 smooth descent periods: [8], [6], [7], and [7]
Note that [8,6] is not a smooth descent period as 8 - 6 ≠ 1.
```

**Example 3:**
```
Input: prices = [1]
Output: 1
Explanation: There is 1 smooth descent period: [1]
```

---

## 3. Approach

Use a running length counter to track the current smooth descent period. For each price, if it continues the descent (`price[i] == price[i-1] - 1`) extend the run; otherwise reset to `1`. Add the current run length to the answer because each extension creates `run` new subarrays ending at the current index.

```text
FUNCTION countSmoothDescent(prices):
    SET total ← 0
    SET run ← 0
    FOR i ← 0 TO LENGTH(prices) - 1:
        IF i > 0 AND prices[i] == prices[i-1] - 1:
            SET run ← run + 1
        ELSE:
            SET run ← 1
        SET total ← total + run
    RETURN total
```

---

## 4. Walkthrough

Consider `prices = [3,2,1,4]`:

| i | price | condition (`price[i] == price[i-1] - 1`) | run | total |
|---|-------|------------------------------------------|-----|-------|
| 0 | 3 | N/A | 1 | 1 |
| 1 | 2 | true | 2 | 3 |
| 2 | 1 | true | 3 | 6 |
| 3 | 4 | false | 1 | 7 |

The final `total` is `7`.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass through the price list |
| **Space** | O(1) — only a few scalar variables used |

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to count smooth **ascent** periods?
2. Can you extend this to handle a variable descent step `k` instead of `1`?
3. What if you need to output the longest smooth descent period length?

---

## 7. Key Takeaway

> **Running length accumulation** lets you count all qualifying subarrays in linear time by adding the current run length at each step.
