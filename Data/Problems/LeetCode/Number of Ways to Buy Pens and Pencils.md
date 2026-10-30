# 2240. Number of Ways to Buy Pens and Pencils

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-buy-pens-and-pencils](https://leetcode.com/problems/number-of-ways-to-buy-pens-and-pencils)
**Companies:** Reddit

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Enumerate Pens — O(total/cost1)](#2-approach)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

You are given an integer `total` indicating the amount of money you have. You are also given two integers `cost1` and `cost2` indicating the price of a pen and pencil respectively. You can spend **part or all** of your money to buy multiple quantities (or none) of each kind of writing utensil.

Return *the **number of distinct ways** you can buy some number of pens and pencils.*

**Constraints:**
- `1 <= total, cost1, cost2 <= 10^6`

---

## 2. Approach: Enumerate Pens — O(total / cost1) ✅

```text
FUNCTION waysToBuyPensPencils(total, cost1, cost2):
    count ← 0
    FOR pens ← 0 TO total / cost1:
        remaining ← total - pens * cost1
        // pencils can range from 0 to floor(remaining / cost2)
        count ← count + (remaining / cost2) + 1
    RETURN count
```

---

## 3. Examples

**Example 1:**
```
Input: total = 20, cost1 = 10, cost2 = 5
Output: 9
Explanation: The price of a pen is 10 and the price of a pencil is 5.
- If you buy 0 pens, you can buy 0, 1, 2, 3, or 4 pencils.
- If you buy 1 pen, you can buy 0, 1, or 2 pencils.
- If you buy 2 pens, you cannot buy any pencils.
The total number of ways to buy pens and pencils is 5 + 3 + 1 = 9.
```

**Example 2:**
```
Input: total = 5, cost1 = 10, cost2 = 10
Output: 1
Explanation: The price of both pens and pencils are 10, which cost more than total, so you cannot buy any writing utensils. Therefore, there is only 1 way: buy 0 pens and 0 pencils.
```

---

## 4. Walkthrough

**Example 1:** `total = 20, cost1 = 10, cost2 = 5`
1. `pens = 0` → remaining = 20 → pencils = 0..4 → 5 combos.
2. `pens = 1` → remaining = 10 → pencils = 0..2 → 3 combos.
3. `pens = 2` → remaining = 0 → pencils = 0 → 1 combo.
4. Sum = 5 + 3 + 1 = 9 valid (pen, pencil) pairs.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(total / cost1) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> **Fix one variable, compute the other.** Iterate over possible pen counts, then directly compute the number of feasible pencil counts.
