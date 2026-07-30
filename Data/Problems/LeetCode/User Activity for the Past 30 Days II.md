# 1142. User Activity for the Past 30 Days II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/user-activity-for-the-past-30-days-ii](https://leetcode.com/problems/user-activity-for-the-past-30-days-ii)
**Companies:** Meta, Zoom

---

## Problem Description
Given a table `Activity(user_id INT, activity_date DATE)`, return for each of the past 30 days (including the given end date) the number of distinct users who were active on that day. If a day has no activity, return zero for that day.

## Examples
| activity_date | active_users |
|---------------|--------------|
| 2019-07-27    | 5 |
| 2019-07-26    | 0 |
| ...           | ... |
*Each row lists a date in the 30‑day window and the count of unique users on that date.*

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
