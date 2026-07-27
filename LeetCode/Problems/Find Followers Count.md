# 1729. Find Followers Count

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-followers-count](https://leetcode.com/problems/find-followers-count)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Tesla

---

## Problem Description

Count the number of followers for each user. Return sorted by user_id.

---

## Approach: SQL GROUP BY ✅

```sql
SELECT user_id, COUNT(follower_id) AS followers_count
FROM Followers
GROUP BY user_id
ORDER BY user_id;
```

---

## Key Takeaway

> **Basic GROUP BY + COUNT aggregation pattern.**
