# 177. Nth Highest Salary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/nth-highest-salary](https://leetcode.com/problems/nth-highest-salary)
**Companies:** Accenture, Amazon, Atlassian, Bloomberg, Deloitte, Google, Meta, Microsoft, Zs Associates

---

```sql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
    SET N = N - 1;
    RETURN (
        SELECT DISTINCT salary FROM Employee
        ORDER BY salary DESC
        LIMIT 1 OFFSET N
    );
END
```
