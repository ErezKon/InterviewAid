# 627. Swap Sex of Employees

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/swap-salary](https://leetcode.com/problems/swap-salary)
**Companies:** Amazon, Bloomberg, Meta, Microsoft

---

```sql
UPDATE Salary SET sex = CASE WHEN sex = 'm' THEN 'f' ELSE 'm' END;
```
