# 181. Employees Earning More Than Their Managers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/employees-earning-more-than-their-managers](https://leetcode.com/problems/employees-earning-more-than-their-managers)
**Companies:** Accenture, Amazon, Bloomberg, Cognizant, Google, Meta, Microsoft, Tcs, Wix, Yandex

---

## Problem Description

Given an `Employee` table with columns `id`, `name`, `salary`, and `managerId`, find employees who earn **more than their manager**.

---

## Key Insight

> Self-join the `Employee` table: alias `e` for the employee and `m` for the manager, joining on `e.managerId = m.id`. Then filter where `e.salary > m.salary`.

---

## Approach: Self-Join

```sql
SELECT e.name AS Employee
FROM Employee e
JOIN Employee m ON e.managerId = m.id
WHERE e.salary > m.salary;
```

---

## Examples

| id | name   | salary | managerId |
|----|--------|--------|-----------|
| 1  | Alice  | 120000 | 2         |
| 2  | Bob    | 100000 | NULL      |
| 3  | Carol  | 110000 | 2         |

**Result:** Alice and Carol earn more than their manager Bob, so the query returns `Alice` and `Carol`.

---

## Walkthrough

1. **Self‑join** the table: `e` represents each employee, `m` represents their manager.
2. **Match** rows where `e.managerId = m.id`.
3. **Filter** rows where `e.salary > m.salary`.
4. **Select** the employee name from the filtered rows.

The join pairs each employee with their manager, and the `WHERE` clause keeps only those pairs where the employee's salary exceeds the manager's.

---

## Complexity Analysis

- **Time:** O(N) – a single self‑join scans the table once.
- **Space:** O(N) – additional space for the join result.

---

## Key Takeaway

> **Self‑join is the SQL pattern for comparing rows within the same table. Join employee to manager via the foreign key, then apply the comparison in WHERE.**