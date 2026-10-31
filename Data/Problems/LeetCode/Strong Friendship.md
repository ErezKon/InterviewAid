# 1949. Strong Friendship

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/strong-friendship
**Companies:** Google, Meta
---
## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Friendship`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| user1_id    | int  |
| user2_id    | int  |
+-------------+------+
(user1_id, user2_id) is the primary key (combination of columns with unique values) for this table.
Each row of this table indicates that the users user1_id and user2_id are friends.
Note that user1_id < user2_id.
```

A friendship between a pair of friends `x` and `y` is **strong** if `x` and `y` have **at least three** common friends.

Write a solution to find all the **strong friendships**.

Note that the result table should not contain duplicates with `user1_id < user2_id`.

Return the result table in **any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Friendship table:
+----------+----------+
| user1_id | user2_id |
+----------+----------+
| 1        | 2        |
| 1        | 3        |
| 2        | 3        |
| 1        | 4        |
| 2        | 4        |
| 1        | 5        |
| 2        | 5        |
| 1        | 7        |
| 3        | 7        |
| 1        | 6        |
| 3        | 6        |
| 2        | 6        |
+----------+----------+
Output:
+----------+----------+---------------+
| user1_id | user2_id | common_friend |
+----------+----------+---------------+
| 1        | 2        | 4             |
| 1        | 3        | 3             |
+----------+----------+---------------+
Explanation:
Users 1 and 2 have 4 common friends (3, 4, 5, and 6).
Users 1 and 3 have 3 common friends (2, 6, and 7).
We did not include the friendship of users 2 and 3 because they only have two common friends (1 and 6).
```

## Approach
1. **Make friendships symmetric:** build `f(u, v)` containing every pair in both directions (`UNION ALL` of the table with its columns swapped), so "friends of `x`" is simply `f.v WHERE f.u = x`.
2. **Find common friends:** for each original row `(user1_id, user2_id)` (already `user1_id < user2_id`, so no duplicates), join `f a` on `a.u = user1_id` and `f b` on `b.u = user2_id AND b.v = a.v`. Each joined row is one common friend `a.v`.
3. **Count and filter:** `GROUP BY` the pair, `COUNT(*)` as `common_friend`, keep groups with `HAVING COUNT(*) >= 3`.

```sql
WITH f AS (
    SELECT user1_id AS u, user2_id AS v FROM Friendship
    UNION ALL
    SELECT user2_id AS u, user1_id AS v FROM Friendship
)
SELECT fr.user1_id, fr.user2_id, COUNT(*) AS common_friend
FROM Friendship fr
JOIN f a ON a.u = fr.user1_id
JOIN f b ON b.u = fr.user2_id AND b.v = a.v
GROUP BY fr.user1_id, fr.user2_id
HAVING COUNT(*) >= 3;
```

## Walkthrough
Using Example 1, the symmetric friend lists are:

| user | friends |
|------|---------|
| 1 | 2, 3, 4, 5, 6, 7 |
| 2 | 1, 3, 4, 5, 6 |
| 3 | 1, 2, 6, 7 |
| 4 | 1, 2 |
| 5 | 1, 2 |
| 6 | 1, 2, 3 |
| 7 | 1, 3 |

Joining each friendship row with the intersection of the two friend lists:

| pair | common friends | count | kept? |
|------|----------------|-------|-------|
| (1,2) | 3, 4, 5, 6 | 4 | yes |
| (1,3) | 2, 6, 7 | 3 | yes |
| (2,3) | 1, 6 | 2 | no |
| (1,6), (2,6), (3,6) | 2 each | 2 | no |
| (1,4), (1,5), (1,7), (2,4), (2,5), (3,7) | 1 each | 1 | no |

Result: `(1, 2, 4)` and `(1, 3, 3)`, matching the expected output.

## Complexity Analysis
- **Time:** O(sum over friendships of deg(user1) + deg(user2)) for the self-joins (hash joins on `u`), plus grouping; worst case O(E * D) where D is the max degree.
- **Space:** O(E) for the symmetric CTE plus intermediate join rows.

## Follow-Up Questions
1. How would you list the actual common friends (e.g. with `GROUP_CONCAT`) alongside the count?
2. How would you find strong pairs that are *not* yet friends (friend recommendations)?
3. Which indexes on `Friendship` would speed up the self-joins?

## Key Takeaway
Symmetrize the edge table, then a double self-join on the shared neighbor counts common friends per existing friendship; `HAVING COUNT(*) >= 3` keeps the strong ones.
