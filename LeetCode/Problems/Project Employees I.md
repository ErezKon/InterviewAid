# 1075. Project Employees I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/project-employees-i](https://leetcode.com/problems/project-employees-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

```sql
SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years
FROM Project p
JOIN Employee e ON p.employee_id = e.employee_id
GROUP BY p.project_id;
```
