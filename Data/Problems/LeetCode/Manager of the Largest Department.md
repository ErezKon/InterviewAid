# 2988. Manager of the Largest Department

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/manager-of-the-largest-department](https://leetcode.com/problems/manager-of-the-largest-department)
**Companies:** Dassault Sysetmes

---

## 1. Problem Description

Table: `Employees`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| emp_id      | int     |
| emp_name    | varchar |
| dep_id      | int     |
| position    | varchar |
+-------------+---------+
emp_id is column of unique values for this table.
This table contains emp_id, emp_name, dep_id, and position.
```

Write a solution to find the **name** of the **manager** from the **largest department**. There may be multiple largest departments when the number of employees in those departments is the same.

Return *the result table sorted by* `dep_id` *in **ascending** order*.

The result format is in the following example.

---

## 2. Examples

```
Example 1:
  Input:
  Employees table:
  +--------+----------+--------+---------------+
  | emp_id | emp_name | dep_id | position      |
  +--------+----------+--------+---------------+
  | 156    | Michael  | 107    | Manager       |
  | 112    | Lucas    | 107    | Consultant    |
  | 8      | Isabella | 101    | Manager       |
  | 160    | Joseph   | 100    | Manager       |
  | 80     | Aiden    | 100    | Engineer      |
  | 190    | Skylar   | 100    | Freelancer    |
  | 196    | Stella   | 101    | Coordinator   |
  | 167    | Audrey   | 100    | Consultant    |
  | 97     | Nathan   | 101    | Supervisor    |
  | 128    | Ian      | 101    | Administrator |
  | 81     | Ethan    | 107    | Administrator |
  +--------+----------+--------+---------------+
  Output:
  +--------------+--------+
  | manager_name | dep_id |
  +--------------+--------+
  | Joseph       | 100    |
  | Isabella     | 101    |
  +--------------+--------+
  Explanation:
  - Departments with IDs 100 and 101 each has a total of 4 employees, while department 107 has 3 employees. Since both departments 100 and 101 have an equal number of employees, their respective managers will be included.
  Output table is ordered by dep_id in ascending order.
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
