# 1917. Leetcodify Friends Recommendations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/leetcodify-friends-recommendations](https://leetcode.com/problems/leetcodify-friends-recommendations)
**Companies:** Spotify

---

## 1. Problem Description

Table: `Listens`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| song_id     | int     |
| day         | date    |
+-------------+---------+
This table may contain duplicates (In other words, there is no primary key for this table in SQL).
Each row of this table indicates that the user user_id listened to the song song_id on the day day.
```

Table: `Friendship`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user1_id      | int     |
| user2_id      | int     |
+---------------+---------+
In SQL,(user1_id, user2_id) is the primary key for this table.
Each row of this table indicates that the users user1_id and user2_id are friends.
Note that user1_id < user2_id.
```

Recommend friends to Leetcodify users. We recommend user `x` to user `y` if:

- Users `x` and `y` are not friends, and
- Users `x` and `y` listened to the same three or more different songs **on the same day**.

Note that friend recommendations are **unidirectional**, meaning if user `x` and user `y` should be recommended to each other, the result table should have both user `x` recommended to user `y` and user `y` recommended to user `x`. Also, note that the result table should not contain duplicates (i.e., user `y` should not be recommended to user `x` multiple times.).

Return the result table in **any order**.

The result format is in the following example.

---

## 2. Examples

```
Example 1:
  Input:
  Listens table:
  +---------+---------+------------+
  | user_id | song_id | day        |
  +---------+---------+------------+
  | 1       | 10      | 2021-03-15 |
  | 1       | 11      | 2021-03-15 |
  | 1       | 12      | 2021-03-15 |
  | 2       | 10      | 2021-03-15 |
  | 2       | 11      | 2021-03-15 |
  | 2       | 12      | 2021-03-15 |
  | 3       | 10      | 2021-03-15 |
  | 3       | 11      | 2021-03-15 |
  | 3       | 12      | 2021-03-15 |
  | 4       | 10      | 2021-03-15 |
  | 4       | 11      | 2021-03-15 |
  | 4       | 13      | 2021-03-15 |
  | 5       | 10      | 2021-03-16 |
  | 5       | 11      | 2021-03-16 |
  | 5       | 12      | 2021-03-16 |
  +---------+---------+------------+
  Friendship table:
  +----------+----------+
  | user1_id | user2_id |
  +----------+----------+
  | 1        | 2        |
  +----------+----------+
  Output:
  +---------+----------------+
  | user_id | recommended_id |
  +---------+----------------+
  | 1       | 3              |
  | 2       | 3              |
  | 3       | 1              |
  | 3       | 2              |
  +---------+----------------+
  Explanation:
  Users 1 and 2 listened to songs 10, 11, and 12 on the same day, but they are already friends.
  Users 1 and 3 listened to songs 10, 11, and 12 on the same day. Since they are not friends, we recommend them to each other.
  Users 1 and 4 did not listen to the same three songs.
  Users 1 and 5 listened to songs 10, 11, and 12, but on different days.

  Similarly, we can see that users 2 and 3 listened to songs 10, 11, and 12 on the same day and are not friends, so we recommend them to each other.
```

---

## 3. Approach: Self-Join + Anti-Join

1. **Self-join `Listens`** on `song_id` and `listen_date` where `user_id` differs to find co-listening events.
2. **Group** by `(user_a, user_b)` and count distinct songs; keep pairs with count ≥ 3.
3. **Anti-join** with `Friends` to exclude existing friendships.
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
| 1 | Self-join `Listens` on same song/date | Generates rows for each co-listening pair |
| 2 | Group & count distinct songs per pair | `(1,3)` has count 3 |
| 3 | Anti-join with `Friends` | Removes `(1,2)` because they are already friends |
| 4 | Output remaining pair | Recommendation `(1,3)` |

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(N²) in worst case for the self-join (where N is number of listen records) | O(N) for intermediate tables |

---

## 6. Follow-Up Questions

1. How would you adapt the query for a sliding time window (e.g., songs listened within the same week)?
2. Can you design an index strategy to improve performance on large datasets?
3. How would you modify the recommendation criteria to require *distinct* songs rather than same-day listens?

---

## Key Takeaway

> Use a self-join on listening events to find co-listening pairs, aggregate to enforce the threshold, and anti-join with the friendship table to produce new friend recommendations.
