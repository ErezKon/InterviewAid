# 1729. Find Followers Count

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-followers-count](https://leetcode.com/problems/find-followers-count)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Tesla

---

## Problem Description

Count the number of followers for each user. Return sorted by user_id.

---

## Examples

**Example 1:**
```
Followers Table:
+----------+------------+
| user_id  | follower_id|
+----------+------------+
| 1        | 2          |
| 1        | 3          |
| 2        | 3          |
+----------+------------+
```
**Output:**
```
+----------+-----------------+
| user_id  | followers_count |
+----------+-----------------+
| 1        | 2               |
| 2        | 1               |
+----------+-----------------+
```
Explanation: User 1 has two followers (2 and 3), user 2 has one follower (3).

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
