# 2879. Display the First Three Rows

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/display-the-first-three-rows](https://leetcode.com/problems/display-the-first-three-rows)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

Given a DataFrame `employees`, display the **first 3 rows**. This is a Pandas problem.

---

## Approach: Pandas head() ✅

```python
def selectFirstRows(employees):
    return employees.head(3)
```

Alternative: `employees.iloc[:3]` or `employees[:3]`.

---

## Key Takeaway

> **`df.head(n)` returns the first n rows of a DataFrame — the most common way to preview data in Pandas.**
