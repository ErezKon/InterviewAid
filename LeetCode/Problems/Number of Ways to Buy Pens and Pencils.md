# 2240. Number of Ways to Buy Pens and Pencils

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-buy-pens-and-pencils](https://leetcode.com/problems/number-of-ways-to-buy-pens-and-pencils)
**Companies:** Reddit

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Enumerate Pens — O(total/cost1)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Given `total` budget, `cost1` per pen, `cost2` per pencil, count the number of (pen, pencil) combinations affordable.

---

## 2. Approach: Enumerate Pens — O(total/cost1) ✅

```
FUNCTION waysToBuyPensPencils(total, cost1, cost2):
    count = 0
    FOR pens ← 0 TO total / cost1:
        remaining = total - pens * cost1
        count += remaining / cost2 + 1    // 0..remaining/cost2 pencils
    RETURN count
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(total / cost1) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Fix one variable, compute the other.** For each pen count, pencil count = `remaining / cost2 + 1`. Simple enumeration.
