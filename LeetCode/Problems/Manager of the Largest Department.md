# 2988. Manager of the Largest Department

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/manager-of-the-largest-department](https://leetcode.com/problems/manager-of-the-largest-department)
**Companies:** Dassault Sysetmes

---

## 1. Problem Description (SQL)

Find the manager of the department with the most employees.

---

## 2. Approach: SQL ✅

```sql
SELECT dep_id, emp_name AS manager_name
FROM Employees
WHERE position = 'Manager'
  AND dep_id = (SELECT dep_id FROM Employees GROUP BY dep_id ORDER BY COUNT(*) DESC LIMIT 1);
```

---

## 3. Key Takeaway

> Group by department, find the largest, then join to get its manager.
