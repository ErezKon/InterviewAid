# 579. Find Cumulative Salary of an Employee

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-cumulative-salary-of-an-employee](https://leetcode.com/problems/find-cumulative-salary-of-an-employee)
**Companies:** Amazon

---

## Problem Description

Get each employee's cumulative salary over a 3-month window (current + previous 2 months), excluding the most recent month for each employee.

---

## Examples

**Example 1:**
```
Employee Table:
+----+-------+--------+
| id | month | salary |
+----+-------+--------+
| 1  |   1   |  100   |
| 1  |   2   |  150   |
| 1  |   3   |  200   |
| 1  |   4   |  250   |
+----+-------+--------+
```
Result: `[(1, 2, 250), (1, 3, 350)]` – for month 2 we sum months 0‑2 (only month 1 exists), for month 3 we sum months 1‑3.

**Example 2:**
```
Employee Table:
+----+-------+--------+
| id | month | salary |
+----+-------+--------+
| 2  |   1   |   80   |
| 2  |   2   |   90   |
| 2  |   3   |  100   |
+----+-------+--------+
```
Result: `[(2, 2, 170)]` – month 2 includes months 0‑2 (only months 1 and 2 exist).

---

## Walkthrough

| Step | Action |
|------|--------|
| 1 | For each row `e1` (employee, month) select rows `e2` with the same `id` where `e2.month` is between `e1.month‑2` and `e1.month`. |
| 2 | Sum `e2.salary` to obtain the rolling 3‑month total. |
| 3 | Exclude the most recent month by ensuring `e1.month` is less than the employee’s maximum month. |
| 4 | Order results by `id` and `month` descending. |

---

## Approach: Self‑Join or Window Function ✅

```text
SELECT e1.id, e1.month,
       (SELECT SUM(e2.salary) FROM Employee e2
        WHERE e2.id = e1.id AND e2.month BETWEEN e1.month - 2 AND e1.month) AS salary
FROM Employee e1
WHERE e1.month < (SELECT MAX(month) FROM Employee WHERE id = e1.id)
ORDER BY id, month DESC;
```

---

## Complexity Analysis

- **Time:** O(N log N) if the database uses an index on `(id, month)`; otherwise a full table scan for each self‑join leads to O(N²).
- **Space:** O(1) additional space beyond the result set; the query works in‑place.

---

## Follow‑Up Questions

1. How would you modify the query to compute a 6‑month rolling sum?
2. How can you return the cumulative salary for each employee in a single row using window functions?
3. What indexes would you create to optimise the self‑join version?

---

## Key Takeaway

> **3‑month rolling sum via self‑join or window function. Exclude most recent month per employee using a subquery filter.**