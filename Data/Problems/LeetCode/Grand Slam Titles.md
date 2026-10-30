# 1783. Grand Slam Titles

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/grand-slam-titles](https://leetcode.com/problems/grand-slam-titles)
**Companies:** Amazon

---

## 1. Problem Description

Table: `Players`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| player_id      | int     |
| player_name    | varchar |
+----------------+---------+
player_id is the primary key (column with unique values) for this table.
Each row in this table contains the name and the ID of a tennis player.
```

Table: `Championships`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| year          | int     |
| Wimbledon     | int     |
| Fr_open       | int     |
| US_open       | int     |
| Au_open       | int     |
+---------------+---------+
year is the primary key (column with unique values) for this table.
Each row of this table contains the IDs of the players who won one each tennis tournament of the grand slam.
```

Write a solution to report the number of grand slam tournaments won by each player. Do not include the players who did not win any tournament.

Return the result table in **any order**.

The result format is in the following example.

## 2. Examples

```
Example 1:
  Input:
  Players table:
  +-----------+-------------+
  | player_id | player_name |
  +-----------+-------------+
  | 1         | Nadal       |
  | 2         | Federer     |
  | 3         | Novak       |
  +-----------+-------------+
  Championships table:
  +------+-----------+---------+---------+---------+
  | year | Wimbledon | Fr_open | US_open | Au_open |
  +------+-----------+---------+---------+---------+
  | 2018 | 1         | 1       | 1       | 1       |
  | 2019 | 1         | 1       | 2       | 2       |
  | 2020 | 2         | 1       | 2       | 2       |
  +------+-----------+---------+---------+---------+
  Output:
  +-----------+-------------+-------------------+
  | player_id | player_name | grand_slams_count |
  +-----------+-------------+-------------------+
  | 2         | Federer     | 5                 |
  | 1         | Nadal       | 7                 |
  +-----------+-------------+-------------------+
  Explanation:
  Player 1 (Nadal) won 7 titles: Wimbledon (2018, 2019), Fr_open (2018, 2019, 2020), US_open (2018), and Au_open (2018).
  Player 2 (Federer) won 5 titles: Wimbledon (2020), US_open (2019, 2020), and Au_open (2019, 2020).
  Player 3 (Novak) did not win anything, we did not include them in the result table.
```

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
