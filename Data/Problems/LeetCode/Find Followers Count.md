# 1729. Find Followers Count

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-followers-count](https://leetcode.com/problems/find-followers-count)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Tesla

---

## Problem Description

Table: `Followers`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| user_id     | int  |
| follower_id | int  |
+-------------+------+
(user_id, follower_id) is the primary key (combination of columns with unique values) for this table.
This table contains the IDs of a user and a follower in a social media app where the follower follows the user.
```

Write a solution that will, for each user, return the number of followers.

Return the result table ordered by `user_id` in ascending order.

The result format is in the following example.

---

## Examples

```
Example 1:
  Input:
  Followers table:
  +---------+-------------+
  | user_id | follower_id |
  +---------+-------------+
  | 0       | 1           |
  | 1       | 0           |
  | 2       | 0           |
  | 2       | 1           |
  +---------+-------------+
  Output:
  +---------+----------------+
  | user_id | followers_count|
  +---------+----------------+
  | 0       | 1              |
  | 1       | 1              |
  | 2       | 2              |
  +---------+----------------+
  Explanation:
  The followers of 0 are {1}
  The followers of 1 are {0}
  The followers of 2 are {0,1}
```

---

## Approach: SQL GROUP BY ✅

```sql
SELECT user_id, COUNT(follower_id) AS followers_count
FROM Followers
GROUP BY user_id
ORDER BY user_id;
```

---

## Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | GROUP BY `user_id` | Rows are grouped per user.
| 2 | COUNT(`follower_id`) | Counts followers in each group.
| 3 | ORDER BY `user_id` | Sorts output ascending.

---

## Complexity Analysis

- **Time:** O(N) – each row is processed once by the database engine.
- **Space:** O(U) – additional space for `U` distinct users.

---

## Follow-Up Questions

- How would you handle duplicate follower entries?
- How to extend the query to include users with zero followers?
- How to compute the top‑k users with most followers?

---

## Key Takeaway

> **Basic GROUP BY + COUNT aggregation pattern.**
