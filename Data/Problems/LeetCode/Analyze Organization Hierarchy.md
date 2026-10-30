# 3482. Analyze Organization Hierarchy

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/analyze-organization-hierarchy](https://leetcode.com/problems/analyze-organization-hierarchy)
**Companies:** Amazon

---

## 1. Problem Description

Table: `Employees`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| employee_id    | int     |
| employee_name  | varchar |
| manager_id     | int     |
| salary         | int     |
| department     | varchar |
+----------------+----------+
employee_id is the unique key for this table.
Each row contains information about an employee, including their ID, name, their manager's ID, salary, and department.
manager_id is null for the top-level manager (CEO).
```

Write a solution to analyze the organizational hierarchy and answer the following:

- **Hierarchy Levels:** For each employee, determine their level in the organization (CEO is level `1`, employees reporting directly to the CEO are level `2`, and so on).
- **Team Size:** For each employee who is a manager, count the total number of employees under them (direct and indirect reports).
- **Salary Budget:** For each manager, calculate the total salary budget they control (sum of salaries of all employees under them, including indirect reports, plus their own salary).

Return *the result table ordered by *the result ordered by **level** in **ascending** order, then by **budget** in **descending** order, and finally by **employee_name** in **ascending** order*.*

*The result format is in the following example.*

---

## 2. Approach: Recursive CTE ✅

```sql
WITH RECURSIVE hierarchy AS (
    SELECT employee_id, employee_name, manager_id, salary, 1 AS level
    FROM Employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.employee_id, e.employee_name, e.manager_id, e.salary, h.level + 1
    FROM Employees e JOIN hierarchy h ON e.manager_id = h.employee_id
),
subordinates AS (
    SELECT h1.employee_id,
           COUNT(h2.employee_id) AS sub_count,
           COALESCE(SUM(h2.salary), 0) AS budget
    FROM hierarchy h1
    LEFT JOIN hierarchy h2 ON h2.manager_id = h1.employee_id
    GROUP BY h1.employee_id
)
SELECT h.employee_id, h.employee_name, h.level, s.sub_count, h.salary + s.budget AS budget
FROM hierarchy h JOIN subordinates s ON h.employee_id = s.employee_id
ORDER BY h.level, h.employee_id;
```

---

## Examples

**Example 1:**
```
Input:
Employees table:
+-------------+---------------+------------+--------+-------------+
| employee_id | employee_name | manager_id | salary | department  |
+-------------+---------------+------------+--------+-------------+
| 1           | Alice         | null       | 12000  | Executive   |
| 2           | Bob           | 1          | 10000  | Sales       |
| 3           | Charlie       | 1          | 10000  | Engineering |
| 4           | David         | 2          | 7500   | Sales       |
| 5           | Eva           | 2          | 7500   | Sales       |
| 6           | Frank         | 3          | 9000   | Engineering |
| 7           | Grace         | 3          | 8500   | Engineering |
| 8           | Hank          | 4          | 6000   | Sales       |
| 9           | Ivy           | 6          | 7000   | Engineering |
| 10          | Judy          | 6          | 7000   | Engineering |
+-------------+---------------+------------+--------+-------------+
Output:
+-------------+---------------+-------+-----------+--------+
| employee_id | employee_name | level | team_size | budget |
+-------------+---------------+-------+-----------+--------+
| 1           | Alice         | 1     | 9         | 84500  |
| 3           | Charlie       | 2     | 4         | 41500  |
| 2           | Bob           | 2     | 3         | 31000  |
| 6           | Frank         | 3     | 2         | 23000  |
| 4           | David         | 3     | 1         | 13500  |
| 7           | Grace         | 3     | 0         | 8500   |
| 5           | Eva           | 3     | 0         | 7500   |
| 9           | Ivy           | 4     | 0         | 7000   |
| 10          | Judy          | 4     | 0         | 7000   |
| 8           | Hank          | 4     | 0         | 6000   |
+-------------+---------------+-------+-----------+--------+
Explanation:
- Organization Structure:
- Alice (ID: 1) is the CEO (level 1) with no manager
- Bob (ID: 2) and Charlie (ID: 3) report directly to Alice (level 2)
- David (ID: 4), Eva (ID: 5) report to Bob, while Frank (ID: 6) and Grace (ID: 7) report to Charlie (level 3)
- Hank (ID: 8) reports to David, and Ivy (ID: 9) and Judy (ID: 10) report to Frank (level 4)
- Level Calculation:
- The CEO (Alice) is at level 1
- Each subsequent level of management adds 1 to the level
- Team Size Calculation:
- Alice has 9 employees under her (the entire company except herself)
- Bob has 3 employees (David, Eva, and Hank)
- Charlie has 4 employees (Frank, Grace, Ivy, and Judy)
- David has 1 employee (Hank)
- Frank has 2 employees (Ivy and Judy)
- Eva, Grace, Hank, Ivy, and Judy have no direct reports (team_size = 0)
- Budget Calculation:
- Alice's budget: Her salary (12000) + all employees' salaries (72500) = 84500
- Charlie's budget: His salary (10000) + Frank's budget (23000) + Grace's salary (8500) = 41500
- Bob's budget: His salary (10000) + David's budget (13500) + Eva's salary (7500) = 31000
- Frank's budget: His salary (9000) + Ivy's salary (7000) + Judy's salary (7000) = 23000
- David's budget: His salary (7500) + Hank's salary (6000) = 13500
- Employees with no direct reports have budgets equal to their own salary
Note:
- The result is ordered first by level in ascending order
- Within the same level, employees are ordered by budget in descending order then by name in ascending order
```

---

## Walkthrough

1. **Base case** – select the CEO (manager_id NULL) with level 1.
2. **Recursive step** – join each employee to its manager, increment level.
3. **Subordinate aggregation** – self‑join hierarchy on manager_id to count direct subordinates and sum their salaries.
4. **Final select** – combine hierarchy and subordinates, compute total budget as own salary plus subordinates' salaries.

---

## Complexity Analysis

- **Time**: O(N log N) for the recursive join processing all employees (depends on DB optimizer).
- **Space**: O(N) for the CTE tables storing hierarchy and aggregation.

---

## Follow-Up Questions

- How to compute the total budget for *all* indirect subordinates (entire subtree) efficiently?
- How to handle cycles or invalid manager references in the data?
- Can the query be adapted to return the top‑k departments by total budget?

---

## Key Takeaway

> Recursive CTEs let you traverse hierarchical data directly in SQL, enabling level computation and aggregation of subordinate information without external code.
