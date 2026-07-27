# 1633. Percentage of Users Attended a Contest

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/percentage-of-users-attended-a-contest](https://leetcode.com/problems/percentage-of-users-attended-a-contest)
**Companies:** Amazon, Bloomberg, Fortinet, Google, Meta, Microsoft, Oracle

---

```sql
SELECT contest_id,
    ROUND(100.0 * COUNT(DISTINCT user_id) / (SELECT COUNT(*) FROM Users), 2) AS percentage
FROM Register
GROUP BY contest_id
ORDER BY percentage DESC, contest_id;
```
