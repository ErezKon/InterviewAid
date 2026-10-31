# 1194. Tournament Winners

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/tournament-winners](https://leetcode.com/problems/tournament-winners)
**Companies:** Wayfair

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Players`

```
+-------------+-------+
| Column Name | Type  |
+-------------+-------+
| player_id   | int   |
| group_id    | int   |
+-------------+-------+
player_id is the primary key (column with unique values) of this table.
Each row of this table indicates the group of each player.
```

Table: `Matches`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| match_id      | int     |
| first_player  | int     |
| second_player | int     |
| first_score   | int     |
| second_score  | int     |
+---------------+---------+
match_id is the primary key (column with unique values) of this table.
Each row is a record of a match, first_player and second_player contain the player_id of each match.
first_score and second_score contain the number of points of the first_player and second_player respectively.
You may assume that, in each match, players belong to the same group.
```

The winner in each group is the player who scored the maximum total points within the group. In the case of a tie, the **lowest** `player_id` wins.

Write a solution to find the winner in each group.

Return the result table in **any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Players table:
+-----------+------------+
| player_id | group_id   |
+-----------+------------+
| 15        | 1          |
| 25        | 1          |
| 30        | 1          |
| 45        | 1          |
| 10        | 2          |
| 35        | 2          |
| 50        | 2          |
| 20        | 3          |
| 40        | 3          |
+-----------+------------+
Matches table:
+------------+--------------+---------------+-------------+--------------+
| match_id   | first_player | second_player | first_score | second_score |
+------------+--------------+---------------+-------------+--------------+
| 1          | 15           | 45            | 3           | 0            |
| 2          | 30           | 25            | 1           | 2            |
| 3          | 30           | 15            | 2           | 0            |
| 4          | 40           | 20            | 5           | 2            |
| 5          | 35           | 50            | 1           | 1            |
+------------+--------------+---------------+-------------+--------------+
Output:
+-----------+------------+
| group_id  | player_id  |
+-----------+------------+
| 1         | 15         |
| 2         | 35         |
| 3         | 40         |
+-----------+------------+
```

## Approach
Each player can appear as `first_player` or `second_player`, so first flatten the `Matches` table into one `(player_id, score)` row per player per match with `UNION ALL`. Sum the points per player, attach the group via `Players`, then rank players inside each group by total points descending and `player_id` ascending (tie-break). The row with rank 1 in each group is the winner.

**SQL**
```sql
WITH scores AS (
    SELECT first_player AS player_id, first_score AS score FROM Matches
    UNION ALL
    SELECT second_player, second_score FROM Matches
),
totals AS (
    SELECT p.group_id, p.player_id, SUM(s.score) AS total
    FROM Players p
    JOIN scores s ON s.player_id = p.player_id
    GROUP BY p.group_id, p.player_id
),
ranked AS (
    SELECT group_id, player_id,
           ROW_NUMBER() OVER (PARTITION BY group_id
                              ORDER BY total DESC, player_id ASC) AS rn
    FROM totals
)
SELECT group_id, player_id
FROM ranked
WHERE rn = 1;
```

## Walkthrough
Example 1:
1. Flatten matches into per-player scores: 15: 3 + 0 = 3, 45: 0, 30: 1 + 2 = 3, 25: 2, 40: 5, 20: 2, 35: 1, 50: 1.
2. Totals per group:

| group_id | player totals |
|----------|---------------|
| 1 | 15 -> 3, 30 -> 3, 25 -> 2, 45 -> 0 |
| 2 | 35 -> 1, 50 -> 1 |
| 3 | 40 -> 5, 20 -> 2 |

3. Rank by `total DESC, player_id ASC`: group 1 tie (15 vs 30, both 3) -> 15 wins (lower id); group 2 tie (35 vs 50) -> 35; group 3 -> 40.
4. Output: `(1, 15), (2, 35), (3, 40)` - matches the expected result.

## Complexity Analysis
- Time: O(M + P log P) - one pass over the matches to flatten and aggregate, plus sorting inside each group partition for the ranking (M = matches, P = players).
- Space: O(M + P) for the intermediate CTE results.

## Follow-Up Questions
1. How would you write this without window functions (e.g. with a correlated subquery or `GROUP BY` + `MIN`)?
2. How would you also return players who never played (total 0) if a whole group had no matches?
3. How would you return all tied players instead of only the lowest `player_id`?

## Key Takeaway
Unpivot symmetric columns (`first_*` / `second_*`) with `UNION ALL`, aggregate, and then use `ROW_NUMBER()` with a compound `ORDER BY` to pick one winner per group including the tie-break rule.
