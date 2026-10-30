# 1212. Team Scores in Football Tournament

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/team-scores-in-football-tournament](https://leetcode.com/problems/team-scores-in-football-tournament)
**Companies:** Wayfair
---

## Problem Description
Table: `Teams`

```
+---------------+----------+
| Column Name   | Type     |
+---------------+----------+
| team_id       | int      |
| team_name     | varchar  |
+---------------+----------+
team_id is the column with unique values of this table.
Each row of this table represents a single football team.
```

Table: `Matches`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| match_id      | int     |
| host_team     | int     |
| guest_team    | int     |
| host_goals    | int     |
| guest_goals   | int     |
+---------------+---------+
match_id is the column of unique values of this table.
Each row is a record of a finished match between two different teams.
Teams host_team and guest_team are represented by their IDs in the Teams table (team_id), and they scored host_goals and guest_goals goals, respectively.
```

You would like to compute the scores of all teams after all matches. Points are awarded as follows:

- A team receives **three points** if they win a match (i.e., Scored more goals than the opponent team).
- A team receives **one point** if they draw a match (i.e., Scored the same number of goals as the opponent team).
- A team receives **no points** if they lose a match (i.e., Scored fewer goals than the opponent team).

Write a solution that selects the `team_id`, `team_name` and `num_points` of each team in the tournament after all described matches.

Return the result table ordered by `num_points` **in decreasing order**. In case of a tie, order the records by `team_id` **in increasing order**.

The result format is in the following example.

## Examples
```
Example 1:
  Input:
  Teams table:
  +-----------+--------------+
  | team_id   | team_name    |
  +-----------+--------------+
  | 10        | Leetcode FC  |
  | 20        | NewYork FC   |
  | 30        | Atlanta FC   |
  | 40        | Chicago FC   |
  | 50        | Toronto FC   |
  +-----------+--------------+
  Matches table:
  +------------+--------------+---------------+-------------+--------------+
  | match_id   | host_team    | guest_team    | host_goals  | guest_goals  |
  +------------+--------------+---------------+-------------+--------------+
  | 1          | 10           | 20            | 3           | 0            |
  | 2          | 30           | 10            | 2           | 2            |
  | 3          | 10           | 50            | 5           | 1            |
  | 4          | 20           | 30            | 1           | 0            |
  | 5          | 50           | 30            | 1           | 0            |
  +------------+--------------+---------------+-------------+--------------+
  Output:
  +------------+--------------+---------------+
  | team_id    | team_name    | num_points    |
  +------------+--------------+---------------+
  | 10         | Leetcode FC  | 7             |
  | 20         | NewYork FC   | 3             |
  | 50         | Toronto FC   | 3             |
  | 30         | Atlanta FC   | 1             |
  | 40         | Chicago FC   | 0             |
  +------------+--------------+---------------+
```

## Approach
Iterate through the matches and update a hash map of team → points based on the result. After processing all matches, convert the map to a list of `(team, points)` pairs and sort by points descending then name ascending.

```text
FUNCTION calculateTeamScores(matches, results):
    scores ← MAP default 0
    FOR i FROM 0 TO LENGTH(matches) - 1:
        teamA ← matches[i][0]
        teamB ← matches[i][1]
        result ← results[i]
        IF result == "win":
            scores[teamA] ← scores[teamA] + 3
            scores[teamB] ← scores[teamB] + 0
        ELSE IF result == "loss":
            scores[teamA] ← scores[teamA] + 0
            scores[teamB] ← scores[teamB] + 3
        ELSE: // draw
            scores[teamA] ← scores[teamA] + 1
            scores[teamB] ← scores[teamB] + 1
    // Convert to list and sort
    list ← [(team, pts) FOR team, pts IN scores]
    SORT list BY (-pts, team)   // descending points, then alphabetical
    RETURN [team FOR team, _ IN list]
```

## Walkthrough
| Step | Match | Result | Scores after step |
|------|-------|--------|-------------------|
| 0 | [A,B] | win | A=3, B=0 |
| 1 | [C,A] | draw | A=4, B=0, C=1 |
| End | – | – | Sorted order: A (4), C (1), B (0) |

## Complexity Analysis
- Time: O(m log t) where m is the number of matches and t is the number of distinct teams (sorting step).
- Space: O(t) for the scores map.

## Follow‑Up Questions
1. How would you modify the algorithm to handle a league where a win gives 2 points instead of 3?
2. Can you compute the ranking in a single pass without an explicit sort by using a bucket array?
3. What changes are needed if matches can be replayed and scores need to be updated dynamically?

## Key Takeaway
A simple hash‑map accumulation followed by sorting yields the final team ranking efficiently.
