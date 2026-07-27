# 1917. Leetcodify Friends Recommendations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/leetcodify-friends-recommendations](https://leetcode.com/problems/leetcodify-friends-recommendations)
**Companies:** Spotify

---

## 1. Problem Description

(SQL) Recommend friends: users who listened to ≥ 3 same songs on the same day but are not already friends.

---

## 2. Approach: Self-Join + Anti-Join

```sql
-- Join Listens with itself on same song, same day, different users
-- Group by user pair, filter count ≥ 3
-- Exclude existing friendships with anti-join
```

---

## 3. Key Takeaway

> Self-join on shared activity, aggregate to threshold, anti-join to exclude existing connections. Standard social recommendation SQL pattern.
