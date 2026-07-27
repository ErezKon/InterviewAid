# 1951. All the Pairs With the Maximum Number of Common Followers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/all-the-pairs-with-the-maximum-number-of-common-followers](https://leetcode.com/problems/all-the-pairs-with-the-maximum-number-of-common-followers)
**Companies:** Lime

---

## 1. Problem Description

**SQL Problem.** Given a `Relations` table (`user_id`, `follower_id`), find all pairs of users who share the **maximum** number of common followers.

---

## 2. Approach: Self-Join + Aggregation ✅

```sql
WITH common AS (
    SELECT r1.user_id AS user1_id, r2.user_id AS user2_id,
           COUNT(*) AS common_count
    FROM Relations r1
    JOIN Relations r2 ON r1.follower_id = r2.follower_id AND r1.user_id < r2.user_id
    GROUP BY r1.user_id, r2.user_id
)
SELECT user1_id, user2_id
FROM common
WHERE common_count = (SELECT MAX(common_count) FROM common);
```

---

## Key Takeaway

> Self-join on follower_id to find shared followers. Use `user1 < user2` to avoid duplicate pairs. Filter for maximum count with a subquery.
