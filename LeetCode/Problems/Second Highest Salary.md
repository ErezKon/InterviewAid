# 176. Second Highest Salary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/second-highest-salary](https://leetcode.com/problems/second-highest-salary)
**Companies:** Accenture, Amazon, Apple, Barclays, Bloomberg, Capgemini, Cognizant, Deloitte, Google, Hcl, Infosys, Lti, Meesho, Meta, Microsoft, Oracle, Tcs, Zs Associates

---

## Problem Description

Return the **second highest** distinct salary from the `Employee` table. If none exists, return `null`.

---

## SQL Solution ✅

```sql
SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);
```

Alternative with DENSE_RANK:
```sql
SELECT salary AS SecondHighestSalary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM Employee
) t WHERE rnk = 2
LIMIT 1;
```

Returns NULL if no second highest exists.
