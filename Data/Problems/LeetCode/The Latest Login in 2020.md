# 1890. The Latest Login in 2020

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-latest-login-in-2020](https://leetcode.com/problems/the-latest-login-in-2020)
**Companies:** Google

---

## Problem Description
Table: `Logins`

```
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| user_id        | int      |
| time_stamp     | datetime |
+----------------+----------+
(user_id, time_stamp) is the primary key (combination of columns with unique values) for this table.
Each row contains information about the login time for the user with ID user_id.
```

Write a solution to report the **latest** login for all users in the year `2020`. Do **not** include the users who did not login in `2020`.

Return the result table **in any order**.

The result format is in the following example.

## Examples
```
Example 1:
  Input:
  Logins table:
  +---------+---------------------+
  | user_id | time_stamp          |
  +---------+---------------------+
  | 6       | 2020-06-30 15:06:07 |
  | 6       | 2021-04-21 14:06:06 |
  | 6       | 2019-03-07 00:18:15 |
  | 8       | 2020-02-01 05:10:53 |
  | 8       | 2020-12-30 00:46:50 |
  | 2       | 2020-01-16 02:49:50 |
  | 2       | 2019-08-25 07:59:08 |
  | 14      | 2019-07-14 09:00:00 |
  | 14      | 2021-01-06 11:59:59 |
  +---------+---------------------+
  Output:
  +---------+---------------------+
  | user_id | last_stamp          |
  +---------+---------------------+
  | 6       | 2020-06-30 15:06:07 |
  | 8       | 2020-12-30 00:46:50 |
  | 2       | 2020-01-16 02:49:50 |
  +---------+---------------------+
  Explanation:
  User 6 logged into their account 3 times but only once in 2020, so we include this login in the result table.
  User 8 logged into their account 2 times in 2020, once in February and once in December. We include only
  the latest one (December) in the result table.
  User 2 logged into their account 2 times but only once in 2020, so we include this login in the result table.
  User 14 did not login in 2020, so we do not include them in the result table.
```

## Approach
Iterate through the array while keeping the maximum timestamp seen so far. String comparison works because the format is lexicographically ordered.

## Walkthrough
| Index | Current Timestamp | Max So Far |
|-------|-------------------|-----------|
| 0 | 2020-01-15 08:30:00 | 2020-01-15 08:30:00 |
| 1 | 2020-12-31 23:59:59 | 2020-12-31 23:59:59 |
| 2 | 2020-06-01 12:00:00 | 2020-12-31 23:59:59 |
Result is the max timestamp.

## Complexity Analysis
- Time: O(n) where n is the number of timestamps.
- Space: O(1) extra space.

## Follow-Up Questions
1. How would you modify the solution if timestamps could span multiple years?
2. What if the timestamps are given as Unix epoch integers?
3. Can you find the latest login without storing the entire array (streaming input)?

## Key Takeaway
When data is already in a lexicographically sortable format, a simple linear scan yields the maximum efficiently.
