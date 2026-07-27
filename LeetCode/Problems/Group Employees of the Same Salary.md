# 1875. Group Employees of the Same Salary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/group-employees-of-the-same-salary](https://leetcode.com/problems/group-employees-of-the-same-salary)
**Companies:** Clari

---

## 1. Problem Description

Assign team IDs to employees such that employees with the same salary are in the same team. Exclude salaries that appear only once. (SQL problem)

## 2. Approach: DENSE_RANK on Salary ✅

```sql
SELECT employee_id, name, salary,
       DENSE_RANK() OVER (ORDER BY salary) AS team_id
FROM Employees
WHERE salary IN (
    SELECT salary FROM Employees
    GROUP BY salary HAVING COUNT(*) > 1
)
ORDER BY team_id, employee_id;
```

## Key Takeaway

> Filter to salaries with count > 1, then use `DENSE_RANK()` ordered by salary to assign sequential team IDs.
