# 1783. Grand Slam Titles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/grand-slam-titles](https://leetcode.com/problems/grand-slam-titles)
**Companies:** Amazon

---

## 1. Problem Description

Count grand slam titles per player across four tournament columns. (SQL problem)

## 2. Approach: UNPIVOT + GROUP BY ✅

```sql
SELECT p.player_id, p.player_name, COUNT(*) AS grand_slams_count
FROM Players p
JOIN (
    SELECT Wimbledon AS player_id FROM Championships
    UNION ALL SELECT Fr_open FROM Championships
    UNION ALL SELECT US_open FROM Championships
    UNION ALL SELECT Au_open FROM Championships
) c ON p.player_id = c.player_id
GROUP BY p.player_id, p.player_name;
```

## Key Takeaway

> UNION ALL to unpivot the four tournament columns into rows, then GROUP BY player to count titles.
