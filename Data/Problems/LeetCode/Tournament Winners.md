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
Model the tournament as a directed graph where an edge `u → v` means `u` defeated `v`. A player can be a winner if they are not *definitely* beaten by another player via a directed path. Compute the transitive closure (or use Floyd‑Warshall / BFS from each node) to find which players are reachable from each other. Any player that is not reachable from any other player is a candidate winner.

**Pseudocode**
```text
FUNCTION tournamentWinners(n, matches):
    SET adj ← LIST of n empty lists
    FOR each [u, v] IN matches:
        APPEND v TO adj[u]
    // compute reachability using BFS from each node
    SET canBeat ← MATRIX n×n initialized FALSE
    FOR i ← 1 TO n:
        CALL bfs(i, adj, canBeat[i])
    SET result ← []
    FOR i ← 1 TO n:
        SET beatenByOther ← FALSE
        FOR j ← 1 TO n:
            IF i ≠ j AND canBeat[j][i] = TRUE:
                SET beatenByOther ← TRUE
                BREAK
        IF NOT beatenByOther:
            APPEND i TO result
    RETURN result

FUNCTION bfs(start, adj, row):
    SET queue ← [start]
    SET visited ← SET containing start
    WHILE queue NOT EMPTY:
        SET node ← POP_FRONT(queue)
        FOR each neighbor IN adj[node]:
            IF neighbor NOT IN visited:
                SET visited ADD neighbor
                SET row[neighbor] ← TRUE
                PUSH_BACK(queue, neighbor)
```

## Walkthrough
Consider `n = 3, matches = [[1,2],[2,3]]`.
1. Build adjacency: 1→2, 2→3.
2. BFS from 1 reaches {2,3}; from 2 reaches {3}; from 3 reaches {}.
3. Player 1 is not reachable from any other player → candidate.
4. Player 2 is not reachable from any other player (only reachable from 1) → candidate.
5. Player 3 is reachable from 1 and 2 → not a candidate.
Result `[1,2]`.

## Complexity Analysis
- Time: O(n · (m + n)) where `m` is number of matches (BFS from each node). For dense graphs Floyd‑Warshall O(n³) is also possible.
- Space: O(n²) for the reachability matrix and O(n + m) for adjacency.

## Follow-Up Questions
1. How would you improve the algorithm for very large `n` where O(n²) space is prohibitive?
2. Can the problem be solved using topological ordering without explicit reachability matrix?
3. How would you handle ties where multiple players have the same maximum win count?

## Key Takeaway
A player can be a possible tournament winner iff no other player can reach (defeat) them through a directed path; computing reachability reveals all such candidates.
