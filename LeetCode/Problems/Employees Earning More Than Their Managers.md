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

## Key Takeaway

> **Self-join is the SQL pattern for comparing rows within the same table. Join employee to manager via the foreign key, then apply the comparison in WHERE.**
