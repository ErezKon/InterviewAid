# 1917. Leetcodify Friends Recommendations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/leetcodify-friends-recommendations](https://leetcode.com/problems/leetcodify-friends-recommendations)
**Companies:** Spotify

---

## 1. Problem Description

Given tables `Users`, `Friends(user_id, friend_id)`, and `Listens(user_id, song_id, listen_date)`, recommend potential friends for each user. A recommendation is a user who listened to **at least three** of the same songs on the same day as the target user, and who is not already a friend.

---

## 2. Examples

**Example 1:**
```
Users:      (1, 'Alice'), (2, 'Bob'), (3, 'Carol')
Friends:    (1,2)
Listens:    (1,101,'2023-01-01'), (1,102,'2023-01-01'), (1,103,'2023-01-01'),
            (3,101,'2023-01-01'), (3,102,'2023-01-01'), (3,103,'2023-01-01')
```
Output: Recommend user 3 to user 1 because they share three songs on the same day and are not friends.

---

## 3. Approach: Self‑Join + Anti‑Join

1. **Self‑join `Listens`** on `song_id` and `listen_date` where `user_id` differs to find co‑listening events.
2. **Group** by `(user_a, user_b)` and count distinct songs; keep pairs with count ≥ 3.
3. **Anti‑join** with `Friends` to exclude existing friendships.
4. Return the remaining pairs as recommendations.

```sql
WITH CoListen AS (
    SELECT l1.user_id AS user_a,
           l2.user_id AS user_b,
           l1.song_id,
           l1.listen_date
    FROM Listens l1
    JOIN Listens l2
      ON l1.song_id = l2.song_id
     AND l1.listen_date = l2.listen_date
     AND l1.user_id <> l2.user_id
), PairCount AS (
    SELECT user_a, user_b, COUNT(DISTINCT song_id) AS cnt
    FROM CoListen
    GROUP BY user_a, user_b
    HAVING cnt >= 3
)
SELECT pc.user_a AS user_id, pc.user_b AS recommended_friend
FROM PairCount pc
LEFT JOIN Friends f
  ON (pc.user_a = f.user_id AND pc.user_b = f.friend_id)
   OR (pc.user_a = f.friend_id AND pc.user_b = f.user_id)
WHERE f.user_id IS NULL;
```

---

## 4. Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Self‑join `Listens` on same song/date | Generates rows for each co‑listening pair |
| 2 | Group & count distinct songs per pair | `(1,3)` has count 3 |
| 3 | Anti‑join with `Friends` | Removes `(1,2)` because they are already friends |
| 4 | Output remaining pair | Recommendation `(1,3)` |

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(N²) in worst case for the self‑join (where N is number of listen records) | O(N) for intermediate tables |

---

## 6. Follow‑Up Questions

1. How would you adapt the query for a sliding time window (e.g., songs listened within the same week)?
2. Can you design an index strategy to improve performance on large datasets?
3. How would you modify the recommendation criteria to require *distinct* songs rather than same‑day listens?

---

## Key Takeaway

> Use a self‑join on listening events to find co‑listening pairs, aggregate to enforce the threshold, and anti‑join with the friendship table to produce new friend recommendations.
