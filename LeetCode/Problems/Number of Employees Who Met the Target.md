# 2798. Number of Employees Who Met the Target

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-employees-who-met-the-target](https://leetcode.com/problems/number-of-employees-who-met-the-target)
**Companies:** Amazon, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Linear Scan — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Return the number of employees who worked at least `target` hours.

---

## 2. Approach: Linear Scan — O(n) ✅

```
FUNCTION numberOfEmployeesWhoMetTarget(hours, target):
    RETURN SUM(1 for h in hours if h >= target)
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Simple count with threshold filter.** One-liner counting elements ≥ target.
