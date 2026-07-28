# 1873. Calculate Special Bonus

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-special-bonus](https://leetcode.com/problems/calculate-special-bonus)
**Companies:** Google

---

## 1. Problem Description

Given an `Employees` table, calculate a bonus for each employee: salary if `employee_id` is odd AND name doesn't start with 'M', otherwise 0. *(SQL problem)*

## 2. Examples

**Example 1:**
```sql
Employees
+------------+----------+--------+
| employee_id| name     | salary |
+------------+----------+--------+
| 1          | Alice    | 1000   |
| 2          | Michael  | 1500   |
| 3          | Bob      | 2000   |
+------------+----------+--------+
```
Result:
```
+------------+-------+
| employee_id| bonus |
+------------+-------+
| 1          | 1000 |
| 2          | 0    |
| 3          | 2000 |
+------------+-------+
```
- Employee 1: odd ID and name does not start with M → salary.
- Employee 2: even ID → 0.
- Employee 3: odd ID, name does not start with M → salary.

## 3. Walkthrough

1. Scan each row of `Employees`.
2. Check `employee_id % 2 = 1` (odd) **and** `name NOT LIKE 'M%'`.
3. If both true, output `salary`; else output `0`.
4. Order results by `employee_id`.

## 4. Complexity Analysis

- **Time:** O(n) – one pass over the table.
- **Space:** O(1) – only constant extra storage for the CASE expression.

---

## 2. Approach: CASE Expression — O(n) ✅

```sql
SELECT employee_id,
    CASE
        WHEN employee_id % 2 = 1 AND name NOT LIKE 'M%' THEN salary
        ELSE 0
    END AS bonus
FROM Employees
ORDER BY employee_id;
```

---

## Key Takeaway

> Combine modulo check for odd ID with `NOT LIKE` for name filtering in a single CASE expression.
