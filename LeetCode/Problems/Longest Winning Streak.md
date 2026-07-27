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

## 3. Key Takeaway

> Classic "gaps and islands" SQL problem. Use difference of row numbers to identify consecutive streaks, then aggregate.
