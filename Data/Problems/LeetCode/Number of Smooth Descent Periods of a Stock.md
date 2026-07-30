# 2110. Number of Smooth Descent Periods of a Stock

**Difficulty:** 🟡 Medium

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

Count subarrays where each consecutive pair decreases by exactly 1 (smooth descent). Single elements count.

---

## 2. Examples

| prices | Output | Explanation |
|--------|--------|-------------|
| `[3,2,1,4]` | `7` | Subarrays: `[3]`, `[2]`, `[1]`, `[4]`, `[3,2]`, `[2,1]`, `[3,2,1]` |
| `[5,4,3,2,1]` | `15` | Every subarray is a smooth descent; total `n*(n+1)/2 = 5*6/2 = 15` |
| `[1,2,3]` | `3` | Only single‑element subarrays qualify.

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
