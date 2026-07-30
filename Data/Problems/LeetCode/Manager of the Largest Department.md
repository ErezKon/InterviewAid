# 2988. Manager of the Largest Department

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/manager-of-the-largest-department](https://leetcode.com/problems/manager-of-the-largest-department)
**Companies:** Dassault Sysetmes

---

## 1. Problem Description

Find the manager of the department that has the highest number of employees.

---

## 2. Examples

**Example 1:**
```
Employees Table:
+----+----------+--------+----------+
| id | name     | salary | dep_id   |
+----+----------+--------+----------+
| 1  | Alice    | 100000 | 10       |
| 2  | Bob      | 90000  | 10       |
| 3  | Charlie  | 95000  | 20       |
| 4  | Diana    | 110000 | 20       |
| 5  | Eve      | 105000 | 20       |
+----+----------+--------+----------+

Result: manager of department 20 (e.g., Charlie) because department 20 has 3 employees, more than department 10.
```

---

## 3. Approach: SQL ✅

```sql
SELECT e.dep_id, e.name AS manager_name
FROM Employees e
WHERE e.position = 'Manager'
  AND e.dep_id = (
      SELECT dep_id
      FROM Employees
      GROUP BY dep_id
      ORDER BY COUNT(*) DESC
      LIMIT 1
  );
```

---

## 4. Walkthrough

1. The sub‑query groups all rows by `dep_id` and orders the groups by their employee count, picking the department with the most rows.
2. The outer query filters the `Employees` table for rows where `position = 'Manager'` and `dep_id` matches the department identified in step 1.
3. The selected `name` column gives the manager of that largest department.

---

## 5. Complexity Analysis

- **Time:** O(N) to scan the table once for the grouping, where N is the number of employee records.
- **Space:** O(D) for storing counts per department, D being the number of distinct departments.

---

## 6. Follow‑Up Questions

- How would you modify the query to return the manager(s) of the top k largest departments?
- What if a department can have multiple managers? Adjust the query to list all managers of the largest department.
- Can you write a version that works on databases without `LIMIT` (e.g., using `ROW_NUMBER`).

---

## Key Takeaway

> Group by department to find the largest, then select the manager belonging to that department.
