# 1050. Actors and Directors Who Cooperated At Least Three Times

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/actors-and-directors-who-cooperated-at-least-three-times](https://leetcode.com/problems/actors-and-directors-who-cooperated-at-least-three-times)
**Companies:** Amazon, Google, Microsoft

---

## Problem Description
You are given a table `ActorDirector` with two columns:
- `actor_id` – the ID of an actor.
- `director_id` – the ID of a director.
Each row represents a collaboration between the actor and the director on a movie.

Return all pairs `(actor_id, director_id)` where the actor and director have worked together **at least three times**. The result can be in any order.

## Examples
| actor_id | director_id |
|----------|-------------|
| 1        | 1 |
| 1        | 2 |
| 1        | 1 |
| 1        | 1 |
| 2        | 2 |
| 2        | 2 |
| 2        | 2 |
| 3        | 3 |

**Output:** `[(1,1), (2,2)]`

Explanation: Actor 1 and Director 1 appear three times, and Actor 2 and Director 2 also appear three times. The pair (3,3) appears only once.

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
