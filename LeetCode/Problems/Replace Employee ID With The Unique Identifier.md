# 1378. Replace Employee ID With The Unique Identifier

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier](https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Infosys, Meta, Microsoft, Point72, Tcs

---

```sql
SELECT eu.unique_id, e.name
FROM Employees e
LEFT JOIN EmployeeUNI eu ON e.id = eu.id;
```
