# 569. Median Employee Salary

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a table `Employee(id, company, salary)`, find the **median salary** for each company. If there are an even number of employees, return both middle values.

---

## Examples

**Example:**
```
Input:
| id | company | salary |
|----|---------|--------|
| 1  | A       | 2341   |
| 2  | A       | 341    |
| 3  | A       | 15     |
| 4  | A       | 15314  |
| 5  | A       | 451    |
| 6  | A       | 513    |
| 7  | B       | 15     |
| 8  | B       | 13     |
| 9  | B       | 1154   |
| 10 | B       | 1345   |
| 11 | B       | 1221   |
| 12 | B       | 234    |

Output: rows where employee's salary is the median for their company.
```

---

## Key Insight

> Use **window functions** to rank salaries within each company. The median is the row(s) where the rank equals the middle position: `FLOOR((COUNT+1)/2)` and `CEIL((COUNT+1)/2)`.

---

## Approach

```sql
SELECT id, company, salary
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY company ORDER BY salary) AS rn,
           COUNT(*) OVER (PARTITION BY company) AS cnt
    FROM Employee
) t
WHERE rn IN (FLOOR((cnt + 1) / 2.0), CEIL((cnt + 1) / 2.0))
```

**How it works:**
1. `ROW_NUMBER()` ranks salaries within each company
2. `COUNT(*)` gives total employees per company
3. Filter to middle rank(s): for odd count, `FLOOR = CEIL = middle`; for even count, both middle rows are selected

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Window function | **O(n log n)** per group | **O(n)** |

---

## Key Takeaway

> **Window functions + FLOOR/CEIL of middle rank** elegantly find the median in SQL without self-joins or subqueries.

---
