# 1633. Percentage of Users Attended a Contest

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/percentage-of-users-attended-a-contest](https://leetcode.com/problems/percentage-of-users-attended-a-contest)
**Companies:** Amazon, Bloomberg, Fortinet, Google, Meta, Microsoft, Oracle

---

## Problem Description
Table: `Users`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| user_name   | varchar |
+-------------+---------+
user_id is the primary key (column with unique values) for this table.
Each row of this table contains the name and the id of a user.
```

Table: `Register`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| contest_id  | int     |
| user_id     | int     |
+-------------+---------+
(contest_id, user_id) is the primary key (combination of columns with unique values) for this table.
Each row of this table contains the id of a user and the contest they registered into.
```

Write a solution to find the percentage of the users registered in each contest rounded to **two decimals**.

Return the result table ordered by `percentage` in **descending order**. In case of a tie, order it by `contest_id` in **ascending order**.

## Examples

```
Example 1:
  Input:
  Users table:
  +---------+-----------+
  | user_id | user_name |
  +---------+-----------+
  | 6       | Alice     |
  | 2       | Bob       |
  | 7       | Alex      |
  +---------+-----------+
  Register table:
  +------------+---------+
  | contest_id | user_id |
  +------------+---------+
  | 215        | 6       |
  | 209        | 2       |
  | 208        | 2       |
  | 210        | 6       |
  | 208        | 6       |
  | 209        | 7       |
  | 209        | 6       |
  | 215        | 7       |
  | 208        | 7       |
  | 210        | 2       |
  | 207        | 2       |
  | 210        | 7       |
  +------------+---------+
  Output:
  +------------+------------+
  | contest_id | percentage |
  +------------+------------+
  | 208        | 100.0      |
  | 209        | 100.0      |
  | 210        | 100.0      |
  | 215        | 66.67      |
  | 207        | 33.33      |
  +------------+------------+
  Explanation:
  All the users registered in contests 208, 209, and 210. The percentage is 100% and we sort them in the answer table by contest_id in ascending order.
  Alice and Alex registered in contest 215 and the percentage is ((2/3) * 100) = 66.67%
  Bob registered in contest 207 and the percentage is ((1/3) * 100) = 33.33%
```

## Approach
Use SQL aggregation to count distinct users per contest and divide by total user count.

```text
FUNCTION ComputePercentage():
    // total distinct users
    SET totalUsers ← SELECT COUNT(*) FROM Users
    // percentage per contest
    SELECT contest_id,
           ROUND(100.0 * COUNT(DISTINCT user_id) / totalUsers, 2) AS percentage
    FROM Register
    GROUP BY contest_id
    ORDER BY percentage DESC, contest_id;
```

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
| 1 | Count rows in `Users` | `totalUsers = 4` |
| 2 | Group `Register` by `contest_id` and count distinct `user_id` | `100 → 2`, `200 → 2` |
| 3 | Compute `percentage = 100 * count / totalUsers` | `100 → 50.00`, `200 → 50.00` |
| 4 | Order by percentage desc, then `contest_id` | `[[100,50.00],[200,50.00]]` |

## Complexity Analysis
The query scans each table once. Time complexity is **O(N + M)** where *N* is number of users and *M* is number of registrations. Space complexity is **O(K)** for *K* distinct contests.

## Follow-Up Questions
1. How would you modify the query to include contests with zero registrations?
2. How to compute the percentage of users who attended **all** contests?
3. How to return results for a specific subset of contests efficiently?

## Key Takeaway
Aggregating distinct counts and normalizing by a total can be expressed concisely with `COUNT(DISTINCT ...)` and arithmetic in SQL.
