# 2173. Longest Winning Streak

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-winning-streak](https://leetcode.com/problems/longest-winning-streak)
**Companies:** Amazon

---

## 1. Problem Description (SQL)

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Matches`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| player_id   | int  |
| match_day   | date |
| result      | enum |
+-------------+------+
(player_id, match_day) is the primary key (combination of columns with unique values) for this table.
Each row of this table contains the ID of a player, the day of the match they played, and the result of that match.
The result column is an ENUM (category) type of ('Win', 'Draw', 'Lose').
```

The **winning streak** of a player is the number of consecutive wins uninterrupted by draws or losses.

Write a solution to count the longest winning streak for each player.

Return the result table in **any order**.

The result format is in the following example.

---

## 2. Approach: SQL — Window Functions ✅

```sql
-- Assign row numbers, subtract to create groups
-- Consecutive wins with same player form groups
-- Count group sizes, take max per player
WITH ranked AS (
  SELECT player_id, result,
    ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY match_day) -
    ROW_NUMBER() OVER (PARTITION BY player_id, result ORDER BY match_day) AS grp
  FROM Matches
)
SELECT player_id, COALESCE(MAX(CASE WHEN result = 'Win' THEN cnt END), 0) AS longest_streak
FROM (SELECT player_id, result, COUNT(*) AS cnt FROM ranked GROUP BY player_id, result, grp) t
GROUP BY player_id;
```

---

## 3. Examples

**Example 1:**
```
Input:
Matches table:
+-----------+------------+--------+
| player_id | match_day  | result |
+-----------+------------+--------+
| 1         | 2022-01-17 | Win    |
| 1         | 2022-01-18 | Win    |
| 1         | 2022-01-25 | Win    |
| 1         | 2022-01-31 | Draw   |
| 1         | 2022-02-08 | Win    |
| 2         | 2022-02-06 | Lose   |
| 2         | 2022-02-08 | Lose   |
| 3         | 2022-03-30 | Win    |
+-----------+------------+--------+
Output:
+-----------+----------------+
| player_id | longest_streak |
+-----------+----------------+
| 1         | 3              |
| 2         | 0              |
| 3         | 1              |
+-----------+----------------+
Explanation:
Player 1:
From 2022-01-17 to 2022-01-25, player 1 won 3 consecutive matches.
On 2022-01-31, player 1 had a draw.
On 2022-02-08, player 1 won a match.
The longest winning streak was 3 matches.
Player 2:
From 2022-02-06 to 2022-02-08, player 2 lost 2 consecutive matches.
The longest winning streak was 0 matches.
Player 3:
On 2022-03-30, player 3 won a match.
The longest winning streak was 1 match.
Follow up: If we are interested in calculating the longest streak without losing (i.e., win or draw), how will your solution change?
```

---

## 4. Walkthrough

| Step | Operation | row_number (player) | row_number (player+result) | grp (diff) | Current group size |
|------|-----------|---------------------|----------------------------|------------|--------------------|
| 1    | row1 Win  | 1                   | 1                          | 0          | start group 0 (Win) |
| 2    | row2 Win  | 2                   | 2                          | 0          | group 0 size 2 |
| 3    | row3 Lose | 3                   | 1                          | 2          | new group 2 (Lose) |
| 4    | row4 Win  | 4                   | 3                          | 1          | new group 1 (Win) |

The CTE groups rows with the same `grp` value; counting rows per group yields streak lengths. The outer query picks the maximum `cnt` where `result='Win'` for each player.

---

## 5. Complexity Analysis

- **Time:** The query scans the `Matches` table once and performs window functions → O(N) where N is the number of rows.
- **Space:** Stores a few additional columns (`row_number`s, `grp`) per row → O(N).

---

## 6. Follow-Up Questions

1. How would you modify the query to return the start and end dates of the longest streak?
2. Can you compute the longest streak for each player using only standard aggregation (no window functions)?
3. How would you handle ties when multiple streaks share the same maximum length?

---

## Key Takeaway

Use the “gaps‑and‑islands” technique: subtract two row numbers to create a constant group identifier for consecutive rows, then aggregate within each group to find the longest win streak.
