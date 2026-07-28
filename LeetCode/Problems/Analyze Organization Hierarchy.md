# 3482. Analyze Organization Hierarchy

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/analyze-organization-hierarchy](https://leetcode.com/problems/analyze-organization-hierarchy)
**Companies:** Amazon

---

## 1. Problem Description

**SQL Problem.** Given an `Employees` table with `employee_id`, `employee_name`, `manager_id`, `salary`, and `department`, analyze the organization hierarchy: compute each employee's level, subordinate count, and budget (sum of all subordinate salaries).

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

| employee_id | employee_name | manager_id | salary | level | sub_count | budget |
|-------------|---------------|------------|--------|-------|-----------|--------|
| 1 | Alice | NULL | 100000 | 1 | 3 | 250000 |
| 2 | Bob   | 1    | 80000  | 2 | 1 | 50000 |
| 3 | Carol | 1    | 90000  | 2 | 0 | 0 |
| 4 | Dave  | 2    | 50000  | 3 | 0 | 0 |

*Explanation*: Alice is the CEO (level 1) with three subordinates (Bob, Carol, Dave) and total budget including sub‑salaries 250 k.

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
