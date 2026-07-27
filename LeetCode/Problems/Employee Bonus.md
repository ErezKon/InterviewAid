# 577. Employee Bonus

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/employee-bonus](https://leetcode.com/problems/employee-bonus)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Netsuite, Tcs

---

## Problem Description

Given `Employee` (empId, name, supervisor, salary) and `Bonus` (empId, bonus) tables, report employees with bonus **less than 1000** or **no bonus** at all.

---

## Key Insight

> `LEFT JOIN` keeps employees even if they have no matching bonus row. The `WHERE` must handle `NULL` explicitly since `NULL < 1000` is `NULL` (not `TRUE`).

---

## Approach: LEFT JOIN + NULL Check

```sql
SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b ON e.empId = b.empId
WHERE b.bonus < 1000 OR b.bonus IS NULL;
```

---

## Key Takeaway

> **LEFT JOIN + IS NULL is the SQL pattern for "include rows with no match." Always check for NULL explicitly in WHERE clauses since NULL comparisons return NULL, not FALSE.**
