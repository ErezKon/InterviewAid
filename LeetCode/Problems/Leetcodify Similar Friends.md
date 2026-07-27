# 1919. Leetcodify Similar Friends

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/leetcodify-similar-friends](https://leetcode.com/problems/leetcodify-similar-friends)
**Companies:** Spotify

---

## 1. Problem Description

(SQL) Find pairs of friends who listened to ≥ 3 same distinct songs.

---

## 2. Approach: Join Friends with Listens

```sql
-- Join Friendship with Listens for both users
-- Match on same song
-- Group by friend pair, count distinct songs ≥ 3
```

---

## 3. Key Takeaway

> Join friendship pairs with their listening history, match on shared songs, count distinct matches ≥ 3.
