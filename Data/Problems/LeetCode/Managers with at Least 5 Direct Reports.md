# 570. Managers with at Least 5 Direct Reports

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/managers-with-at-least-5-direct-reports](https://leetcode.com/problems/managers-with-at-least-5-direct-reports)
**Companies:** Amazon, Bloomberg, Deloitte, Google, Meta, Microsoft, Tcs, Zs Associates

---

## 1. Problem Description (SQL)

Table: `Employee`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| department  | varchar |
| managerId   | int     |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table indicates the name of an employee, their department, and the id of their manager.
If managerId is null, then the employee does not have a manager.
No employee will be the manager of themself.
```

Write a solution to find managers with at least **five direct reports**.

Return the result table in **any order**.

The result format is in the following example.

---

## 2. Approach: SQL — Self-Join + GROUP BY ✅

```sql
SELECT e.name
FROM Employee e
JOIN (
    SELECT managerId
    FROM Employee
    WHERE managerId IS NOT NULL
    GROUP BY managerId
    HAVING COUNT(*) >= 5
) m ON e.id = m.managerId;
```

---

## 3. Examples

```
Example 1:
  Input:
  Employee table:
  +-----+-------+------------+-----------+
  | id  | name  | department | managerId |
  +-----+-------+------------+-----------+
  | 101 | John  | A          | null      |
  | 102 | Dan   | A          | 101       |
  | 103 | James | A          | 101       |
  | 104 | Amy   | A          | 101       |
  | 105 | Anne  | A          | 101       |
  | 106 | Ron   | B          | 101       |
  +-----+-------+------------+-----------+
  Output:
  +------+
  | name |
  +------+
  | John |
  +------+
```

---

## 4. Walkthrough

1. Group employees by `managerId` and count direct reports.
2. Filter groups with `COUNT(*) >= 5`.
3. Join the filtered manager IDs back to the `Employee` table to retrieve manager names.

---

## 5. Complexity Analysis

- **Time:** O(N) – single scan of the `Employee` table for grouping and joining.
- **Space:** O(M) – space for grouping by distinct manager IDs (M ≤ N).

---

## 6. Follow-Up Questions

- How would you modify the query to return managers with at least *k* direct reports, where *k* is a parameter?
- How to include managers who have exactly *k* reports and also list the names of those reports?

---

## 3. Key Takeaway

> Group by managerId, filter with HAVING ≥ 5, then join back to get the manager's name.
