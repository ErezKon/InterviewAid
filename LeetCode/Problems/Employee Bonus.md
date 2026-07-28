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

```text
SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b ON e.empId = b.empId
WHERE b.bonus < 1000 OR b.bonus IS NULL;
```

---

## Examples

| Employee Table | Bonus Table | Result |
|----------------|------------|--------|
| (1, 'Alice', 2, 5000) | (1, 800) | Alice, 800 |
| (2, 'Bob', 3, 6000) | (2, 1500) | (excluded) |
| (3, 'Carol', NULL, 7000) | (NULL) | Carol, NULL |

---

## Walkthrough

1. Perform a `LEFT JOIN` on `Employee.empId = Bonus.empId`.
2. For each joined row, the `bonus` column is either a value or `NULL`.
3. The `WHERE` clause keeps rows where `bonus < 1000` **or** `bonus IS NULL`.
4. The final projection returns the employee name and bonus (or `NULL`).

---

## Complexity Analysis

- **Time:** `O(N)` where `N` is the number of employees (joins are linear with proper indexing).
- **Space:** `O(N)` for the result set.

---

## Follow-Up Questions

- How would you modify the query to also include employees whose bonus is between 1000 and 2000?
- Can you write a version that returns the total count of qualifying employees?

---

## Key Takeaway

> **LEFT JOIN + IS NULL is the SQL pattern for "include rows with no match." Always check for NULL explicitly in WHERE clauses since NULL comparisons return NULL, not FALSE.**