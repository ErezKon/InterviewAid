# 1517. Find Users With Valid E-Mails

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-users-with-valid-e-mails](https://leetcode.com/problems/find-users-with-valid-e-mails)
**Companies:** Amazon, Bloomberg, Google, Meta

---

```sql
SELECT * FROM Users
WHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9._-]*@leetcode\.com$';
```
