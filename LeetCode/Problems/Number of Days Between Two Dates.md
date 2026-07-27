# 1360. Number of Days Between Two Dates

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-days-between-two-dates](https://leetcode.com/problems/number-of-days-between-two-dates)
**Companies:** Amazon, Google, Meta, Microsoft, Optiver

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Date Parsing — O(1)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Return the number of days between two dates in `YYYY-MM-DD` format.

---

## 2. Approach: Date Parsing — O(1) ✅

```
FUNCTION daysBetweenDates(date1, date2):
    d1 = datetime.strptime(date1, '%Y-%m-%d')
    d2 = datetime.strptime(date2, '%Y-%m-%d')
    RETURN ABS((d2 - d1).days)
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Use library date parsing.** In interviews, mention leap year rules if implementing from scratch: divisible by 4, except centuries unless divisible by 400.
