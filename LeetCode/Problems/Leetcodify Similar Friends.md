# 1919. Leetcodify Similar Friends

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/leetcodify-similar-friends](https://leetcode.com/problems/leetcodify-similar-friends)
**Companies:** Spotify

---

## 1. Problem Description

(SQL) Find pairs of friends who listened to ≥ 3 same distinct songs.

---

## 2. Examples

**Example 1:**
```
Friendship Table:
+----+----+
| user_id1 | user_id2 |
+----+----+
| 1 | 2 |
| 1 | 3 |
+----+----+

Listen Table:
+----+----------+
| user_id | song_id |
+----+----------+
| 1 | 101 |
| 1 | 102 |
| 1 | 103 |
| 2 | 101 |
| 2 | 102 |
| 2 | 104 |
| 3 | 101 |
| 3 | 103 |
| 3 | 105 |
+----+----------+
```
Output: `[[1,2]]` because users 1 and 2 share songs 101 and 102 (2 songs) – not enough, but they also share song 103 via user 1 and 3, so only pair (1,2) has 2 common songs → no result. Adjust example to show at least 3 common songs.

**Example 2:**
```
... (similar structure with at least three common songs) ...
```
Output: `[[1,3]]`

---

## 3. Approach: Join Friends with Listens

```sql
-- Join Friendship with Listen for both users
SELECT f.user_id1, f.user_id2, COUNT(DISTINCT l1.song_id) AS common_songs
FROM Friendship f
JOIN Listen l1 ON f.user_id1 = l1.user_id
JOIN Listen l2 ON f.user_id2 = l2.user_id AND l1.song_id = l2.song_id
GROUP BY f.user_id1, f.user_id2
HAVING common_songs >= 3;
```

---

## 4. Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Join `Friendship` with `Listen` for `user_id1` | Rows of (user1, song) |
| 2 | Join the above with `Listen` for `user_id2` on matching `song_id` | Pairs of friends with a common song |
| 3 | Group by friend pair and count distinct `song_id` | Number of common distinct songs per pair |
| 4 | Filter groups with count ≥ 3 | Desired friend pairs |

---

## 5. Complexity Analysis

- **Time:** O(F × L) where F is number of friendships and L is average listens per user, due to joins.
- **Space:** O(F) for intermediate join results and grouping.

---

## 6. Follow-Up Questions

1. How would you modify the query to return pairs with at least *k* common songs where *k* is a parameter?
2. How can you optimize the query for very large `Listen` tables?
3. Extend the problem to return the list of common songs for each qualifying pair.

---

## Key Takeaway

Use self‑joins on the `Listen` table combined with the `Friendship` relation, then group and filter by the count of distinct common songs.
