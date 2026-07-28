# 1783. Grand Slam Titles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/grand-slam-titles](https://leetcode.com/problems/grand-slam-titles)
**Companies:** Amazon

---

## 1. Problem Description

Count grand slam titles per player across four tournament columns. (SQL problem)

## 2. Examples

| Players Table | Championships Table | Result |
|---|---|---|
| `player_id` | `player_id` | `player_id` `player_name` `grand_slams_count` |
| 1, "Roger" | Wimbledon=1, Fr_open=2, US_open=1, Au_open=0 | Roger 4 |
| 2, "Rafael" | Wimbledon=0, Fr_open=1, US_open=1, Au_open=1 | Rafael 3 |

*Explanation*: Each column represents a tournament win; unpivoting turns them into rows, then grouping counts total titles per player.

## 3. Walkthrough

1. **UNPIVOT** – Convert the four tournament columns into a single column of player IDs using `UNION ALL`.
2. **JOIN** – Match each tournament winner with the `Players` table to get the name.
3. **GROUP BY** – Aggregate by player to count how many rows (titles) each appears in.

Resulting query returns each player with the total number of grand slam titles.

## 4. Approach

**Algorithm**: Use `UNION ALL` to unpivot, then `GROUP BY`.

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

## 5. Complexity Analysis

- **Time**: O(N) where N is total rows processed (players + 4 × championship rows).
- **Space**: O(N) for the intermediate unpivoted result set.

## 6. Follow-Up Questions

- How would you modify the query to list only players with at least three grand slam titles?
- Can you write the solution using a `CROSS APPLY`/`UNPIVOT` operator instead of `UNION ALL`?
- How would you handle ties if you needed to rank players by number of titles?

## Key Takeaway

> `UNION ALL` effectively unpivots multiple columns into rows, enabling simple aggregation with `GROUP BY` to count titles per player.
