# 1142. User Activity for the Past 30 Days II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/user-activity-for-the-past-30-days-ii](https://leetcode.com/problems/user-activity-for-the-past-30-days-ii)
**Companies:** Meta, Zoom

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

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

Write a solution to find the average number of sessions per user for a period of `30` days ending `2019-07-27` inclusively, **rounded to 2 decimal places**. The sessions we want to count for a user are those with at least one activity in that time period.

The result format is in the following example.

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
| 3       | 5          | 2019-07-21    | open_session  |
| 3       | 5          | 2019-07-21    | scroll_down   |
| 3       | 5          | 2019-07-21    | end_session   |
| 4       | 3          | 2019-06-25    | open_session  |
| 4       | 3          | 2019-06-25    | end_session   |
+---------+------------+---------------+---------------+
Output:
+---------------------------+
| average_sessions_per_user |
+---------------------------+
| 1.33                      |
+---------------------------+
Explanation: User 1 and 2 each had 1 session in the past 30 days while user 3 had 2 sessions so the average is (1 + 1 + 2) / 3 = 1.33.
```

## Approach
Perform a left‑join of the generated date range with the `Activity` table, then aggregate distinct users per day.

```text
FUNCTION DailyActiveUsers(activityTable, endDate):
    SET startDate ← DATE_SUB(endDate, INTERVAL 29 DAY)
    CREATE dateSeries AS SELECT generate_series(startDate, endDate) AS day
    LEFT JOIN dateSeries ON activityTable.activity_date = dateSeries.day
    SELECT dateSeries.day,
           COUNT(DISTINCT activityTable.user_id) AS active_users
    FROM dateSeries
    LEFT JOIN activityTable ON activityTable.activity_date = dateSeries.day
    GROUP BY dateSeries.day
    ORDER BY dateSeries.day ASC
    RETURN result
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Compute `startDate` = `endDate` - 29 days. |
| 2 | Generate a series of all dates from `startDate` to `endDate`. |
| 3 | Left‑join the series with `Activity` on matching dates. |
| 4 | For each date, count distinct `user_id`s (NULL yields 0). |
| 5 | Return ordered list of dates with counts. |

## Complexity Analysis
- **Time:** O(N + D) where N is rows in `Activity` and D = 30 for the date series.
- **Space:** O(D) to store the result set (≤ 30 rows).

## Follow-Up Questions
1. How to handle a sliding window of variable length?
2. Return a running total of active users over the window.
3. Optimize for very large tables using indexed partitions.

## Key Takeaway
A left‑joined date series combined with `COUNT(DISTINCT ...)` cleanly produces daily active user counts, including days with zero activity.
