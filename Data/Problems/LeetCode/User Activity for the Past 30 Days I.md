# 1141. User Activity for the Past 30 Days I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/user-activity-for-the-past-30-days-i](https://leetcode.com/problems/user-activity-for-the-past-30-days-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoom

---

## Problem Description

Table: `Activity`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| session_id    | int     |
| activity_date | date    |
| activity_type | enum    |
+---------------+---------+
This table may have duplicate rows.
The activity_type column is an ENUM (category) of type ('open_session', 'end_session', 'scroll_down', 'send_message').
The table shows the user activities for a social media website.
Note that each session belongs to exactly one user.
```

Write a solution to find the daily active user count for a period of `30` days ending `2019-07-27` inclusively. A user was active on someday if they made at least one activity on that day.

Return the result table in **any order**.

The result format is in the following example.

Note: **Any** activity from (`'open_session'`, `'end_session'`, `'scroll_down'`, `'send_message'`) will be considered valid activity for a user to be considered active on a day.

## Examples

**Example 1:**
```
Input:
Activity table:
+---------+------------+---------------+---------------+
| user_id | session_id | activity_date | activity_type |
+---------+------------+---------------+---------------+
| 1       | 1          | 2019-07-20    | open_session  |
| 1       | 1          | 2019-07-20    | scroll_down   |
| 1       | 1          | 2019-07-20    | end_session   |
| 2       | 4          | 2019-07-20    | open_session  |
| 2       | 4          | 2019-07-21    | send_message  |
| 2       | 4          | 2019-07-21    | end_session   |
| 3       | 2          | 2019-07-21    | open_session  |
| 3       | 2          | 2019-07-21    | send_message  |
| 3       | 2          | 2019-07-21    | end_session   |
| 4       | 3          | 2019-06-25    | open_session  |
| 4       | 3          | 2019-06-25    | end_session   |
+---------+------------+---------------+---------------+
Output:
+------------+--------------+
| day        | active_users |
+------------+--------------+
| 2019-07-20 | 2            |
| 2019-07-21 | 2            |
+------------+--------------+
Explanation: Note that we do not care about days with zero active users.
```

## Approach
Use a simple aggregation query that filters rows to the required date range, groups by `activity_date`, and counts distinct `user_id`s.

```text
FUNCTION CountActiveUsers(activityTable, endDate):
    SET startDate ← DATE_SUB(endDate, INTERVAL 29 DAY)
    SELECT activity_date AS day,
           COUNT(DISTINCT user_id) AS active_users
    FROM activityTable
    WHERE activity_date BETWEEN startDate AND endDate
    GROUP BY activity_date
    ORDER BY day ASC
    RETURN result
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Compute `startDate` = `endDate` - 29 days. |
| 2 | Filter `Activity` rows where `activity_date` is in `[startDate, endDate]`. |
| 3 | Group the filtered rows by `activity_date`. |
| 4 | For each group, count distinct `user_id` values. |
| 5 | Return the list ordered by date. |

## Complexity Analysis
- **Time:** O(N) where N is the number of rows in `Activity` (single scan). Index on `activity_date` can improve to O(log N) for range selection.
- **Space:** O(D) for storing results, where D ≤ 30 (one entry per day).

## Follow-Up Questions
1. How would you handle missing days with zero active users?
2. Extend the query to return a running total of active users over the window.
3. Adapt the solution for a sliding window of arbitrary size.

## Key Takeaway
Aggregating over a date range with `GROUP BY` and `COUNT(DISTINCT ...)` efficiently yields daily active user counts.
