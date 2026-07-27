# 1667. Fix Names in a Table

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fix-names-in-a-table](https://leetcode.com/problems/fix-names-in-a-table)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```sql
SELECT user_id, CONCAT(UPPER(LEFT(name, 1)), LOWER(SUBSTRING(name, 2))) AS name
FROM Users
ORDER BY user_id;
```
