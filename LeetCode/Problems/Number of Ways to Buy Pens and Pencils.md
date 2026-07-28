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

Given a total budget `total`, the cost of a pen `cost1`, and the cost of a pencil `cost2`, count the number of distinct (pen, pencil) pairs that can be purchased without exceeding the budget.

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

| Input | Output |
|-------|--------|
| `total = 20, cost1 = 10, cost2 = 5` | `9` |
| `total = 5, cost1 = 1, cost2 = 2` | `12` |
| `total = 0, cost1 = 1, cost2 = 1` | `1` |

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
