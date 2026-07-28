# 2173. Longest Winning Streak

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-winning-streak](https://leetcode.com/problems/longest-winning-streak)
**Companies:** Amazon

---

## 1. Problem Description (SQL)

Find the longest winning streak for each player from a matches table.

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
Matches table:
+-----------+----------+-----------+
| player_id | result   | match_day |
+-----------+----------+-----------+
| 1         | Win      | 2023-01-01|
| 1         | Win      | 2023-01-02|
| 1         | Lose     | 2023-01-03|
| 1         | Win      | 2023-01-04|
| 2         | Lose     | 2023-01-01|
| 2         | Lose     | 2023-01-02|
+-----------+----------+-----------+
```
Result:
```
+-----------+----------------+
| player_id | longest_streak |
+-----------+----------------+
| 1         | 2              |
| 2         | 0              |
+-----------+----------------+
```
**Explanation:** Player 1 has a streak of two consecutive wins, then a loss, then a single win. The longest streak is 2.

**Example 2:**
```
Matches:
+-----------+----------+-----------+
| player_id | result   | match_day |
+-----------+----------+-----------+
| 3         | Win      | d1        |
| 3         | Win      | d2        |
| 3         | Win      | d3        |
| 3         | Win      | d4        |
+-----------+----------+-----------+
```
Result: longest_streak = 4 for player 3.

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
