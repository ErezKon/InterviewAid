# 1050. Actors and Directors Who Cooperated At Least Three Times

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/actors-and-directors-who-cooperated-at-least-three-times](https://leetcode.com/problems/actors-and-directors-who-cooperated-at-least-three-times)
**Companies:** Amazon, Google, Microsoft

---

## Problem Description
Table: `ActorDirector`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| actor_id    | int     |
| director_id | int     |
| timestamp   | int     |
+-------------+---------+
timestamp is the primary key (column with unique values) for this table.
```

Write a solution to find all the pairs `(actor_id, director_id)` where the actor has cooperated with the director at least three times.

Return the result table in **any order**.

## Examples
```
Example 1:
  Input:
  ActorDirector table:
  +-------------+-------------+-------------+
  | actor_id    | director_id | timestamp   |
  +-------------+-------------+-------------+
  | 1           | 1           | 0           |
  | 1           | 1           | 1           |
  | 1           | 1           | 2           |
  | 1           | 2           | 3           |
  | 1           | 2           | 4           |
  | 2           | 1           | 5           |
  | 2           | 1           | 6           |
  +-------------+-------------+-------------+
  Output:
  +-------------+-------------+
  | actor_id    | director_id |
  +-------------+-------------+
  | 1           | 1           |
  +-------------+-------------+
  Explanation: The only pair is (1, 1) where they cooperated exactly 3 times.
```

## Approach
The query groups rows by `actor_id` and `director_id` and keeps only those groups whose count is ≥ 3.

### SQL Query
```sql
SELECT actor_id, director_id
FROM ActorDirector
GROUP BY actor_id, director_id
HAVING COUNT(*) >= 3;
```

## Walkthrough
1. `GROUP BY` creates groups for each unique `(actor_id, director_id)` pair.
2. `COUNT(*)` counts how many times each pair appears.
3. `HAVING COUNT(*) >= 3` filters out groups with fewer than three collaborations.
4. The `SELECT` clause returns the qualifying pairs.

## Complexity Analysis
- **Time Complexity:** O(N) – the database scans each row once.
- **Space Complexity:** O(G) – where G is the number of distinct actor‑director pairs that satisfy the condition (output size).

## Follow‑Up Questions
- How would you modify the query to also return the number of collaborations for each qualifying pair?
- How can you index the table to make this query faster on large datasets?
- Extend the problem to find pairs that collaborated **exactly** *k* times, where *k* is a parameter.

## Key Takeaway
A simple `GROUP BY … HAVING COUNT(*) >= 3` pattern efficiently extracts actor‑director pairs with at least three collaborations.
