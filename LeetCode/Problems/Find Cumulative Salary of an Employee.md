# 579. Find Cumulative Salary of an Employee

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-cumulative-salary-of-an-employee](https://leetcode.com/problems/find-cumulative-salary-of-an-employee)
**Companies:** Amazon

---

## Problem Description

Get each employee's cumulative salary over a 3-month window (current + previous 2 months), excluding the most recent month for each employee.

---

## Approach: Self-Join or Window Function ✅

```sql
SELECT e1.id, e1.month,
       (SELECT SUM(e2.salary) FROM Employee e2
        WHERE e2.id = e1.id AND e2.month BETWEEN e1.month - 2 AND e1.month) AS salary
FROM Employee e1
WHERE e1.month < (SELECT MAX(month) FROM Employee WHERE id = e1.id)
ORDER BY id, month DESC;
```

---

## Key Takeaway

> **3-month rolling sum via self-join or window function. Exclude most recent month per employee using a subquery filter.**
