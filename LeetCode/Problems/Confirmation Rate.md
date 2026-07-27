# 1934. Confirmation Rate

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/confirmation-rate](https://leetcode.com/problems/confirmation-rate)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```sql
SELECT s.user_id,
    ROUND(COALESCE(AVG(CASE WHEN c.action = 'confirmed' THEN 1 ELSE 0 END), 0), 2) AS confirmation_rate
FROM Signups s
LEFT JOIN Confirmations c ON s.user_id = c.user_id
GROUP BY s.user_id;
```
